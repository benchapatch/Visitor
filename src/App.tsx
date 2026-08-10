import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ReportSlideView } from './components/ReportSlideView';
import { AnalyticsView } from './components/AnalyticsView';
import { VisitorTableView } from './components/VisitorTableView';
import { SheetSyncModal } from './components/SheetSyncModal';
import { AddRecordModal } from './components/AddRecordModal';
import { INITIAL_VISITOR_RECORDS } from './data/seedData';
import { VisitorRecord, ViewMode } from './types';
import { calculateWeeklyReport } from './utils/reportCalculator';
import { shiftWeek, getDynamicWeeklyRanges } from './utils/dateUtils';
import { parseSheetDataToRecords } from './utils/sheetParser';

const STORAGE_KEY = 'lounge_lovers_visitor_records_v8';
const SHEET_URL_KEY = 'lounge_lovers_sheet_url_v2';
const LAST_SYNC_KEY = 'lounge_lovers_last_sync_v2';

function sanitizeRecordsList(rawList: VisitorRecord[]): VisitorRecord[] {
  return rawList.map(r => {
    let sp = r.salesperson ? r.salesperson.trim() : 'Unassigned';
    if (sp === 'View') sp = 'Pui';
    if (sp === 'Mind') sp = 'Tim';
    if (sp === 'Beam') sp = 'Aliss';
    if (sp === 'Bell') sp = 'Aom';
    if (sp === 'Nut') sp = 'Pui';
    if (sp === 'Eve') sp = 'Tim';
    if (sp === 'Pook') sp = 'Kate';
    return {
      ...r,
      salesperson: sp
    };
  });
}

