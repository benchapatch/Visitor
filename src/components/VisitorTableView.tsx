import React, { useState } from 'react';
import { VisitorRecord } from '../types';
import { 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  XCircle, 
  Download, 
  ArrowUpDown 
} from 'lucide-react';
import { formatDateEnglish } from '../utils/dateUtils';

interface VisitorTableViewProps {
  records: VisitorRecord[];
  onAddRecord: () => void;
  onEditRecord: (record: VisitorRecord) => void;
  onDeleteRecord: (id: string) => void;
  onExportCSV: () => void;
  onResetRecords?: () => void;
}

export const VisitorTableView: React.FC<VisitorTableViewProps> = ({
  records,
  onAddRecord,
  onEditRecord,
  onDeleteRecord,
  onExportCSV,
  onResetRecords
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [selectedSalesperson, setSelectedSalesperson] = useState('ALL');
  const [closedFilter, setClosedFilter] = useState<'ALL' | 'YES' | 'NO'>('ALL');
  const [sortField, setSortField] = useState<'date' | 'salesperson' | 'branch'>('date');
  const [sortAsc, setSortAsc] = useState(false);

  // Channels and salespersons for filters
  const channels = Array.from(new Set(records.map(r => r.channel))).filter(Boolean);
  const salespersons = Array.from(new Set(records.map(r => r.salesperson))).filter(Boolean);

  const filtered = records
    .filter(r => {
      // Search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchProducts = (r.productInterests || []).some(p => p.toLowerCase().includes(term));
        const matchNotes = (r.notes || '').toLowerCase().includes(term);
        const matchSales = r.salesperson.toLowerCase().includes(term);
        const matchBranch = r.branch.toLowerCase().includes(term);
        const matchChannel = r.channel.toLowerCase().includes(term);
        if (!matchProducts && !matchNotes && !matchSales && !matchBranch && !matchChannel) {
          return false;
        }
      }

      // Channel filter
      if (selectedChannel !== 'ALL' && r.channel !== selectedChannel) return false;

      // Salesperson filter
      if (selectedSalesperson !== 'ALL' && r.salesperson !== selectedSalesperson) return false;

      // Closed filter
      if (closedFilter === 'YES' && !r.orderClosed) return false;
      if (closedFilter === 'NO' && r.orderClosed) return false;

      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = a.date.localeCompare(b.date);
      } else if (sortField === 'salesperson') {
        comparison = a.salesperson.localeCompare(b.salesperson);
      } else if (sortField === 'branch') {
        comparison = a.branch.localeCompare(b.branch);
      }
      return sortAsc ? comparison : -comparison;
    });

  const toggleSort = (field: 'date' | 'salesperson' | 'branch') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Showroom Visitor Log Records</h2>
          <p className="text-xs text-slate-500">
            Showing {filtered.length} of {records.length} total entries
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onResetRecords && (
            <button
              id="btn-reset-master-data"
              onClick={() => {
                if (window.confirm('Reload full master dataset with all RM9, SKV, and Phuket records for May-August?')) {
                  onResetRecords();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Reload comprehensive master data"
            >
              🔄 Reload Full Data
            </button>
          )}

          <button
            id="btn-export-csv"
            onClick={onExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>

          <button
            id="btn-add-visitor-log"
            onClick={onAddRecord}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Visitor Log
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="table-search-input"
            type="text"
            placeholder="Search products, staff, notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Channel Filter */}
        <div>
          <select
            id="table-channel-filter"
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
          >
            <option value="ALL">All Channels</option>
            {channels.map(ch => (
              <option key={ch} value={ch}>{ch}</option>
            ))}
          </select>
        </div>

        {/* Salesperson Filter */}
        <div>
          <select
            id="table-salesperson-filter"
            value={selectedSalesperson}
            onChange={(e) => setSelectedSalesperson(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
          >
            <option value="ALL">All Salespersons</option>
            {salespersons.map(sp => (
              <option key={sp} value={sp}>{sp}</option>
            ))}
          </select>
        </div>

        {/* Closed Filter */}
        <div>
          <select
            id="table-closed-filter"
            value={closedFilter}
            onChange={(e) => setClosedFilter(e.target.value as any)}
            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
          >
            <option value="ALL">All Deal Statuses</option>
            <option value="YES">Closed Orders Only</option>
            <option value="NO">Inquiries / Open Only</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto border border-slate-100 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-3.5 cursor-pointer hover:text-blue-600" onClick={() => toggleSort('date')}>
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3.5 cursor-pointer hover:text-blue-600" onClick={() => toggleSort('branch')}>
                <div className="flex items-center gap-1">
                  <span>Branch</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3.5">Channel</th>
              <th className="py-3 px-3.5 cursor-pointer hover:text-blue-600" onClick={() => toggleSort('salesperson')}>
                <div className="flex items-center gap-1">
                  <span>Salesperson</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3.5">Product Interests</th>
              <th className="py-3 px-3.5">Deal Status</th>
              <th className="py-3 px-3.5">Notes</th>
              <th className="py-3 px-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No visitor logs match your search and filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3.5 font-medium text-slate-900 whitespace-nowrap">
                    {record.date}
                  </td>
                  <td className="py-3 px-3.5">
                    <span className="px-2 py-0.5 font-bold rounded-md bg-slate-100 text-slate-800 text-[11px]">
                      {record.branch}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-medium text-slate-700 whitespace-nowrap">
                    {record.channel}
                  </td>
                  <td className="py-3 px-3.5 font-semibold text-slate-800 whitespace-nowrap">
                    {record.salesperson}
                  </td>
                  <td className="py-3 px-3.5 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {record.productInterests.map((p, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 font-medium rounded text-[10px]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3.5 whitespace-nowrap">
                    {record.orderClosed ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded-md text-[11px]">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Closed {record.orderAmount ? `(฿${record.orderAmount.toLocaleString()})` : ''}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">Inquiry</span>
                    )}
                  </td>
                  <td className="py-3 px-3.5 text-slate-500 max-w-xs truncate">
                    {record.notes || record.closedDetails || '-'}
                  </td>
                  <td className="py-3 px-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEditRecord(record)}
                        className="p-1 hover:bg-slate-200 text-slate-600 rounded transition-colors"
                        title="Edit record"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteRecord(record.id)}
                        className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
