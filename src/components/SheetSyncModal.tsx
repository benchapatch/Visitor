import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Clipboard, 
  ExternalLink, 
  Sparkles 
} from 'lucide-react';
import { parseSheetDataToRecords } from '../utils/sheetParser';
import { VisitorRecord } from '../types';

interface SheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  sheetUrl: string;
  onUpdateSheetUrl: (url: string) => void;
  lastSyncTime: string | null;
  onSyncData: (newRecords: VisitorRecord[], appendMode: boolean) => void;
  currentCount: number;
}

export const SheetSyncModal: React.FC<SheetSyncModalProps> = ({
  isOpen,
  onClose,
  sheetUrl,
  onUpdateSheetUrl,
  lastSyncTime,
  onSyncData,
  currentCount
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'paste'>('url');
  const [urlInput, setUrlInput] = useState(sheetUrl || 'https://docs.google.com/spreadsheets/d/1kpBWYO54su_iJBHY9kEwK481gCTKY2GXauSgfAUn13g/edit?gid=870055913#gid=870055913');
  const [pastedData, setPastedData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [appendMode, setAppendMode] = useState(false);

  if (!isOpen) return null;

  const handleFetchFromGoogleSheet = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      onUpdateSheetUrl(urlInput);
      let csvContent = '';

      // 1. Try serverless / server proxy API first
      try {
        const res = await fetch(`/api/sheets/fetch?url=${encodeURIComponent(urlInput)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.csv) {
            csvContent = data.csv;
          }
        }
      } catch (proxyErr) {
        console.warn('Proxy API fetch failed, attempting direct fetch fallback...', proxyErr);
      }

      // 2. Direct client-side fetch fallback if proxy did not succeed
      if (!csvContent) {
        let directUrl = urlInput;
        const idMatch = urlInput.match(/\/d\/([a-zA-Z0-9-_]+)/);
        const gidMatch = urlInput.match(/[#&?]gid=([0-9]+)/);
        if (idMatch) {
          const sId = idMatch[1];
          const gId = gidMatch ? gidMatch[1] : '0';
          directUrl = `https://docs.google.com/spreadsheets/d/${sId}/gviz/tq?tqx=out:csv&gid=${gId}`;
        }
        
        const directRes = await fetch(directUrl);
        if (directRes.ok) {
          csvContent = await directRes.text();
        } else {
          throw new Error('Could not fetch Google Sheet data. Ensure sharing is set to "Anyone with the link can view" or use the Copy-Paste tab.');
        }
      }

      const { records } = parseSheetDataToRecords(csvContent);
      if (records.length === 0) {
        throw new Error('No valid visitor log records found in the fetched sheet.');
      }

      onSyncData(records, appendMode);
      setSuccessMsg(`Successfully imported ${records.length} visitor logs from Google Sheet!`);
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
      const { records, errors } = parseSheetDataToRecords(pastedData);
      if (records.length === 0) {
        throw new Error('Could not parse valid records. Please verify table format (Date, Branch, Channel, Salesperson, Products, Closed).');
      }

      onSyncData(records, appendMode);
      setSuccessMsg(`Successfully imported ${records.length} records from pasted data!`);
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
                Update report data anytime from your spreadsheet
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
            onClick={() => setActiveTab('url')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Live Sync via URL
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
            Copy-Paste from Sheet
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

          {activeTab === 'url' ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Google Sheet URL / Link
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold text-slate-400">Quick Tab:</span>
                    <button
                      type="button"
                      onClick={() => setUrlInput('https://docs.google.com/spreadsheets/d/1kpBWYO54su_iJBHY9kEwK481gCTKY2GXauSgfAUn13g/gviz/tq?tqx=out:csv&sheet=Phuket')}
                      className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded hover:bg-amber-200 transition-colors"
                    >
                      Phuket
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrlInput('https://docs.google.com/spreadsheets/d/1kpBWYO54su_iJBHY9kEwK481gCTKY2GXauSgfAUn13g/gviz/tq?tqx=out:csv&sheet=Rama9')}
                      className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                    >
                      Rama9
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrlInput('https://docs.google.com/spreadsheets/d/1kpBWYO54su_iJBHY9kEwK481gCTKY2GXauSgfAUn13g/gviz/tq?tqx=out:csv&sheet=SKV')}
                      className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded hover:bg-emerald-200 transition-colors"
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
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                  <span>Pre-configured with Lounge Lovers Master Sheet</span>
                  <a
                    href={urlInput}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    Open Google Sheet <ExternalLink className="w-3 h-3" />
                  </a>
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
                <p className="text-[11px] text-slate-400 pl-6 mt-0.5">
                  Currently tracking <strong>{currentCount}</strong> visitor records in app memory.
                </p>
              </div>

              {/* Tip info */}
              <div className="text-[11px] text-slate-500 bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Tip for Google Sheets:</strong> Make sure your sheet permission is set to <em>"Anyone with the link can view"</em> or published to the web. The system automatically maps English and Thai column headers!
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Paste rows directly from Google Sheets / Excel
                </label>
                <textarea
                  rows={6}
                  value={pastedData}
                  onChange={(e) => setPastedData(e.target.value)}
                  placeholder="Date	Branch	Channel	Salesperson	Product Interests	Order Closed&#10;2026-07-27	RM9	Walk in	Pui	Coffee Tables, Dining Chairs	No&#10;2026-07-28	SKV	Designer	Kate	Pendant Lamps	Yes"
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  You can select cells in Google Sheets, press Ctrl+C / Cmd+C, and paste here.
                </p>
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

          {/* Sync Timestamp info */}
          {lastSyncTime && (
            <p className="text-[11px] text-slate-400 text-center">
              Last synced: {new Date(lastSyncTime).toLocaleTimeString()} ({new Date(lastSyncTime).toLocaleDateString()})
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>

          {activeTab === 'url' ? (
            <button
              id="btn-trigger-sheet-sync"
              onClick={handleFetchFromGoogleSheet}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-xs transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Syncing Sheet...' : 'Sync Now'}
            </button>
          ) : (
            <button
              id="btn-trigger-paste-parse"
              onClick={handleParsePastedData}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Import Pasted Data
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
