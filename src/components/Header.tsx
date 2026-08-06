import React from 'react';
import { 
  Building2, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  FileSpreadsheet, 
  LayoutDashboard, 
  Table, 
  BarChart3, 
  Presentation, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  branches: string[];
  selectedBranch: string;
  onSelectBranch: (branch: string) => void;
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
  onShiftWeek: (direction: number) => void;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  onOpenSyncModal: () => void;
  lastSyncTime: string | null;
  isSyncing: boolean;
  totalRecordsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  branches,
  selectedBranch,
  onSelectBranch,
  startDate,
  endDate,
  onDateChange,
  onShiftWeek,
  viewMode,
  onSelectViewMode,
  onOpenSyncModal,
  lastSyncTime,
  isSyncing,
  totalRecordsCount
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs print:hidden">
      {/* Top Bar: Brand & Main Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-base shadow-sm">
            LL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900">
                Visitor Log – Weekly Report
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                Every Monday
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Lounge Lovers Showroom Visitor Intelligence
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
          <button
            id="tab-view-report-slide"
            onClick={() => onSelectViewMode('report-slide')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'report-slide'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Presentation className="w-3.5 h-3.5 text-blue-600" />
            <span>Monday Report Slide</span>
          </button>

          <button
            id="tab-view-analytics"
            onClick={() => onSelectViewMode('analytics')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'analytics'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Analytics</span>
          </button>

          <button
            id="tab-view-table"
            onClick={() => onSelectViewMode('table')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-emerald-600" />
            <span>Data Logs ({totalRecordsCount})</span>
          </button>
        </div>

        {/* Google Sheet Sync Action */}
        <div className="flex items-center gap-2">
          <button
            id="btn-open-google-sync"
            onClick={onOpenSyncModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-2xs hover:shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Google Sheets Live Sync</span>
            {lastSyncTime ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected"></span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400" title="Offline Seed"></span>
            )}
          </button>
        </div>

      </div>

      {/* Secondary Bar: Branch Navigation & Weekly Period Filter */}
      <div className="bg-slate-50/70 border-t border-slate-100 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Branch Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Branch:
            </span>
            <div className="flex items-center gap-1.5">
              {branches.map(b => (
                <button
                  key={b}
                  id={`btn-branch-${b.toLowerCase()}`}
                  onClick={() => onSelectBranch(b)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    selectedBranch === b
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Month / Weekly Period DropDownList Selector */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2">
              <label htmlFor="period-month-select" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" /> Select Month / Period:
              </label>
              
              {/* DropDownList for Month and Period */}
              <div className="relative">
                <select
                  id="period-month-select"
                  value={(() => {
                    if (startDate === '2026-05-01' && endDate === '2026-05-31') return 'month-may';
                    if (startDate === '2026-06-01' && endDate === '2026-06-30') return 'month-jun';
                    if (startDate === '2026-07-01' && endDate === '2026-07-31') return 'month-jul';
                    if (startDate === '2026-08-01' && endDate === '2026-08-31') return 'month-aug';
                    if (startDate === '2026-05-01' && endDate === '2026-08-31') return 'all-months';
                    if (startDate === '2026-07-27' && endDate === '2026-08-01') return 'report-week';
                    if (startDate === '2026-08-03' && endDate === '2026-08-08') return 'current-week';
                    if (startDate === '2026-05-04' && endDate === '2026-05-09') return 'w-may-w1';
                    if (startDate === '2026-05-11' && endDate === '2026-05-16') return 'w-may-w2';
                    if (startDate === '2026-05-18' && endDate === '2026-05-23') return 'w-may-w3';
                    if (startDate === '2026-05-25' && endDate === '2026-05-30') return 'w-may-w4';
                    if (startDate === '2026-06-01' && endDate === '2026-06-06') return 'w-jun-w1';
                    if (startDate === '2026-06-08' && endDate === '2026-06-13') return 'w-jun-w2';
                    if (startDate === '2026-06-15' && endDate === '2026-06-20') return 'w-jun-w3';
                    if (startDate === '2026-06-22' && endDate === '2026-06-27') return 'w-jun-w4';
                    if (startDate === '2026-06-29' && endDate === '2026-07-04') return 'w-jul-w1';
                    if (startDate === '2026-07-06' && endDate === '2026-07-11') return 'w-jul-w2';
                    if (startDate === '2026-07-13' && endDate === '2026-07-18') return 'w-jul-w3';
                    if (startDate === '2026-07-20' && endDate === '2026-07-25') return 'w-jul-w4';
                    return 'custom';
                  })()}
                  onChange={(e) => {
                    const val = e.target.value;
                    switch (val) {
                      case 'report-week':
                        onDateChange('2026-07-27', '2026-08-01');
                        break;
                      case 'current-week':
                        onDateChange('2026-08-03', '2026-08-08');
                        break;
                      case 'month-may':
                        onDateChange('2026-05-01', '2026-05-31');
                        break;
                      case 'month-jun':
                        onDateChange('2026-06-01', '2026-06-30');
                        break;
                      case 'month-jul':
                        onDateChange('2026-07-01', '2026-07-31');
                        break;
                      case 'month-aug':
                        onDateChange('2026-08-01', '2026-08-31');
                        break;
                      case 'all-months':
                        onDateChange('2026-05-01', '2026-08-31');
                        break;
                      case 'w-may-w1':
                        onDateChange('2026-05-04', '2026-05-09');
                        break;
                      case 'w-may-w2':
                        onDateChange('2026-05-11', '2026-05-16');
                        break;
                      case 'w-may-w3':
                        onDateChange('2026-05-18', '2026-05-23');
                        break;
                      case 'w-may-w4':
                        onDateChange('2026-05-25', '2026-05-30');
                        break;
                      case 'w-jun-w1':
                        onDateChange('2026-06-01', '2026-06-06');
                        break;
                      case 'w-jun-w2':
                        onDateChange('2026-06-08', '2026-06-13');
                        break;
                      case 'w-jun-w3':
                        onDateChange('2026-06-15', '2026-06-20');
                        break;
                      case 'w-jun-w4':
                        onDateChange('2026-06-22', '2026-06-27');
                        break;
                      case 'w-jul-w1':
                        onDateChange('2026-06-29', '2026-07-04');
                        break;
                      case 'w-jul-w2':
                        onDateChange('2026-07-06', '2026-07-11');
                        break;
                      case 'w-jul-w3':
                        onDateChange('2026-07-13', '2026-07-18');
                        break;
                      case 'w-jul-w4':
                        onDateChange('2026-07-20', '2026-07-25');
                        break;
                      default:
                        break;
                    }
                  }}
                  className="bg-white text-slate-800 text-xs font-bold pl-3 pr-8 py-1.5 rounded-lg border border-slate-300 shadow-2xs hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  <optgroup label="📅 Monthly Summaries (เลือกรายเดือน)">
                    <option value="month-may">May 2026 (01 - 31 May)</option>
                    <option value="month-jun">June 2026 (01 - 30 Jun)</option>
                    <option value="month-jul">July 2026 (01 - 31 Jul)</option>
                    <option value="month-aug">August 2026 (01 - 31 Aug)</option>
                    <option value="all-months">All Months (01 May - 31 Aug 2026)</option>
                  </optgroup>

                  <optgroup label="📊 Executive Weekly Reports">
                    <option value="report-week">⭐ Report Week (27 Jul - 01 Aug 2026)</option>
                    <option value="current-week">Current Week (03 Aug - 08 Aug 2026)</option>
                  </optgroup>

                  <optgroup label="🗓️ Weekly Breakdown (May - Aug)">
                    <option value="w-may-w1">May Week 1 (04 - 09 May 2026)</option>
                    <option value="w-may-w2">May Week 2 (11 - 16 May 2026)</option>
                    <option value="w-may-w3">May Week 3 (18 - 23 May 2026)</option>
                    <option value="w-may-w4">May Week 4 (25 - 30 May 2026)</option>
                    <option value="w-jun-w1">June Week 1 (01 - 06 Jun 2026)</option>
                    <option value="w-jun-w2">June Week 2 (08 - 13 Jun 2026)</option>
                    <option value="w-jun-w3">June Week 3 (15 - 20 Jun 2026)</option>
                    <option value="w-jun-w4">June Week 4 (22 - 27 Jun 2026)</option>
                    <option value="w-jul-w1">July Week 1 (29 Jun - 04 Jul 2026)</option>
                    <option value="w-jul-w2">July Week 2 (06 - 11 Jul 2026)</option>
                    <option value="w-jul-w3">July Week 3 (13 - 18 Jul 2026)</option>
                    <option value="w-jul-w4">July Week 4 (20 - 25 Jul 2026)</option>
                  </optgroup>

                  <optgroup label="⚙️ Custom Selection">
                    <option value="custom">Custom Date Range...</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Quick Shift buttons and exact date picker */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
              <button
                id="btn-prev-week"
                onClick={() => onShiftWeek(-1)}
                className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                title="Shift -1 Week"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-slate-800">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => onDateChange(e.target.value, endDate)}
                  className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer text-slate-700"
                />
                <span className="text-slate-400 font-normal">to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => onDateChange(startDate, e.target.value)}
                  className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer text-slate-700"
                />
              </div>

              <button
                id="btn-next-week"
                onClick={() => onShiftWeek(1)}
                className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                title="Shift +1 Week"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
