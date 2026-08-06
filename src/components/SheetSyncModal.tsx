import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Clipboard, 
  ExternalLink, 
  Sparkles,
  Layers,
  RotateCcw
} from 'lucide-react';
import { parseSheetDataToRecords, normalizeBranchName } from '../utils/sheetParser';
import { VisitorRecord } from '../types';

interface SheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  sheetUrl: string;
  onUpdateSheetUrl: (url: string) => void;
  lastSyncTime: string | null;
  onSyncData: (newRecords: VisitorRecord[], appendMode: boolean, syncBranch?: string) => void;
  onResetRecords?: () => void;
  currentCount: number;
  selectedBranch?: string;
}

const MASTER_DOC_ID = '1kpBWYO54su_iJBHY9kEwK481gCTKY2GXauSgfAUn13g';

export const SheetSyncModal: React.FC<SheetSyncModalProps> = ({
  isOpen,
  onClose,
  sheetUrl,
  onUpdateSheetUrl,
  lastSyncTime,
  onSyncData,
  onResetRecords,
  currentCount,
  selectedBranch
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'url' | 'paste'>('all');
  const [urlInput, setUrlInput] = useState(
    sheetUrl || `https://docs.google.com/spreadsheets/d/${MASTER_DOC_ID}/gviz/tq?tqx=out:csv&sheet=Rama9`
  );
  const [selectedSheetTab, setSelectedSheetTab] = useState<'ALL' | 'Phuket' | 'Rama9' | 'SKV'>('ALL');
  const [pastedData, setPastedData] = useState('');
  const [pasteBranch, setPasteBranch] = useState(selectedBranch || 'RM9');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [appendMode, setAppendMode] = useState(false);

  if (!isOpen) return null;

  // Helper to fetch CSV with proxy fallback
  const fetchCSVFromUrl = async (targetUrl: string): Promise<string> => {
    // 1. Try serverless / server proxy API first
    try {
      const res = await fetch(`/api/sheets/fetch?url=${encodeURIComponent(targetUrl)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.csv) {
          return data.csv;
        }
      }
    } catch (proxyErr) {
      console.warn('Proxy API fetch failed, attempting direct fetch fallback...', proxyErr);
    }

    // 2. Direct client-side fetch fallback
    let directUrl = targetUrl;
    const idMatch = targetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const gidMatch = targetUrl.match(/[#&?]gid=([0-9]+)/);
    const sheetMatch = targetUrl.match(/[#&?]sheet=([a-zA-Z0-9-_%]+)/);
    
    if (idMatch) {
      const sId = idMatch[1];
      if (sheetMatch) {
        directUrl = `https://docs.google.com/spreadsheets/d/${sId}/gviz/tq?tqx=out:csv&sheet=${sheetMatch[1]}`;
      } else {
        const gId = gidMatch ? gidMatch[1] : '0';
        directUrl = `https://docs.google.com/spreadsheets/d/${sId}/gviz/tq?tqx=out:csv&gid=${gId}`;
      }
    }

    const directRes = await fetch(directUrl);
    if (!directRes.ok) {
      throw new Error(`Google Sheets responded with status ${directRes.status}. Make sure the sheet is shared as 'Anyone with the link can view'.`);
    }
    return await directRes.text();
  };

  // Sync All 3 Branches (Phuket, Rama9, SKV) at once
  const handleSyncAllBranches = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const branchesToFetch = [
        { tab: 'Phuket', branch: 'PHUKET' },
        { tab: 'Rama9', branch: 'RM9' },
        { tab: 'SKV', branch: 'SKV' }
      ];

      const fetchPromises = branchesToFetch.map(async ({ tab, branch }) => {
        const url = `https://docs.google.com/spreadsheets/d/${MASTER_DOC_ID}/gviz/tq?tqx=out:csv&sheet=${tab}`;
        const csv = await fetchCSVFromUrl(url);
        const { records } = parseSheetDataToRecords(csv, branch);
        return { tab, branch, records };
      });

      const results = await Promise.all(fetchPromises);
      const combinedRecords = results.flatMap(r => r.records);

      if (combinedRecords.length === 0) {
        throw new Error('No valid records were returned from Google Sheets.');
      }

      onSyncData(combinedRecords, appendMode, 'ALL');
      
      const counts = results.map(r => `${r.tab}: ${r.records.length}`).join(' • ');
      setSuccessMsg(`Successfully synced ${combinedRecords.length} records from Google Sheets! (${counts})`);
    } catch (err: any) {
      console.error('All branches sync error:', err);
      setErrorMsg(err.message || 'Failed to sync all branches from Google Sheets.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sync specific URL or chosen tab
  const handleFetchFromGoogleSheet = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      let activeBranch = 'PHUKET';
      if (urlInput.toLowerCase().includes('rama') || urlInput.toLowerCase().includes('rm9')) {
        activeBranch = 'RM9';
      } else if (urlInput.toLowerCase().includes('skv') || urlInput.toLowerCase().includes('sukhumvit')) {
        activeBranch = 'SKV';
      }

      onUpdateSheetUrl(urlInput);
      const csvContent = await fetchCSVFromUrl(urlInput);
      const { records } = parseSheetDataToRecords(csvContent, activeBranch);
      
      if (records.length === 0) {
        throw new Error('No valid visitor log records found in the fetched sheet tab.');
      }

      onSyncData(records, appendMode, activeBranch);
      setSuccessMsg(`Successfully synced ${records.length} records for ${activeBranch} from Google Sheets!`);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setErrorMsg(err.message || 'Failed to sync with Google Sheet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleParsePastedData = () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!pastedData.trim()) {
      setErrorMsg('Please paste CSV or TSV data first.');
      return;
    }

    try {
      const { records } = parseSheetDataToRecords(pastedData, pasteBranch);
      if (records.length === 0) {
        throw new Error('Could not parse valid records. Please verify table format.');
      }

      onSyncData(records, appendMode, pasteBranch);
      setSuccessMsg(`Successfully imported ${records.length} records for ${pasteBranch}!`);
      setPastedData('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse data.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Google Sheets Live Sync</h3>
              <p className="text-xs text-slate-500">
                Direct integration with Lounge Lovers Master Spreadsheet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/20">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            1-Click Multi-Branch Sync
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Single Tab / Custom URL
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'paste'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clipboard className="w-3.5 h-3.5" />
            Copy-Paste
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Status Banners */}
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Sync Notice:</strong>
                {errorMsg}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{successMsg}</span>
            </div>
          )}

          {/* TAB 1: 1-Click Multi-Branch Sync */}
          {activeTab === 'all' && (
            <div className="space-y-4">
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Full Master Sheet Synchronization
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-200/60 text-blue-800">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                  Fetches the latest live logs simultaneously across all 3 showroom branches: <strong>Phuket</strong>, <strong>Rama9 (RM9)</strong>, and <strong>Sukhumvit 71 (SKV)</strong>.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2 py-1 bg-white border border-blue-200 text-slate-700 text-[11px] font-medium rounded-md">
                    🌴 Phuket Sheet
                  </span>
                  <span className="px-2 py-1 bg-white border border-blue-200 text-slate-700 text-[11px] font-medium rounded-md">
                    🏙️ Rama9 Sheet
                  </span>
                  <span className="px-2 py-1 bg-white border border-blue-200 text-slate-700 text-[11px] font-medium rounded-md">
                    🏢 SKV Sheet
                  </span>
                </div>
              </div>

              {/* Import Mode */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appendMode}
                    onChange={(e) => setAppendMode(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Append to existing records (Leave unchecked to replace with fresh live data)</span>
                </label>
                <p className="text-[11px] text-slate-400 pl-6 mt-0.5">
                  Currently loaded: <strong>{currentCount}</strong> records in memory.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <a
                  href={`https://docs.google.com/spreadsheets/d/${MASTER_DOC_ID}/edit`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1 text-xs font-medium"
                >
                  Open Lounge Lovers Spreadsheet <ExternalLink className="w-3 h-3" />
                </a>

                {onResetRecords && (
                  <button
                    type="button"
                    onClick={() => {
                      onResetRecords();
                      setSuccessMsg('Reset memory to official Google Sheet baseline data.');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Baseline
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Single Tab / URL Sync */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Select Branch Tab or Enter Custom Link
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSheetTab('Rama9');
                        setUrlInput(`https://docs.google.com/spreadsheets/d/${MASTER_DOC_ID}/gviz/tq?tqx=out:csv&sheet=Rama9`);
                      }}
                      className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                    >
                      Rama9
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSheetTab('Phuket');
                        setUrlInput(`https://docs.google.com/spreadsheets/d/${MASTER_DOC_ID}/gviz/tq?tqx=out:csv&sheet=Phuket`);
                      }}
                      className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded hover:bg-amber-200 transition-colors"
                    >
                      Phuket
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSheetTab('SKV');
                        setUrlInput(`https://docs.google.com/spreadsheets/d/${MASTER_DOC_ID}/gviz/tq?tqx=out:csv&sheet=SKV`);
                      }}
                      className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded hover:bg-emerald-200 transition-colors"
                    >
                      SKV
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full text-xs font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Import Mode */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appendMode}
                    onChange={(e) => setAppendMode(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Append to existing records (instead of replacing)</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: Copy-Paste */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  Target Branch
                </label>
                <select
                  value={pasteBranch}
                  onChange={(e) => setPasteBranch(e.target.value)}
                  className="text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1"
                >
                  <option value="RM9">Rama 9 (RM9)</option>
                  <option value="PHUKET">Phuket</option>
                  <option value="SKV">Sukhumvit (SKV)</option>
                </select>
              </div>
              <textarea
                rows={6}
                value={pastedData}
                onChange={(e) => setPastedData(e.target.value)}
                placeholder="Paste rows from Google Sheets (ID, Date, Customer, Channel, Sale, Type, Remark...)"
                className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Sync Timestamp info */}
          {lastSyncTime && (
            <p className="text-[11px] text-slate-400 text-center">
              Last synced: {new Date(lastSyncTime).toLocaleTimeString()} ({new Date(lastSyncTime).toLocaleDateString()})
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>

          {activeTab === 'all' && (
            <button
              id="btn-trigger-all-branches-sync"
              onClick={handleSyncAllBranches}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-xs transition-all hover:shadow-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Syncing All Branches...' : 'Sync All Branches (Phuket, RM9, SKV)'}
            </button>
          )}

          {activeTab === 'url' && (
            <button
              id="btn-trigger-sheet-sync"
              onClick={handleFetchFromGoogleSheet}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-xs transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Syncing...' : 'Sync Tab Now'}
            </button>
          )}

          {activeTab === 'paste' && (
            <button
              id="btn-trigger-paste-parse"
              onClick={handleParsePastedData}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Import Data
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
