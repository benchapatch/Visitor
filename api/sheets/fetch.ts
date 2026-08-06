export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url, sheetId, gid, sheet } = req.query || {};
  const defaultDocId = '1kpBWYO54su_iJBHY9kEwK481gCTKY2GXauSgfAUn13g';
  
  let targetUrl = '';
  if (typeof url === 'string' && url.length > 0) {
    targetUrl = url;
  } else if (typeof sheetId === 'string' && sheetId.length > 0) {
    const gidParam = gid ? `&gid=${gid}` : '';
    const sheetParam = sheet ? `&sheet=${encodeURIComponent(String(sheet))}` : '';
    targetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${gidParam}${sheetParam}`;
  } else if (sheet) {
    targetUrl = `https://docs.google.com/spreadsheets/d/${defaultDocId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(String(sheet))}`;
  } else {
    targetUrl = `https://docs.google.com/spreadsheets/d/${defaultDocId}/export?format=csv&gid=870055913`;
  }

  try {
    // If full edit link was given with a sheet name or gid
    if (targetUrl.includes('docs.google.com/spreadsheets') && !targetUrl.includes('/export?format=csv') && !targetUrl.includes('/gviz/tq')) {
      const idMatch = targetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      const gidMatch = targetUrl.match(/[#&?]gid=([0-9]+)/);
      if (idMatch) {
        const sId = idMatch[1];
        const gId = gidMatch ? gidMatch[1] : '0';
        targetUrl = `https://docs.google.com/spreadsheets/d/${sId}/export?format=csv&gid=${gId}`;
      }
    }

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      // Try gviz endpoint as fallback
      const gvizUrl = targetUrl.includes('/gviz/tq') ? targetUrl : targetUrl.replace('/export?format=csv', '/gviz/tq?tqx=out:csv');
      const gvizResponse = await fetch(gvizUrl);
      if (gvizResponse.ok) {
        const csvText = await gvizResponse.text();
        return res.status(200).json({ success: true, csv: csvText, source: gvizUrl });
      }
      return res.status(response.status).json({
        success: false,
        error: `Google Sheets responded with status ${response.status}: ${response.statusText}. Please ensure the sheet has 'Anyone with the link can view' permission or is published to web.`
      });
    }

    const csvText = await response.text();
    return res.status(200).json({ success: true, csv: csvText, source: targetUrl });
  } catch (err: any) {
    return res.status(500).json({ 
      success: false, 
      error: err.message || 'Failed to fetch Google Sheet' 
    });
  }
}
