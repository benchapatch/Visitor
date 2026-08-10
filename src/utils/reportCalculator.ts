import { 
  VisitorRecord, 
  WeeklyReportData, 
  ChannelStat, 
  SalespersonStat, 
  DailyTrendStat, 
  ProductInterestStat 
} from '../types';
import { formatReportDateRange, formatDailyTrendDate } from './dateUtils';

// ==========================================
// Chart Theme Gradients (Light & Dark)
// 1. Daily Visitor Trend: #573523 - #C3AF9E
// 2. Visitor Handle by Sale Person: #003f5c - #ffa600
// 3. Visitor by Channel: #9400D3 - #FF69B4
// 4. Top Product Categories of Interest: #003300 - #00FFFF
// ==========================================
export const CHART_THEME_COLORS = {
  dailyTrend: {
    dark: '#573523',
    light: '#C3AF9E',
    label: 'Daily Visitor Trend'
  },
  salesperson: {
    dark: '#003f5c',
    light: '#ffa600',
    label: 'Visitor Handle by Sale Person'
  },
  channel: {
    dark: '#9400D3',
    light: '#FF69B4',
    label: 'Visitor by Channel'
  },
  productInterest: {
    dark: '#064e3b', // Rich Deep Forest Emerald for highest value (ค่ามาก สีเข้ม)
    light: '#bbf7d0', // Crisp Soft Mint for lowest value (ค่าน้อย สีอ่อน)
    label: 'Top Product Categories of Interest'
  }
};

