export type ChannelType = 
  | 'Walk in'
  | 'Facebook / IG'
  | 'Designer'
  | 'Appointment'
  | 'Google'
  | 'Phone / Line'
  | string;

export interface VisitorRecord {
  id: string;
  date: string; // YYYY-MM-DD
  branch: string; // 'RM9' | 'SKV' | string
  channel: ChannelType;
  salesperson: string;
  productInterests: string[]; // List of product categories mentioned
  orderClosed: boolean;
  orderAmount?: number; // THB
  closedDetails?: string;
  customerName?: string;
  notes?: string;
}

export interface ChannelStat {
  channel: string;
  count: number;
  percentage: number;
  color: string;
}

export interface SalespersonStat {
  salesperson: string;
  count: number;
  closedCount: number;
  conversionRate: number;
  color: string;
}

export interface DailyTrendStat {
  date: string;
  displayDate: string; // e.g. 2026-07-27 or 27/07/2026
  dayOfWeek: string; // Mon, Tue, etc.
  visitors: number;
  color?: string;
}

export interface ProductInterestStat {
  rank: number;
  category: string;
  mentions: number;
  color: string;
}

export interface WeeklyReportData {
  branch: string;
  startDate: string;
  endDate: string;
  formattedDateRange: string; // e.g. '27 July - 01 August 2026'
  totalVisitors: number;
  channelBreakdown: ChannelStat[];
  salespersonBreakdown: SalespersonStat[];
  dailyTrend: DailyTrendStat[];
  topProducts: ProductInterestStat[];
  closedOrdersCount: number;
  totalClosedAmount: number;
  conversionRate: number;
  filteredRecords: VisitorRecord[];
}

export interface SheetSyncState {
  sheetUrl: string;
  sheetId: string;
  gid: string;
  lastSyncTime: string | null;
  isSyncing: boolean;
  syncStatus: 'idle' | 'success' | 'error';
  syncMessage: string | null;
  autoSync: boolean;
}

export type ViewMode = 'report-slide' | 'analytics' | 'table' | 'sync-settings';

export interface DateRangePreset {
  label: string;
  startDate: string;
  endDate: string;
}
