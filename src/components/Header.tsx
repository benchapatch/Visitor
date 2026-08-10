import React, { useMemo } from 'react';
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
import { ViewMode, VisitorRecord } from '../types';
import { 
  getDynamicWeeklyRanges, 
  getAvailableMonthsFromRecords, 
  formatShortDateRange 
} from '../utils/dateUtils';

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
  records?: VisitorRecord[];
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
  totalRecordsCount,
  records
}) => {
  // Dynamically compute Current Week and Last Week from dataset & calendar
  const { currentWeek, lastWeek } = useMemo(() => {
    return getDynamicWeeklyRanges(records);
  }, [records]);

  // Dynamically compute monthly summaries from records
  const availableMonths = useMemo(() => {
    return getAvailableMonthsFromRecords(records);
  }, [records]);

  // Calculate overall range of all recorded data
  const allRecordedDatesRange = useMemo(() => {
    if (!records || records.length === 0) {
      return { startDate: '2026-05-01', endDate: '2026-08-31' };
    }
    let minD = '9999-99-99';
    let maxD = '0000-00-00';
    for (const r of records) {
      if (r.date) {
        if (r.date < minD) minD = r.date;
        if (r.date > maxD) maxD = r.date;
      }
    }
    return {
      startDate: minD !== '9999-99-99' ? minD : '2026-05-01',
      endDate: maxD !== '0000-00-00' ? maxD : '2026-08-31'
    };
  }, [records]);
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
                    if (startDate === currentWeek.startDate && endDate === currentWeek.endDate) return 'current-week';
                    if (startDate === lastWeek.startDate && endDate === lastWeek.endDate) return 'last-week';
                    for (const m of availableMonths) {
                      if (startDate === m.startDate && endDate === m.endDate) return m.key;
                    }
                    if (startDate === allRecordedDatesRange.startDate && endDate === allRecordedDatesRange.endDate) return 'all-months';
                    return 'custom';
                  })()}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'current-week') {
                      onDateChange(currentWeek.startDate, currentWeek.endDate);
                    } else if (val === 'last-week') {
                      onDateChange(lastWeek.startDate, lastWeek.endDate);
                    } else if (val === 'all-months') {
                      onDateChange(allRecordedDatesRange.startDate, allRecordedDatesRange.endDate);
                    } else if (val.startsWith('month-')) {
                      const found = availableMonths.find(m => m.key === val);
                      if (found) {
                        onDateChange(found.startDate, found.endDate);
                      }
                    }
                  }}
                  className="bg-white text-slate-800 text-xs font-bold pl-3 pr-8 py-1.5 rounded-lg border border-slate-300 shadow-2xs hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  <optgroup label="Weekly Reports">
                    <option value="current-week">{currentWeek.label}</option>
                    <option value="last-week">{lastWeek.label}</option>
                  </optgroup>

                  <optgroup label="Monthly Summaries">
                    {availableMonths.map((m) => (
                      <option key={m.key} value={m.key}>
                        {m.display}
                      </option>
                    ))}
                    <option value="all-months">
                      All Recorded Data ({formatShortDateRange(allRecordedDatesRange.startDate, allRecordedDatesRange.endDate)})
                    </option>
                  </optgroup>

                  <optgroup label="Custom Selection">
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
