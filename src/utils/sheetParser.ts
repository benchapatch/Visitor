import { VisitorRecord, ChannelType } from '../types';

export function parseCSVToRows(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  // Normalize newlines
  const cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if (char === '\t' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if (char === '\n' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      if (currentRow.some(c => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some(c => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export function normalizeDate(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  
  // Check if already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  // Check format: 26-May-26 12:19 or 01-Jun-26 or 26-May-2026
  const monthMap: Record<string, string> = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
    'ม.ค.': '01', 'ก.พ.': '02', 'มี.ค.': '03', 'เม.ย.': '04', 'พ.ค.': '05', 'มิ.ย.': '06',
    'ก.ค.': '07', 'ส.ค.': '08', 'ก.ย.': '09', 'ต.ค.': '10', 'พ.ย.': '11', 'ธ.ค.': '12'
  };

  const dMmmMatch = trimmed.match(/^(\d{1,2})[\s\-\/]([a-zA-Z\u0E00-\u0E7F\.]+)[,\s\-\/](\d{2,4})/);
  if (dMmmMatch) {
    const day = dMmmMatch[1].padStart(2, '0');
    const rawMonth = dMmmMatch[2].toLowerCase().substring(0, 3);
    const m = monthMap[rawMonth] || monthMap[dMmmMatch[2].toLowerCase()] || '01';
    let y = parseInt(dMmmMatch[3], 10);
    if (y < 100) {
      y = 2000 + y; // e.g. 26 -> 2026
    } else if (y > 2500) {
      y -= 543;
    }
    return `${y}-${m}-${day}`;
  }

  // Check DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = trimmed.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, '0');
    const month = dmyMatch[2].padStart(2, '0');
    let year = parseInt(dmyMatch[3], 10);
    if (year > 2500) {
      year -= 543;
    }
    return `${year}-${month}-${day}`;
  }

  // Try Date.parse
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  return trimmed;
}

export function normalizeBranchName(branchStr: string): string {
  if (!branchStr) return 'PHUKET';
  const b = branchStr.trim().toUpperCase().replace(/\s+/g, '');
  if (b.includes('RAMA') || b.includes('RM9') || b.includes('พระราม')) {
    return 'RM9';
  }
  if (b.includes('SKV') || b.includes('SUKHUMVIT') || b.includes('สุขุมวิท')) {
    return 'SKV';
  }
  if (b.includes('PHUKET') || b.includes('ภูเก็ต') || b.includes('PK')) {
    return 'PHUKET';
  }
  return b;
}

export function sanitizeSalesperson(raw: string): string {
  if (!raw) return 'Unassigned';
  const trimmed = raw.trim();
  // Filter out any legacy mock names that don't belong to actual staff
  if (trimmed === 'View') return 'Pui';
  if (trimmed === 'Mind') return 'Tim';
  if (trimmed === 'Pook') return 'Kate';
  if (trimmed === 'Beam') return 'Aliss';
  if (trimmed === 'Bell') return 'Aom';
  if (trimmed === 'Nut') return 'Pui';
  if (trimmed === 'Eve') return 'Tim';
  return trimmed;
}

export function normalizeChannel(ch: string): ChannelType {
  if (!ch) return 'Walk in';
  const c = ch.trim().toLowerCase();
  
  if (c.includes('walk') || c.includes('หน้าร้าน') || c.includes('walkin') || c.includes('walk-in')) {
    return 'Walk in';
  }
  if (c.includes('fb') || c.includes('facebook') || c.includes('ig') || c.includes('instagram') || c.includes('social') || c.includes('เฟส')) {
    return 'Facebook / IG';
  }
  if (c.includes('design') || c.includes('interior') || c.includes('สถาปนิก') || c.includes('ดีไซเนอร์') || c.includes('อินทีเรีย')) {
    return 'Designer';
  }
  if (c.includes('appoint') || c.includes('นัด') || c.includes('จอง') || c.includes('booking')) {
    return 'Appointment';
  }
  if (c.includes('google') || c.includes('web') || c.includes('search') || c.includes('กูเกิล')) {
    return 'Google';
  }
  if (c.includes('phone') || c.includes('tel') || c.includes('line') || c.includes('โทร') || c.includes('ไลน์')) {
    return 'Phone / Line';
  }
  return ch.trim();
}

export function normalizeProducts(prodInput: string): string[] {
  if (!prodInput) return [];
  // Split by comma, semicolon, newline, pipe, bullet
  const rawList = prodInput
    .split(/[,;\n\r|•·\/\\]+/)
    .map(p => p.trim())
    .filter(p => p.length > 0 && p !== '-' && p !== 'N/A');

  if (rawList.length === 0 && prodInput.trim().length > 0) {
    return [prodInput.trim()];
  }
  return rawList;
}

export function parseSheetDataToRecords(csvOrTsvText: string, defaultBranch = 'PHUKET'): { records: VisitorRecord[]; errors: string[] } {
  const rows = parseCSVToRows(csvOrTsvText);
  if (rows.length === 0) {
    return { records: [], errors: ['Empty sheet or CSV data'] };
  }

  // Find header row (search first 5 rows for header clues)
  let headerIndex = -1;
  let headers: string[] = [];

  for (let i = 0; i < Math.min(5, rows.length); i++) {
    const r = rows[i].map(c => c.toLowerCase().trim());
    const hasDate = r.some(c => c.includes('date') || c.includes('วัน'));
    const hasBranch = r.some(c => c.includes('branch') || c.includes('สาขา') || c.includes('rm9') || c.includes('skv') || c.includes('phuket') || c.includes('location'));
    const hasChannel = r.some(c => c.includes('channel') || c.includes('ช่องทาง') || c.includes('walk'));
    const hasSale = r.some(c => c === 'sale' || c.includes('sale') || c.includes('เซล') || c.includes('พนักงาน') || c.includes('rep'));
    const hasType = r.some(c => c === 'type' || c.includes('type') || c.includes('product'));

    if ((hasDate && (hasBranch || hasChannel || hasSale || hasType)) || (hasBranch && hasChannel)) {
      headerIndex = i;
      headers = rows[i];
      break;
    }
  }

  if (headerIndex === -1) {
    headerIndex = 0;
    headers = rows[0];
  }

  // Map header column indices
  let idCol = -1;
  let dateCol = -1;
  let branchCol = -1;
  let channelCol = -1;
  let saleCol = -1;
  let prodCol = -1;
  let closedCol = -1;
  let amountCol = -1;
  let nameCol = -1;
  let notesCol = -1;

  headers.forEach((h, idx) => {
    const col = h.toLowerCase().trim();
    if (idCol === -1 && (col === 'id' || col.startsWith('id_') || col === 'no')) idCol = idx;
    else if (dateCol === -1 && (col.includes('date') || col.includes('วัน'))) dateCol = idx;
    else if (branchCol === -1 && (col.includes('branch') || col.includes('สาขา') || col.includes('showroom') || col.includes('loc'))) branchCol = idx;
    else if (channelCol === -1 && (col.includes('channel') || col.includes('ช่องทาง') || col.includes('source') || col.includes('contact'))) channelCol = idx;
    else if (saleCol === -1 && (col === 'sale' || col.includes('sale') || col.includes('staff') || col.includes('พนักงาน') || col.includes('rep') || col.includes('person'))) saleCol = idx;
    else if (prodCol === -1 && (col === 'type' || col.includes('product') || col.includes('สินค้า') || col.includes('interest') || col.includes('item') || col.includes('หมวด') || col.includes('type'))) prodCol = idx;
    else if (closedCol === -1 && (col === 'order' || col.includes('order') || col.includes('close') || col.includes('ปิด') || col.includes('status') || col.includes('deal'))) closedCol = idx;
    else if (amountCol === -1 && (col.includes('amount') || col.includes('price') || col.includes('ยอด') || col.includes('thb') || col.includes('baht') || col.includes('มูลค่า'))) amountCol = idx;
    else if (nameCol === -1 && (col.includes('name') || col.includes('customer') || col.includes('ลูกค้า') || col.includes('ชื่อ'))) nameCol = idx;
    else if (notesCol === -1 && (col.includes('remark') || col.includes('note') || col.includes('หมายเหตุ') || col.includes('comment') || col.includes('detail'))) notesCol = idx;
  });

  // Fallbacks if columns couldn't be strictly identified by name
  if (dateCol === -1) dateCol = 1;
  if (nameCol === -1 && headers.length > 2) nameCol = 2;
  if (channelCol === -1 && headers.length > 3) channelCol = 3;
  if (saleCol === -1 && headers.length > 4) saleCol = 4;
  if (prodCol === -1 && headers.length > 5) prodCol = 5;
  if (notesCol === -1 && headers.length > 6) notesCol = 6;
  if (closedCol === -1 && headers.length > 9) closedCol = 9;

  const records: VisitorRecord[] = [];
  const errors: string[] = [];

  for (let i = headerIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 0 || row.every(c => c === '')) continue;

    const rawDate = dateCol >= 0 && row[dateCol] ? row[dateCol] : '';
    const date = normalizeDate(rawDate);
    if (!date) {
      continue; // skip rows without recognizable date
    }

    const rawBranch = branchCol >= 0 && row[branchCol] ? row[branchCol].trim() : defaultBranch;
    const branch = normalizeBranchName(rawBranch || defaultBranch);

    const rawChannel = channelCol >= 0 && row[channelCol] ? row[channelCol] : 'Walk in';
    const channel = normalizeChannel(rawChannel);

    const rawSalesperson = saleCol >= 0 && row[saleCol] ? row[saleCol].trim() : 'Unassigned';
    const salesperson = sanitizeSalesperson(rawSalesperson);

    const rawProducts = prodCol >= 0 && row[prodCol] ? row[prodCol] : '';
    const productInterests = normalizeProducts(rawProducts);

    const customerName = nameCol >= 0 && row[nameCol] ? row[nameCol].trim() : undefined;
    const notes = notesCol >= 0 && row[notesCol] ? row[notesCol].trim() : undefined;

    // Closed status & details detection
    let orderClosed = false;
    let closedDetails: string | undefined = undefined;

    if (closedCol >= 0 && row[closedCol] && row[closedCol].trim().length > 0) {
      const cVal = row[closedCol].trim();
      const cLower = cVal.toLowerCase();
      if (cLower === 'yes' || cLower === 'true' || cLower === '1' || cLower.includes('ll') || cLower.includes('ปิด') || cVal.startsWith('#')) {
        orderClosed = true;
        closedDetails = cVal;
      }
    }

    // Also check notes for order hints
    if (!orderClosed && notes) {
      const nLower = notes.toLowerCase();
      if (
        nLower.includes('เปิดออเดอร์') || 
        nLower.includes('ชำระเงิน') || 
        nLower.includes('สั่งซื้อ') || 
        nLower.includes('ซื้อสินค้า') || 
        nLower.includes('จ่ายค่า') ||
        nLower.includes('มัดจำ') ||
        /ll\d{4,6}/i.test(notes)
      ) {
        orderClosed = true;
        const llMatch = notes.match(/ll\d{4,6}/i);
        closedDetails = llMatch ? `#${llMatch[0].toUpperCase()}` : 'Order Confirmed';
      }
    }

    // Amount parse
    let orderAmount: number | undefined = undefined;
    if (amountCol >= 0 && row[amountCol]) {
      const cleanNum = row[amountCol].replace(/[^0-9.-]/g, '');
      const parsedNum = parseFloat(cleanNum);
      if (!isNaN(parsedNum) && parsedNum > 0) {
        orderAmount = parsedNum;
        orderClosed = true;
      }
    }

    const rowId = idCol >= 0 && row[idCol] && row[idCol].trim() 
      ? row[idCol].trim() 
      : `${branch.toLowerCase()}-${i}-${Date.now().toString(36)}`;

    records.push({
      id: rowId,
      date,
      branch: branch || defaultBranch,
      channel,
      salesperson: salesperson || 'Staff',
      productInterests: productInterests.length > 0 ? productInterests : ['General Furniture'],
      orderClosed,
      orderAmount,
      closedDetails,
      customerName,
      notes
    });
  }

  return { records, errors };
}
