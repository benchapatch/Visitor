import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell,
  LabelList
} from 'recharts';
import { WeeklyReportData } from '../types';
import { Download, Copy, Printer, Check, TrendingUp } from 'lucide-react';

interface ReportSlideViewProps {
  reportData: WeeklyReportData;
  onPrint?: () => void;
}

export const ReportSlideView: React.FC<ReportSlideViewProps> = ({ reportData, onPrint }) => {
  const [copied, setCopied] = React.useState(false);

  const {
    branch,
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

  const handleCopySummary = () => {
    const text = `📊 Visitor Log – ${branch}\n📅 ${formattedDateRange}\n\n` +
      `👥 Total Number of Visitors : ${totalVisitors}\n` +
      channelBreakdown.map(c => `• ${c.channel}: ${c.count} visitors`).join('\n') +
      `\n\n🏆 Top Product Interests:\n` +
      topProducts.slice(0, 10).map(p => `${p.rank}. ${p.category} : ${p.mentions} mentions`).join('\n') +
      `\n\n💼 Visitors Handled:\n` +
      salespersonBreakdown.map(s => `• ${s.salesperson}: ${s.count} visitor${s.count > 1 ? 's' : ''}`).join('\n') +
      `\n\n✅ Closed Orders:\n• Closed ${closedOrdersCount} Orders` +
      (totalClosedAmount > 0 ? ` (Total: ฿${totalClosedAmount.toLocaleString()})` : '');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Prepare Daily Trend data for horizontal bar chart
  const dailyChartData = dailyTrend.map(d => ({
    name: d.displayDate || d.date,
    visitors: d.visitors,
    color: d.color || '#573523'
  }));

  // Max value for daily trend axis scaling (with headroom for labels)
  const maxDaily = Math.max(...dailyTrend.map(d => d.visitors), 4);
  const dailyAxisMax = Math.max(Math.ceil(maxDaily / 2) * 2, maxDaily + 2);

  // Max value for salesperson axis scaling (with headroom for labels)
  const maxSales = Math.max(...salespersonBreakdown.map(s => s.count), 4);
  const salesAxisMax = Math.max(Math.ceil(maxSales / 5) * 5, maxSales + 2);

  // Max value for channels axis scaling (with headroom for labels)
  const maxChannel = Math.max(...channelBreakdown.map(c => c.count), 4);
  const channelAxisMax = Math.max(Math.ceil(maxChannel / 5) * 5, maxChannel + 2);

  // Top products limited to top 10 for clean single-frame chart
  const topProductsChart = topProducts.slice(0, 10).map(p => ({
    name: p.category,
    mentions: p.mentions,
    color: p.color
  })).reverse(); // reverse so #1 is at the top of horizontal chart

  const maxProductMentions = Math.max(...topProductsChart.map(p => p.mentions), 4);
  const productAxisMax = Math.max(Math.ceil(maxProductMentions / 2) * 2, maxProductMentions + 1);

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Official Monday Report Slide View ({branch})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-copy-summary"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Summary!' : 'Copy Summary Text'}
          </button>

          <button
            id="btn-print-slide"
            onClick={() => {
              if (onPrint) onPrint();
              else window.print();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save Slide PDF
          </button>
        </div>
      </div>

      {/* Main Slide Canvas - Exactly matching the sample PDF layout */}
      <div 
        id="weekly-report-slide-canvas"
        className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm text-slate-900 max-w-[1400px] mx-auto transition-all print:p-0 print:border-none print:shadow-none"
      >
        {/* Slide Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                Visitor Log – {branch}
              </h1>
              <p className="text-lg lg:text-xl font-bold text-slate-700 mt-1">
                {formattedDateRange || 'Weekly Report'}
              </p>
            </div>
            <div className="hidden md:block w-px h-16 bg-slate-300"></div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Executive Report</span>
            <span className="text-sm font-semibold text-slate-600">Lounge Lovers Showroom Analytics</span>
          </div>
        </div>

        {/* 2-Column Main Layout: Left 2x2 Grid (68%), Right Bullet List (32%) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
          
          {/* LEFT 2x2 CHART GRID (Col span 8 on xl) */}
          <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chart 1: Daily Visitor Trend (Vertical Bar with Angled Date Labels) */}
            <div className="bg-[#f8fafd] rounded-xl p-4 border border-slate-100 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">Daily Visitor Trend</h3>
              </div>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dailyChartData}
                    margin={{ top: 15, right: 10, left: -15, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      interval={0}
                      angle={-35}
                      textAnchor="end"
                      height={50}
                      tick={{ fontSize: 9.5, fill: '#1e293b', fontWeight: 600, fontStyle: 'italic' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis 
                      domain={[0, dailyAxisMax]} 
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      allowDecimals={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <Tooltip 
                      formatter={(val: any) => [`${val} visitors`, 'Visitors']}
                      contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                    />
                    <Bar dataKey="visitors" radius={[4, 4, 0, 0]} barSize={22}>
                      {dailyChartData.map((entry, index) => (
                        <Cell key={`cell-daily-${index}`} fill={entry.color} />
                      ))}
                      <LabelList 
                        dataKey="visitors" 
                        position="top" 
                        fill="#1e293b" 
                        fontSize={11} 
                        fontWeight={700} 
                        offset={4}
                        formatter={(val: any) => (Number(val) > 0 ? val : '')}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className="text-[11px] font-semibold text-slate-500">Day-by-Day Visitors</span>
              </div>
            </div>

            {/* Chart 2: Visitor Handle by Sale Person (Vertical Bar) */}
            <div className="bg-[#f8fafd] rounded-xl p-4 border border-slate-100 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">Visitor Handle by Sale Person</h3>
              </div>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salespersonBreakdown}
                    margin={{ top: 15, right: 10, left: -15, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="salesperson" 
                      interval={0}
                      angle={-35}
                      textAnchor="end"
                      height={50}
                      tick={{ fontSize: 10.5, fill: '#1e293b', fontWeight: 600, fontStyle: 'italic' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis 
                      domain={[0, salesAxisMax]} 
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      allowDecimals={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <Tooltip 
                      formatter={(val: any) => [`${val} visitors`, 'Handled']}
                      contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={22}>
                      {salespersonBreakdown.map((entry, index) => (
                        <Cell key={`cell-sale-${index}`} fill={entry.color} />
                      ))}
                      <LabelList 
                        dataKey="count" 
                        position="top" 
                        fill="#1e293b" 
                        fontSize={11} 
                        fontWeight={700} 
                        offset={4}
                        formatter={(val: any) => (Number(val) > 0 ? val : '')}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] font-semibold text-slate-500 mt-1">
                Sales Team Staff
              </div>
            </div>

            {/* Chart 3: Top Product Categories of Interest (Horizontal Bar - TOP 10) */}
            <div className="bg-[#f8fafd] rounded-xl p-4 border border-slate-100 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-slate-800">Top Product Categories of Interest</h3>
              </div>
              <div className="h-[260px] w-full">
                {topProductsChart.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={topProductsChart}
                      margin={{ top: 4, right: 28, left: 5, bottom: 4 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis 
                        type="number" 
                        domain={[0, productAxisMax]} 
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        axisLine={{ stroke: '#cbd5e1' }}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        interval={0}
                        tick={{ fontSize: 9.5, fill: '#1e293b', fontWeight: 600 }} 
                        width={110}
                        axisLine={{ stroke: '#cbd5e1' }}
                      />
                      <Tooltip 
                        formatter={(val: any) => [`${val} mentions`, 'Product Mentions']}
                        contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                      />
                      <Bar dataKey="mentions" radius={[0, 4, 4, 0]} barSize={11}>
                        {topProductsChart.map((entry, index) => (
                          <Cell key={`cell-prod-${index}`} fill={entry.color} />
                        ))}
                        <LabelList 
                          dataKey="mentions" 
                          position="right" 
                          fill="#1e293b" 
                          fontSize={10} 
                          fontWeight={700} 
                          offset={5}
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
              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] font-semibold text-slate-500 mt-1">
                Product Interest Mentions (TOP 10)
              </div>
            </div>

            {/* Chart 4: Visitor by Channel (Vertical Bar) */}
            <div className="bg-[#f8fafd] rounded-xl p-4 border border-slate-100 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-800">Visitor by Channel</h3>
              </div>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={channelBreakdown}
                    margin={{ top: 15, right: 10, left: -15, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="channel" 
                      interval={0}
                      angle={-35}
                      textAnchor="end"
                      height={45}
                      tick={{ fontSize: 10, fill: '#1e293b', fontWeight: 600, fontStyle: 'italic' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis 
                      domain={[0, channelAxisMax]} 
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <Tooltip 
                      formatter={(val: any) => [`${val} visitors`, 'Channel']}
                      contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={24}>
                      {channelBreakdown.map((entry, index) => (
                        <Cell key={`cell-chan-${index}`} fill={entry.color} />
                      ))}
                      <LabelList 
                        dataKey="count" 
                        position="top" 
                        fill="#1e293b" 
                        fontSize={11} 
                        fontWeight={700} 
                        offset={4}
                        formatter={(val: any) => (Number(val) > 0 ? val : '')}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] font-semibold text-slate-500 mt-1">
                Lead Acquisition Channel
              </div>
            </div>

          </div>

          {/* RIGHT SUMMARY METRICS & LISTS (Col span 4 on xl) */}
          <div className="xl:col-span-4 flex flex-col justify-between space-y-6 xl:pl-4">
            
            {/* 1. Total Number of Visitors */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-baseline gap-2">
                <span>Total Number of Visitors :</span>
                <span className="text-2xl font-black text-blue-600">{totalVisitors}</span>
              </h2>
              <ul className="space-y-1 text-sm font-medium text-slate-800">
                {channelBreakdown.map((item) => (
                  <li key={item.channel} className="flex items-center gap-1.5">
                    <span className="text-slate-900 font-bold">•</span>
                    <span>{item.channel}:</span>
                    <span className="font-semibold">{item.count} visitors</span>
                    <span className="text-xs text-slate-400">({item.percentage}%)</span>
                  </li>
                ))}
                {channelBreakdown.length === 0 && (
                  <li className="text-xs text-slate-400">No visitors logged</li>
                )}
              </ul>
            </div>

            {/* 2. Top 10 Product Interests */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Top 10 Product Interests
              </h3>
              <ol className="space-y-0.5 text-xs lg:text-sm font-medium text-slate-800 max-h-[220px] overflow-y-auto pr-1">
                {topProducts.slice(0, 10).map((prod) => (
                  <li key={prod.rank} className="flex items-baseline justify-between py-0.5 border-b border-slate-50">
                    <span className="truncate pr-2">
                      <strong className="text-slate-900 font-semibold">{prod.rank}. {prod.category} :</strong>
                    </span>
                    <span className="whitespace-nowrap font-bold text-slate-700">
                      {prod.mentions} mentions
                    </span>
                  </li>
                ))}
                {topProducts.length === 0 && (
                  <li className="text-xs text-slate-400 py-1">No product mentions recorded</li>
                )}
              </ol>
            </div>

            {/* 3. Visitors Handled */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Visitors Handled
              </h3>
              <ul className="space-y-1 text-sm font-medium text-slate-800">
                {salespersonBreakdown.map((sp) => (
                  <li key={sp.salesperson} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-900 font-bold">•</span>
                      <span>{sp.salesperson}:</span>
                      <span className="font-semibold">{sp.count} visitor{sp.count > 1 ? 's' : ''}</span>
                    </div>
                    {sp.closedCount > 0 && (
                      <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">
                        {sp.closedCount} closed ({sp.conversionRate}%)
                      </span>
                    )}
                  </li>
                ))}
                {salespersonBreakdown.length === 0 && (
                  <li className="text-xs text-slate-400">No salesperson assigned</li>
                )}
              </ul>
            </div>

            {/* 4. Closed Orders */}
            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Closed Orders
              </h3>
              <div className="space-y-1 text-sm font-medium text-slate-800">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <span>•</span>
                  <span>Closed {closedOrdersCount} Orders</span>
                  {totalVisitors > 0 && (
                    <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      {conversionRate}% Conv.
                    </span>
                  )}
                </div>
                {totalClosedAmount > 0 && (
                  <p className="text-xs text-slate-600 pl-3">
                    Total Volume: <strong className="text-slate-900">฿{totalClosedAmount.toLocaleString()}</strong>
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Slide Footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-400 font-medium">
          <div>
            Showroom: <strong>{branch}</strong> | Date Range: <strong>{formattedDateRange}</strong>
          </div>
          <div>
            Generated for Monday Executive Sales Meeting • Lounge Lovers
          </div>
        </div>

      </div>
    </div>
  );
};
