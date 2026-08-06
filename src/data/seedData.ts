import { VisitorRecord } from '../types';
import { PHUKET_VISITOR_RECORDS } from './phuketData';
import { BANGKOK_MAY_JUNE_RECORDS } from './bangkokMayJuneData';
import { BANGKOK_FULL_RECORDS } from './bangkokFullData';
import { PHUKET_EXTENDED_RECORDS } from './phuketExtendedData';
import { BANGKOK_EXTENDED_RM9_RECORDS, BANGKOK_EXTENDED_SKV_RECORDS } from './bangkokExtendedData';

export const INITIAL_VISITOR_RECORDS: VisitorRecord[] = [
  // ==========================================
  // RM9 BRANCH (27 July - 01 August 2026) -> Total 31 visitors, 4 closed
  // ==========================================
  // 2026-07-27 (4 visitors)
  {
    id: 'rm9-01',
    date: '2026-07-27',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'DINING CHAIRS'],
    orderClosed: false,
    notes: 'Looking for 6-seater dining set and marble coffee table'
  },
  {
    id: 'rm9-02',
    date: '2026-07-27',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Outlet', 'Cafe Tables', 'Dining Tables'],
    orderClosed: true,
    orderAmount: 48500,
    closedDetails: 'Closed Outlet Dining Table + 4 Chairs',
    notes: 'Walk-in customer, immediate decision'
  },
  {
    id: 'rm9-03',
    date: '2026-07-27',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'Decor Accessories', 'Pendant Lamps'],
    orderClosed: false,
    notes: 'Private viewing appointment'
  },
  {
    id: 'rm9-04',
    date: '2026-07-27',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Bar Chair', 'I-Shape Sofas', 'Lounge Chair'],
    orderClosed: false,
    notes: 'Interior designer project for condo in Rama 9'
  },

  // 2026-07-28 (8 visitors)
  {
    id: 'rm9-05',
    date: '2026-07-28',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'DINING CHAIRS', 'Outlet'],
    orderClosed: false
  },
  {
    id: 'rm9-06',
    date: '2026-07-28',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Cafe Tables', 'Dining Tables', 'Rugs'],
    orderClosed: false
  },
  {
    id: 'rm9-07',
    date: '2026-07-28',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Coffee Tables', 'Bed', 'Benches'],
    orderClosed: false
  },
  {
    id: 'rm9-08',
    date: '2026-07-28',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['DINING CHAIRS', 'Cabinets', 'Night Tables'],
    orderClosed: false
  },
  {
    id: 'rm9-09',
    date: '2026-07-28',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Pui',
    productInterests: ['Outlet', 'Decor Accessories', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 62000,
    closedDetails: 'Pendant lamps batch + decorative accessories'
  },
  {
    id: 'rm9-10',
    date: '2026-07-28',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Tim',
    productInterests: ['Outdoor Seats', 'Outdoor Tables', 'Coffee Tables'],
    orderClosed: false
  },
  {
    id: 'rm9-11',
    date: '2026-07-28',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Rai',
    productInterests: ['DINING CHAIRS', 'Stools', 'Cafe Tables'],
    orderClosed: false
  },
  {
    id: 'rm9-12',
    date: '2026-07-28',
    branch: 'RM9',
    channel: 'Facebook / IG',
    salesperson: 'Tim',
    productInterests: ['I-Shape Sofas', 'chandelier', 'Outlet'],
    orderClosed: false
  },

  // 2026-07-29 (8 visitors)
  {
    id: 'rm9-13',
    date: '2026-07-29',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'DINING CHAIRS', 'Cafe Tables'],
    orderClosed: false
  },
  {
    id: 'rm9-14',
    date: '2026-07-29',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'Outlet', 'Bar Chair'],
    orderClosed: true,
    orderAmount: 54000,
    closedDetails: 'Closed Solid Wood Dining Table + 2 Bar Chairs'
  },
  {
    id: 'rm9-15',
    date: '2026-07-29',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Coffee Tables', 'Lounge Chair', 'Pendant Lamps'],
    orderClosed: false
  },
  {
    id: 'rm9-16',
    date: '2026-07-29',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['DINING CHAIRS', 'Decor Accessories', 'Bed'],
    orderClosed: false
  },
  {
    id: 'rm9-17',
    date: '2026-07-29',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Pui',
    productInterests: ['Outlet', 'Cafe Tables', 'Benches'],
    orderClosed: false
  },
  {
    id: 'rm9-18',
    date: '2026-07-29',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Tim',
    productInterests: ['Dining Tables', 'Rugs', 'Cabinets'],
    orderClosed: false
  },
  {
    id: 'rm9-19',
    date: '2026-07-29',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'Night Tables', 'Outdoor Seats'],
    orderClosed: false
  },
  {
    id: 'rm9-20',
    date: '2026-07-29',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Rai',
    productInterests: ['DINING CHAIRS', 'Outdoor Tables', 'Stools'],
    orderClosed: false
  },

  // 2026-07-30 (3 visitors)
  {
    id: 'rm9-21',
    date: '2026-07-30',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'Outlet', 'Cafe Tables'],
    orderClosed: false
  },
  {
    id: 'rm9-22',
    date: '2026-07-30',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['DINING CHAIRS', 'Dining Tables', 'I-Shape Sofas'],
    orderClosed: false
  },
  {
    id: 'rm9-23',
    date: '2026-07-30',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Lounge Chair', 'chandelier', 'Pendant Lamps'],
    orderClosed: false
  },

  // 2026-07-31 (3 visitors)
  {
    id: 'rm9-24',
    date: '2026-07-31',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'DINING CHAIRS', 'Outlet'],
    orderClosed: false
  },
  {
    id: 'rm9-25',
    date: '2026-07-31',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Cafe Tables', 'Bar Chair', 'Rugs'],
    orderClosed: false
  },
  {
    id: 'rm9-26',
    date: '2026-07-31',
    branch: 'RM9',
    channel: 'Facebook / IG',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'Dining Tables', 'Decor Accessories'],
    orderClosed: false
  },

  // 2026-08-01 (5 visitors)
  {
    id: 'rm9-27',
    date: '2026-08-01',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'DINING CHAIRS', 'Outlet'],
    orderClosed: true,
    orderAmount: 39000,
    closedDetails: 'Coffee table + 2 Dining Chairs'
  },
  {
    id: 'rm9-28',
    date: '2026-08-01',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Cafe Tables', 'Dining Tables'],
    orderClosed: false
  },
  {
    id: 'rm9-29',
    date: '2026-08-01',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Coffee Tables', 'Outlet'],
    orderClosed: false
  },
  {
    id: 'rm9-30',
    date: '2026-08-01',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['DINING CHAIRS', 'Cafe Tables'],
    orderClosed: false
  },
  {
    id: 'rm9-31',
    date: '2026-08-01',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Tim',
    productInterests: ['Dining Tables', 'Pendant Lamps'],
    orderClosed: false
  },

  // ==========================================
  // SKV BRANCH (27 July - 01 August 2026) -> Total 9 visitors, 4 closed
  // ==========================================
  // 2026-07-27 (2 visitors)
  {
    id: 'skv-01',
    date: '2026-07-27',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Console Tables', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 32000,
    closedDetails: 'Console Table Oak Finish'
  },
  {
    id: 'skv-02',
    date: '2026-07-27',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['Coffee Tables', 'Benches'],
    orderClosed: false
  },

  // 2026-07-28 (3 visitors)
  {
    id: 'skv-03',
    date: '2026-07-28',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Console Tables', 'Cabinets'],
    orderClosed: true,
    orderAmount: 41500,
    closedDetails: 'Entryway Console + Side Cabinet'
  },
  {
    id: 'skv-04',
    date: '2026-07-28',
    branch: 'SKV',
    channel: 'Facebook / IG',
    salesperson: 'Kate',
    productInterests: ['Pendant Lamps', 'DINING CHAIRS'],
    orderClosed: false
  },
  {
    id: 'skv-05',
    date: '2026-07-28',
    branch: 'SKV',
    channel: 'Google',
    salesperson: 'Aom',
    productInterests: ['Coffee Tables', 'Decor Accessories'],
    orderClosed: true,
    orderAmount: 18900,
    closedDetails: 'Round Glass Coffee Table'
  },

  // 2026-07-29 (1 visitor)
  {
    id: 'skv-06',
    date: '2026-07-29',
    branch: 'SKV',
    channel: 'Facebook / IG',
    salesperson: 'Pui',
    productInterests: ['I-Shape Sofas', 'Pendant Lamps'],
    orderClosed: false
  },

  // 2026-07-31 (1 visitor)
  {
    id: 'skv-07',
    date: '2026-07-31',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Console Tables', 'Lounge Chair'],
    orderClosed: false
  },

  // 2026-08-01 (2 visitors)
  {
    id: 'skv-08',
    date: '2026-08-01',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Outlet'],
    orderClosed: true,
    orderAmount: 24000,
    closedDetails: 'Clearance showroom display items'
  },
  {
    id: 'skv-09',
    date: '2026-08-01',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Coffee Tables'],
    orderClosed: false
  },

  // ==========================================
  // Sample Data for previous week (20 Jul - 25 Jul 2026) for demoing week navigation
  // ==========================================
  {
    id: 'rm9-prev-01',
    date: '2026-07-20',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'Dining Tables'],
    orderClosed: true,
    orderAmount: 38000
  },
  {
    id: 'rm9-prev-02',
    date: '2026-07-21',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['DINING CHAIRS', 'Outlet'],
    orderClosed: false
  },
  {
    id: 'rm9-prev-03',
    date: '2026-07-22',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['I-Shape Sofas', 'Lounge Chair'],
    orderClosed: true,
    orderAmount: 72000
  },
  {
    id: 'skv-prev-01',
    date: '2026-07-22',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Console Tables', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 29000
  },
  ...PHUKET_VISITOR_RECORDS,
  ...PHUKET_EXTENDED_RECORDS,
  ...BANGKOK_MAY_JUNE_RECORDS,
  ...BANGKOK_FULL_RECORDS,
  ...BANGKOK_EXTENDED_RM9_RECORDS,
  ...BANGKOK_EXTENDED_SKV_RECORDS
];
