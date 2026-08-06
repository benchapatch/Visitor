import React from 'react';
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
  CheckCircle2 
} from 'lucide-react';

interface AnalyticsViewProps {
  reportData: WeeklyReportData;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ reportData }) => {
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

  const topSalesperson = [...salespersonBreakdown].sort((a, b) => b.count - a.count)[0];
  const topProduct = topProducts[0];

  return (
    <div className="space-y-6">
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
              <LineChart data={dailyTrend} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
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
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
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
                    fill="#1e293b" 
                    fontSize={11} 
                    fontWeight={700} 
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
                    innerRadius={50}
                    paddingAngle={3}
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

      {/* Salesperson Performance Leaderboard */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-900 mb-4">Sales Team Engagement & Conversion</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Salesperson</th>
                <th className="pb-3">Visitors Handled</th>
                <th className="pb-3">Orders Closed</th>
                <th className="pb-3">Conversion Rate</th>
                <th className="pb-3 text-right">Performance Bar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {salespersonBreakdown.map((sp) => (
                <tr key={sp.salesperson} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sp.color }}></span>
                    {sp.salesperson}
                  </td>
                  <td className="py-3 font-medium text-slate-700">{sp.count} visitors</td>
                  <td className="py-3 font-semibold text-emerald-600">{sp.closedCount} closed</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 text-xs font-bold bg-slate-100 text-slate-800 rounded-md">
                      {sp.conversionRate}%
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="w-32 ml-auto bg-slate-100 rounded-full h-2 overflow-hidden">
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
  );
};