export function hexToRgb(hex: string): [number, number, number] {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function interpolateColor(color1: string, color2: string, factor: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const r = rgb1[0] + factor * (rgb2[0] - rgb1[0]);
  const g = rgb1[1] + factor * (rgb2[1] - rgb1[1]);
  const b = rgb1[2] + factor * (rgb2[2] - rgb1[2]);
  return rgbToHex(r, g, b);
}

export function generateGradientPalette(startHex: string, endHex: string, steps: number): string[] {
  if (steps <= 0) return [];
  if (steps === 1) return [startHex];
  const palette: string[] = [];
  for (let i = 0; i < steps; i++) {
    const factor = i / (steps - 1);
    palette.push(interpolateColor(startHex, endHex, factor));
  }
  return palette;
}

function normalizeDateStr(d: string): string {
  if (!d) return '';
  const trimmed = d.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  if (/^\d{4}\/\d{2}\/\d{2}$/.test(trimmed)) return trimmed.replace(/\//g, '-');
  const matchIso = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
  if (matchIso) {
    return `${matchIso[1]}-${matchIso[2].padStart(2, '0')}-${matchIso[3].padStart(2, '0')}`;
  }
  return trimmed;
}

export function calculateWeeklyReport(
  allRecords: VisitorRecord[],
  selectedBranch: string, // 'RM9' | 'SKV' | 'PHUKET' | 'ALL'
  startDate: string,
  endDate: string
): WeeklyReportData {
  const normStart = normalizeDateStr(startDate);
  const normEnd = normalizeDateStr(endDate);
  const targetBranch = (selectedBranch || '').trim().toUpperCase();

  // 1. Filter records by branch and date range
  const filtered = allRecords.filter(record => {
    const rBranch = (record.branch || '').trim().toUpperCase();
    const rDate = normalizeDateStr(record.date);

    // Branch filter
    if (targetBranch !== 'ALL' && targetBranch !== 'ALL BRANCHES') {
      if (rBranch !== targetBranch) {
        return false;
      }
    }

    // Date range filter
    if (normStart && rDate < normStart) return false;
    if (normEnd && rDate > normEnd) return false;

    return true;
  });

  const totalVisitors = filtered.length;

  // 2. Daily Visitor Trend
  // Group by date
  const dateMap = new Map<string, number>();
  
  // Calculate day difference
  let dayDiff = 7;
  if (normStart && normEnd) {
    const s = new Date(normStart + 'T00:00:00');
    const e = new Date(normEnd + 'T00:00:00');
    dayDiff = Math.max(1, Math.round((e.getTime() - s.getTime()) / (1000 * 3600 * 24)) + 1);
  }

  // If date range is <= 14 days (typical weekly view), initialize all dates in range
  if (normStart && normEnd && dayDiff <= 14) {
    const cur = new Date(normStart + 'T00:00:00');
    const end = new Date(normEnd + 'T00:00:00');
    while (cur <= end) {
      const y = cur.getFullYear();
      const m = String(cur.getMonth() + 1).padStart(2, '0');
      const d = String(cur.getDate()).padStart(2, '0');
      dateMap.set(`${y}-${m}-${d}`, 0);
      cur.setDate(cur.getDate() + 1);
    }
  }

  filtered.forEach(r => {
    const d = normalizeDateStr(r.date);
    if (d) {
      const existing = dateMap.get(d) || 0;
      dateMap.set(d, existing + 1);
    }
  });

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailyDates = Array.from(dateMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const dailyPalette = generateGradientPalette(
    CHART_THEME_COLORS.dailyTrend.dark,
    CHART_THEME_COLORS.dailyTrend.light,
    dailyDates.length
  );

  const dailyTrend: DailyTrendStat[] = dailyDates.map(([date, visitors], idx) => {
    const dObj = new Date(date + 'T00:00:00');
    const dayOfWeek = isNaN(dObj.getTime()) ? '' : daysOfWeek[dObj.getDay()];
    return {
      date,
      displayDate: formatDailyTrendDate(date),
      dayOfWeek,
      visitors,
      color: dailyPalette[idx] || CHART_THEME_COLORS.dailyTrend.dark
    };
  });

  // 3. Visitors Handled by Salesperson
  const salesMap = new Map<string, { count: number; closed: number }>();
  filtered.forEach(r => {
    const sp = r.salesperson || 'Unassigned';
    const curr = salesMap.get(sp) || { count: 0, closed: 0 };
    curr.count += 1;
    if (r.orderClosed) {
      curr.closed += 1;
    }
    salesMap.set(sp, curr);
  });

  const salesEntries = Array.from(salesMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0])); // alphabetical order for consistent layout

  const salesPalette = generateGradientPalette(
    CHART_THEME_COLORS.salesperson.dark,
    CHART_THEME_COLORS.salesperson.light,
    salesEntries.length
  );

  const salespersonBreakdown: SalespersonStat[] = salesEntries.map(([salesperson, data], idx) => ({
    salesperson,
    count: data.count,
    closedCount: data.closed,
    conversionRate: data.count > 0 ? Math.round((data.closed / data.count) * 100) : 0,
    color: salesPalette[idx] || CHART_THEME_COLORS.salesperson.dark
  }));

  // 4. Visitors by Channel
  const channelMap = new Map<string, number>();
  filtered.forEach(r => {
    const ch = r.channel || 'Walk in';
    channelMap.set(ch, (channelMap.get(ch) || 0) + 1);
  });

  const channelEntries = Array.from(channelMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]));

  const channelPalette = generateGradientPalette(
    CHART_THEME_COLORS.channel.dark,
    CHART_THEME_COLORS.channel.light,
    channelEntries.length
  );

  const channelBreakdown: ChannelStat[] = channelEntries.map(([channel, count], idx) => ({
    channel,
    count,
    percentage: totalVisitors > 0 ? Math.round((count / totalVisitors) * 100) : 0,
    color: channelPalette[idx] || CHART_THEME_COLORS.channel.dark
  }));

  // 5. Top Product Interests
  const productCountMap = new Map<string, number>();
  filtered.forEach(r => {
    (r.productInterests || []).forEach(prod => {
      const clean = prod.trim();
      if (clean) {
        productCountMap.set(clean, (productCountMap.get(clean) || 0) + 1);
      }
    });
  });

  const productEntries = Array.from(productCountMap.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  // Scale the top 10 items distinctly from darkest (highest mentions) to lightest (lowest mentions)
  const topCount = Math.min(Math.max(productEntries.length, 1), 10);
  const topProductPalette = generateGradientPalette(
    CHART_THEME_COLORS.productInterest.dark,
    CHART_THEME_COLORS.productInterest.light,
    topCount
  );

  const topProducts: ProductInterestStat[] = productEntries.map(([category, mentions], idx) => {
    const color = idx < topCount 
      ? (topProductPalette[idx] || CHART_THEME_COLORS.productInterest.dark)
      : CHART_THEME_COLORS.productInterest.light;
    return {
      rank: idx + 1,
      category,
      mentions,
      color
    };
  });

  // 6. Closed Orders & Financials
  const closedRecords = filtered.filter(r => r.orderClosed);
  const closedOrdersCount = closedRecords.length;
  const totalClosedAmount = closedRecords.reduce((sum, r) => sum + (r.orderAmount || 0), 0);
  const conversionRate = totalVisitors > 0 ? Math.round((closedOrdersCount / totalVisitors) * 100) : 0;

  return {
    branch: selectedBranch,
    startDate,
    endDate,
    formattedDateRange: formatReportDateRange(startDate, endDate),
    totalVisitors,
    channelBreakdown,
    salespersonBreakdown,
    dailyTrend,
    topProducts,
    closedOrdersCount,
    totalClosedAmount,
    conversionRate,
    filteredRecords: filtered
  };
}