export default function App() {
  // 1. Visitor Records State with Local Storage persistence & seed synchronization
  const [records, setRecords] = useState<VisitorRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sanitizeRecordsList(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load records from localStorage', e);
    }
    return INITIAL_VISITOR_RECORDS;
  });

  // Save records to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [records]);

  // 2. Branch State (Default to PHUKET or RM9)
  const [selectedBranch, setSelectedBranch] = useState<string>('PHUKET');

  // Available branches list
  const availableBranches = useMemo(() => {
    const branchSet = new Set<string>(['PHUKET', 'RM9', 'SKV']);
    records.forEach(r => {
      if (r.branch) branchSet.add(r.branch.toUpperCase());
    });
    return [...Array.from(branchSet), 'ALL'];
  }, [records]);

  // 3. Weekly Date Range State (Dynamically initialized to active week)
  const [startDate, setStartDate] = useState<string>(() => {
    const weekly = getDynamicWeeklyRanges(INITIAL_VISITOR_RECORDS);
    return weekly.lastWeek.startDate;
  });
  const [endDate, setEndDate] = useState<string>(() => {
    const weekly = getDynamicWeeklyRanges(INITIAL_VISITOR_RECORDS);
    return weekly.lastWeek.endDate;
  });

  // 4. View Mode State
  const [viewMode, setViewMode] = useState<ViewMode>('report-slide');

  // 5. Google Sheets Sync State
  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    return localStorage.getItem(SHEET_URL_KEY) || 
      'https://docs.google.com/spreadsheets/d/1kpBWYO54su_iJBHY9kEwK481gCTKY2GXauSgfAUn13g/edit?gid=870055913#gid=870055913';
  });
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => {
    return localStorage.getItem(LAST_SYNC_KEY) || null;
  });
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // 6. Record Add / Edit Modal State
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<VisitorRecord | null>(null);

  // Calculate Report for current filters
  const reportData = useMemo(() => {
    return calculateWeeklyReport(records, selectedBranch, startDate, endDate);
  }, [records, selectedBranch, startDate, endDate]);

  // Shift Week Navigation
  const handleShiftWeek = (direction: number) => {
    const newRange = shiftWeek(startDate, direction, true);
    setStartDate(newRange.startDate);
    setEndDate(newRange.endDate);
  };

  // Google Sheet Data Sync Handler
  const handleSyncData = (newRecords: VisitorRecord[], appendMode: boolean, syncBranch?: string) => {
    const sanitizedNew = sanitizeRecordsList(newRecords);
    if (appendMode) {
      // Merge unique by ID
      const existingIds = new Set(records.map(r => r.id));
      const filteredNew = sanitizedNew.filter(r => !existingIds.has(r.id));
      setRecords([...records, ...filteredNew]);
    } else {
      if (syncBranch && syncBranch !== 'ALL') {
        const branchNorm = syncBranch.toUpperCase();
        const otherBranches = records.filter(r => r.branch.toUpperCase() !== branchNorm);
        setRecords([...otherBranches, ...sanitizedNew]);
      } else {
        setRecords(sanitizedNew);
      }
    }
    const now = new Date().toISOString();
    setLastSyncTime(now);
    localStorage.setItem(LAST_SYNC_KEY, now);
  };

  const handleUpdateSheetUrl = (url: string) => {
    setSheetUrl(url);
    localStorage.setItem(SHEET_URL_KEY, url);
  };

  // Add / Edit / Delete Records
  const handleSaveRecord = (savedRecord: VisitorRecord) => {
    if (editingRecord) {
      setRecords(records.map(r => r.id === savedRecord.id ? savedRecord : r));
    } else {
      setRecords([savedRecord, ...records]);
    }
    setEditingRecord(null);
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('Are you sure you want to delete this visitor record?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const handleOpenAddRecord = () => {
    setEditingRecord(null);
    setIsRecordModalOpen(true);
  };

  const handleOpenEditRecord = (rec: VisitorRecord) => {
    setEditingRecord(rec);
    setIsRecordModalOpen(true);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Branch', 'Channel', 'Salesperson', 'Product Interests', 'Order Closed', 'Order Amount', 'Notes'];
    const rows = reportData.filteredRecords.map(r => [
      r.id,
      r.date,
      r.branch,
      r.channel,
      r.salesperson,
      `"${(r.productInterests || []).join(', ')}"`,
      r.orderClosed ? 'Yes' : 'No',
      r.orderAmount || '',
      `"${(r.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Visitor_Log_${selectedBranch}_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetToSeed = () => {
    setRecords(INITIAL_VISITOR_RECORDS);
    const weekly = getDynamicWeeklyRanges(INITIAL_VISITOR_RECORDS);
    setStartDate(weekly.lastWeek.startDate);
    setEndDate(weekly.lastWeek.endDate);
    setSelectedBranch('RM9');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VISITOR_RECORDS));
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col">
      {/* Top Header */}
      <Header
        branches={availableBranches}
        selectedBranch={selectedBranch}
        onSelectBranch={setSelectedBranch}
        startDate={startDate}
        endDate={endDate}
        onDateChange={(s, e) => {
          setStartDate(s);
          setEndDate(e);
        }}
        onShiftWeek={handleShiftWeek}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        lastSyncTime={lastSyncTime}
        isSyncing={isSyncing}
        totalRecordsCount={records.length}
        records={records}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {viewMode === 'report-slide' && (
          <ReportSlideView reportData={reportData} />
        )}

        {viewMode === 'analytics' && (
          <AnalyticsView reportData={reportData} />
        )}

        {viewMode === 'table' && (
          <VisitorTableView
            records={reportData.filteredRecords}
            onAddRecord={handleOpenAddRecord}
            onEditRecord={handleOpenEditRecord}
            onDeleteRecord={handleDeleteRecord}
            onExportCSV={handleExportCSV}
            onResetRecords={handleResetToSeed}
          />
        )}
      </main>

      {/* Footer info (print:hidden) */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div>
            Lounge Lovers Weekly Visitor Intelligence • Branch: <strong>{selectedBranch}</strong> • Records in view: <strong>{reportData.totalVisitors}</strong>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleResetToSeed}
              className="text-slate-400 hover:text-slate-600 underline text-[11px]"
            >
              Reset Sample Data
            </button>
            <span>Auto-saving locally</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SheetSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        sheetUrl={sheetUrl}
        onUpdateSheetUrl={handleUpdateSheetUrl}
        lastSyncTime={lastSyncTime}
        onSyncData={handleSyncData}
        onResetRecords={handleResetToSeed}
        currentCount={records.length}
        selectedBranch={selectedBranch}
      />

      <AddRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => {
          setIsRecordModalOpen(false);
          setEditingRecord(null);
        }}
        onSave={handleSaveRecord}
        initialRecord={editingRecord}
        availableBranches={availableBranches}
      />
    </div>
  );
}
