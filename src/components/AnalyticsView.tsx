import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line,
  LabelList
} from 'recharts';
import { WeeklyReportData } from '../types';
import { formatDailyTrendDate } from '../utils/dateUtils';
import { 
  Users, 
  TrendingUp, 
  Award, 
  ShoppingBag, 
  DollarSign, 
  Layers, 
  CheckCircle2,
  FileDown,
  Loader2,
  Check,
  Printer
} from 'lucide-react';
import { exportElementToPDF, printElement } from '../utils/pdfExport';

interface AnalyticsViewProps {
  reportData: WeeklyReportData;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ reportData }) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const {
    branch,
    startDate,
    endDate,
    formattedDateRange,
    totalVisitors,
    channelBreakdown,
    salespersonBreakdown,
    dailyTrend,
    topProducts,
    closedOrdersCount,
    totalClosedAmount,
    conversionRate
  } = reportData;

  const topSalesperson = [...salespersonBreakdown].sort((a, b) => b.count - a.count)[0];
  const topProduct = topProducts[0];

  const handleDownloadPDF = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    setExportSuccess(false);

    try {
      const cleanBranch = branch.replace(/\s+/g, '_');
      const start = startDate || 'start';
      const end = endDate || 'end';
      const filename = `Visitor_Analytics_${cleanBranch}_${start}_to_${end}.pdf`;

      const success = await exportElementToPDF('analytics-dashboard-canvas', {
        filename,
        orientation: 'portrait',
        marginMm: 6,
        scale: 2
      });

      if (success) {
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to export analytics PDF:', error);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrintAnalytics = async () => {
    if (isPrinting) return;
    setIsPrinting(true);
    try {
      await printElement('analytics-dashboard-canvas', {
        orientation: 'portrait',
        title: `Visitor Analytics – ${branch} (${formattedDateRange})`
      });
    } catch (err) {
      console.error('Print failed:', err);
    } finally {
      setIsPrinting(false);
    }
  };

  const maxDailyVisitors = Math.max(...dailyTrend.map(d => d.visitors), 4);
  const dailyAxisMaxAnalytics = Math.ceil(maxDailyVisitors * 1.25) + 2;

  const maxProductMentionsAnalytics = Math.max(...topProducts.map(p => p.mentions), 4);
  const productAxisMaxAnalytics = Math.ceil(maxProductMentionsAnalytics * 1.25) + 2;

  const renderPieSliceLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }: any) => {
    if (!value || percent < 0.03) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#ffffff" 
        textAnchor="middle" 
        dominantBaseline="central" 
        fontSize={11} 
        fontWeight={800}
      >
        {value}
      </text>
    );
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
          <span>Analytics Dashboard & KPIs ({branch}) – {formattedDateRange}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-download-analytics-pdf"
            onClick={handleDownloadPDF}
            disabled={isExportingPdf}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer ${
              exportSuccess
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-75'
            }`}
          >
            {isExportingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Analytics PDF...</span>
              </>
            ) : exportSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>PDF Downloaded!</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Analytics PDF</span>
              </>
            )}
          </button>

          <button
            id="btn-print-analytics"
            onClick={handlePrintAnalytics}
            disabled={isPrinting}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-75"
          >
            {isPrinting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-500" />
                <span>Preparing Print...</span>
              </>
            ) : (
              <>
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Dashboard Canvas Container */}
      <div id="analytics-dashboard-canvas" className="space-y-6 bg-slate-50/30 p-2 sm:p-4 rounded-2xl print:p-0">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Visitors */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Visitors</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalVisitors}</span>
            <span className="text-xs text-slate-500 font-medium">{branch}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {dailyTrend.filter(d => d.visitors > 0).length} active days in period
          </p>
        </div>

        {/* Closed Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Orders Closed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">{closedOrdersCount}</span>
            <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
              {conversionRate}% rate
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {totalClosedAmount > 0 ? `฿${totalClosedAmount.toLocaleString()} total revenue` : 'Tracked from closed logs'}
          </p>
        </div>

        {/* Top Product Category */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Top Interest</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="truncate">
            <span className="text-xl font-extrabold text-slate-900 truncate block">
              {topProduct ? topProduct.category : 'N/A'}
            </span>
            <span className="text-xs font-semibold text-amber-600">
              {topProduct ? `${topProduct.mentions} mentions` : 'No data'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {topProducts.length} categories explored
          </p>
        </div>

        {/* Lead Salesperson */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Top Handled Staff</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 block">
              {topSalesperson ? topSalesperson.salesperson : 'N/A'}
            </span>
            <span className="text-xs font-semibold text-purple-600">
              {topSalesperson ? `${topSalesperson.count} visitors (${topSalesperson.closedCount} closed)` : 'No staff data'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {salespersonBreakdown.length} sales reps on duty
          </p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trend & Day of Week Comparison */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900">Daily Traffic Trend</h3>
              <p className="text-xs text-slate-500">{formattedDateRange}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              Day-by-Day
            </span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyTrend} margin={{ top: 22, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="analyticsTrendLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#573523" />
                    <stop offset="100%" stopColor="#C3AF9E" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  tickFormatter={(val) => {
                    const parts = val.split('-');
                    return parts.length === 3 ? `${parts[1]}/${parts[2]}` : val;
                  }}
                />
                <YAxis domain={[0, dailyAxisMaxAnalytics]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  formatter={(val: any) => [`${val} visitors`, 'Traffic']}
                  labelFormatter={(label) => formatDailyTrendDate(String(label)) || `Date: ${label}`}
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', border: 'none' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="url(#analyticsTrendLine)" 
                  strokeWidth={3.5} 
                  dot={{ fill: '#573523', r: 5, stroke: '#C3AF9E', strokeWidth: 2 }} 
                  activeDot={{ r: 7, fill: '#573523' }} 
                >
                  <LabelList 
                    dataKey="visitors" 
                    position="top" 
                    fill="#0f172a" 
                    fontSize={11} 
                    fontWeight={800} 
                    offset={8}
                    formatter={(val: any) => (Number(val) > 0 ? val : '')}
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Share Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900">Visitor Channel Breakdown</h3>
              <p className="text-xs text-slate-500">Source acquisition distribution</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              Channel Share
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelBreakdown}
                    dataKey="count"
                    nameKey="channel"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={48}
                    paddingAngle={3}
                    label={renderPieSliceLabel}
                    labelLine={false}
                  >
                    {channelBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any, name: any) => [`${val} visitors`, name]}
                    contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', border: 'none' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5">
              {channelBreakdown.map((ch) => (
                <div key={ch.channel} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-xs shrink-0 shadow-xs" style={{ backgroundColor: ch.color }}></span>
                    <span className="font-semibold text-slate-700">{ch.channel}</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    {ch.count} <span className="text-slate-400 font-normal">({ch.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories & Sales Team Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Product Categories of Interest */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900">Top Product Categories of Interest</h3>
              <p className="text-xs text-slate-500">Mentions breakdown (Dark = High, Light = Low)</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
              Category Rankings
            </span>
          </div>

          <div className="h-[320px] w-full">
            {topProducts.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[...topProducts.slice(0, 10)].reverse()}
                  margin={{ top: 5, right: 38, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, productAxisMaxAnalytics]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis 
                    type="category" 
                    dataKey="category" 
                    width={110} 
                    tick={{ fontSize: 10.5, fill: '#1e293b', fontWeight: 600 }} 
                  />
                  <Tooltip 
                    formatter={(val: any) => [`${val} mentions`, 'Product Interest']}
                    contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', border: 'none' }}
                  />
                  <Bar dataKey="mentions" radius={[0, 4, 4, 0]} barSize={13}>
                    {[...topProducts.slice(0, 10)].reverse().map((entry, index) => (
                      <Cell key={`cell-prod-analytics-${index}`} fill={entry.color} />
                    ))}
                    <LabelList 
                      dataKey="mentions" 
                      position="right" 
                      fill="#0f172a" 
                      fontSize={10.5} 
                      fontWeight={800} 
                      offset={6}
                      formatter={(val: any) => (Number(val) > 0 ? val : '')}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No product interest recorded
              </div>
            )}
          </div>
        </div>

        {/* Salesperson Performance Leaderboard */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900">Sales Team Engagement & Conversion</h3>
              <p className="text-xs text-slate-500">Staff visitor handling & closed orders</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              Sales Reps
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 align-bottom">Sales<br />Rep</th>
                  <th className="pb-3 align-bottom text-center">Total<br />Visits</th>
                  <th className="pb-3 align-bottom text-center">Draft<br />Quotes</th>
                  <th className="pb-3 align-bottom text-center">Quote<br />Rate</th>
                  <th className="pb-3 align-bottom text-center">Closed<br />Orders</th>
                  <th className="pb-3 align-bottom text-center">Close<br />Rate</th>
                  <th className="pb-3 align-bottom text-right">Perf.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {salespersonBreakdown.map((sp) => (
                  <tr key={sp.salesperson} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 font-semibold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sp.color }}></span>
                      <span className="truncate max-w-[100px]" title={sp.salesperson}>{sp.salesperson}</span>
                    </td>
                    <td className="py-2.5 font-medium text-slate-700 text-center">{sp.count}</td>
                    <td className="py-2.5 font-semibold text-amber-600 text-center">{sp.quotedCount}</td>
                    <td className="py-2.5 text-center">
                      <span className="px-1.5 py-0.5 text-xs font-bold bg-amber-50 text-amber-800 rounded-md">
                        {sp.quoteRate}%
                      </span>
                    </td>
                    <td className="py-2.5 font-semibold text-emerald-600 text-center">{sp.closedCount}</td>
                    <td className="py-2.5 text-center">
                      <span className="px-1.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-800 rounded-md">
                        {sp.conversionRate}%
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <div className="w-24 ml-auto bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${totalVisitors > 0 ? (sp.count / totalVisitors) * 100 : 0}%`,
                            backgroundColor: sp.color 
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
