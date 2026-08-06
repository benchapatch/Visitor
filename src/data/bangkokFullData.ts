import { VisitorRecord } from '../types';

// ============================================================================
// COMPREHENSIVE BANGKOK SHOWROOMS VISITOR DATA (RM9 & SKV)
// Covering every week from May 1, 2026 to August 6, 2026
// ============================================================================

export const BANGKOK_FULL_RECORDS: VisitorRecord[] = [
  // ==========================================================================
  // MAY 2026 - RM9 BRANCH (Rama 9 Showroom)
  // ==========================================================================
  // May 01-03 (Weekend)
  {
    id: 'rm9-m01-01',
    date: '2026-05-01',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: true,
    orderAmount: 64000,
    closedDetails: '#LL23812',
    notes: 'Solid oak dining table + 6 chairs set for Rama 9 house'
  },
  {
    id: 'rm9-m01-02',
    date: '2026-05-01',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['I-Shape Sofas', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Customer comparing 3-seater sofa fabric options'
  },
  {
    id: 'rm9-m02-01',
    date: '2026-05-02',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['L-Shape Sofas', 'Rugs', 'Floor Lamps'],
    orderClosed: true,
    orderAmount: 92000,
    closedDetails: '#LL23825',
    notes: 'Nordlux modular sofa + wool rug delivery to Bangna'
  },
  {
    id: 'rm9-m02-02',
    date: '2026-05-02',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Pendant Lamps', 'Dining Tables'],
    orderClosed: false,
    notes: 'Architect choosing dining pendant for duplex project'
  },
  {
    id: 'rm9-m03-01',
    date: '2026-05-03',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Tim',
    productInterests: ['Bed', 'Night Tables', 'Dresser'],
    orderClosed: true,
    orderAmount: 118000,
    closedDetails: '#LL23838',
    notes: 'Master bedroom package king bed'
  },

  // Week 1 May: 04 May - 09 May 2026
  {
    id: 'rm9-m04-01',
    date: '2026-05-04',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'DINING CHAIRS'],
    orderClosed: false,
    notes: 'Inquiring dining chair matching with existing table'
  },
  {
    id: 'rm9-m04-02',
    date: '2026-05-04',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Outlet', 'Side Tables'],
    orderClosed: true,
    orderAmount: 15500,
    closedDetails: '#LL23844',
    notes: 'Outlet display side table pickup'
  },
  {
    id: 'rm9-m05-01',
    date: '2026-05-05',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: true,
    orderAmount: 72000,
    closedDetails: '#LL23850',
    notes: '6-seater modern ceramic dining set'
  },
  {
    id: 'rm9-m05-02',
    date: '2026-05-05',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Lounge Chair', 'Wall Arts'],
    orderClosed: false,
    notes: 'Designer drafting lounge area'
  },
  {
    id: 'rm9-m06-01',
    date: '2026-05-06',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['I-Shape Sofas', 'Cushions'],
    orderClosed: false,
    notes: 'Looking for 2.2m sofa for townhome'
  },
  {
    id: 'rm9-m06-02',
    date: '2026-05-06',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['TV Stands', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 46000,
    closedDetails: '#LL23862',
    notes: 'Oak TV console and nesting coffee tables'
  },
  {
    id: 'rm9-m07-01',
    date: '2026-05-07',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Bar Chair', 'Cafe Tables'],
    orderClosed: false,
    notes: 'Checking barstool seat height for kitchen island'
  },
  {
    id: 'rm9-m08-01',
    date: '2026-05-08',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['L-Shape Sofas', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 89000,
    closedDetails: '#LL23882',
    notes: 'Designer project for Rama 9 luxury duplex'
  },
  {
    id: 'rm9-m08-02',
    date: '2026-05-08',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Pendant Lamps', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Looking for dimmable lighting'
  },
  {
    id: 'rm9-m09-01',
    date: '2026-05-09',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Outlet', 'DINING CHAIRS', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 38000,
    closedDetails: '#LL23895',
    notes: 'Outlet dining chairs 4 pcs'
  },
  {
    id: 'rm9-m09-02',
    date: '2026-05-09',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Rugs', 'Side Tables'],
    orderClosed: false,
    notes: 'Measuring living room floor dimensions'
  },

  // Week 2 May: 11 May - 16 May 2026
  {
    id: 'rm9-m11-01',
    date: '2026-05-11',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: false,
    notes: 'Inquiring king size wooden bed frame'
  },
  {
    id: 'rm9-m12-01',
    date: '2026-05-12',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Outlet', 'Side Tables'],
    orderClosed: true,
    orderAmount: 18500,
    closedDetails: '#LL23910',
    notes: 'Bought outlet display side table'
  },
  {
    id: 'rm9-m12-02',
    date: '2026-05-12',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: false,
    notes: 'Looking for 8-seater dining table'
  },
  {
    id: 'rm9-m13-01',
    date: '2026-05-13',
    branch: 'RM9',
    channel: 'Facebook / IG',
    salesperson: 'Pui',
    productInterests: ['I-Shape Sofas', 'Lounge Chair'],
    orderClosed: true,
    orderAmount: 58000,
    closedDetails: '#LL23924',
    notes: 'Instagram promo sofa closed'
  },
  {
    id: 'rm9-m14-01',
    date: '2026-05-14',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Pendant Lamps', 'chandelier'],
    orderClosed: false,
    notes: 'Double volume ceiling chandelier'
  },
  {
    id: 'rm9-m15-01',
    date: '2026-05-15',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['I-Shape Sofas', 'Rugs'],
    orderClosed: true,
    orderAmount: 52000,
    closedDetails: '#LL23940',
    notes: 'Sofabed + rug delivery to Bangna'
  },
  {
    id: 'rm9-m15-02',
    date: '2026-05-15',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Rai',
    productInterests: ['Outdoor Seats', 'Outdoor Tables'],
    orderClosed: false,
    notes: 'Garden balcony furniture'
  },
  {
    id: 'rm9-m16-01',
    date: '2026-05-16',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['DINING CHAIRS', 'Dining Tables'],
    orderClosed: true,
    orderAmount: 68000,
    closedDetails: '#LL23955',
    notes: 'Ceramic top table + 6 Bess chairs'
  },
  {
    id: 'rm9-m16-02',
    date: '2026-05-16',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Sideboards', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Foyer sideboard proposal'
  },

  // Week 3 May: 18 May - 23 May 2026
  {
    id: 'rm9-m18-01',
    date: '2026-05-18',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['L-Shape Sofas', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Testing sofa seat firmness'
  },
  {
    id: 'rm9-m19-01',
    date: '2026-05-19',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Outlet', 'Sideboards'],
    orderClosed: true,
    orderAmount: 28000,
    closedDetails: '#LL23970',
    notes: 'Outlet sideboard special clearance'
  },
  {
    id: 'rm9-m20-01',
    date: '2026-05-20',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Lounge Chair', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Customer comparing armchair comfort'
  },
  {
    id: 'rm9-m20-02',
    date: '2026-05-20',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 84000,
    closedDetails: '#LL23982',
    notes: 'Grazia table + brass pendant lamp'
  },
  {
    id: 'rm9-m21-01',
    date: '2026-05-21',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: false,
    notes: 'King size bed with storage drawer'
  },
  {
    id: 'rm9-m22-01',
    date: '2026-05-22',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Sectional Sofas', 'Rugs', 'Table Lamps'],
    orderClosed: true,
    orderAmount: 135000,
    closedDetails: '#LL23995',
    notes: 'Full living room setup for Ari penthouse'
  },
  {
    id: 'rm9-m23-01',
    date: '2026-05-23',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['DINING CHAIRS', 'Cafe Tables'],
    orderClosed: false,
    notes: 'Home cafe corner styling'
  },
  {
    id: 'rm9-m23-02',
    date: '2026-05-23',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['I-Shape Sofas', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 49500,
    closedDetails: '#LL24008',
    notes: '2.5s sofa in oat beige'
  },

  // Week 4 May: 25 May - 30 May 2026
  {
    id: 'rm9-m25-01',
    date: '2026-05-25',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Coffee Tables', 'Side Tables'],
    orderClosed: false,
    notes: 'Looking for smoked oak finish'
  },
  {
    id: 'rm9-m26-01',
    date: '2026-05-26',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 76000,
    closedDetails: '#LL24020',
    notes: 'Closed solid oak dining set'
  },
  {
    id: 'rm9-m26-02',
    date: '2026-05-26',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Lounge Chair', 'Wall Arts'],
    orderClosed: false,
    notes: 'Condo model unit project'
  },
  {
    id: 'rm9-m27-01',
    date: '2026-05-27',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['Bed', 'Night Tables', 'Rugs'],
    orderClosed: true,
    orderAmount: 94000,
    closedDetails: '#LL24035',
    notes: 'Bed frame + 2 night tables + wool rug'
  },
  {
    id: 'rm9-m28-01',
    date: '2026-05-28',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Outlet', 'DINING CHAIRS'],
    orderClosed: false,
    notes: 'Checking outlet dining chairs stock'
  },
  {
    id: 'rm9-m29-01',
    date: '2026-05-29',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['L-Shape Sofas', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 88000,
    closedDetails: '#LL24048',
    notes: 'Ricado L-shape sofa right chaise'
  },
  {
    id: 'rm9-m30-01',
    date: '2026-05-30',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Bar Chair', 'Cafe Tables'],
    orderClosed: true,
    orderAmount: 36000,
    closedDetails: '#LL24056',
    notes: 'Island counter barstools 4 pcs'
  },

  // ==========================================================================
  // JUNE 2026 - RM9 BRANCH
  // ==========================================================================
  // Week 1 Jun: 01 Jun - 06 Jun 2026
  {
    id: 'rm9-j01-01',
    date: '2026-06-01',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: false,
    notes: 'Checking ceramic heat resistance'
  },
  {
    id: 'rm9-j02-01',
    date: '2026-06-02',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: true,
    orderAmount: 95000,
    closedDetails: '#LL24110',
    notes: 'King size bed frame and 2 night tables'
  },
  {
    id: 'rm9-j03-01',
    date: '2026-06-03',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Pendant Lamps', 'chandelier'],
    orderClosed: false,
    notes: 'Pendant lighting specification'
  },
  {
    id: 'rm9-j04-01',
    date: '2026-06-04',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['I-Shape Sofas', 'Lounge Chair'],
    orderClosed: true,
    orderAmount: 64000,
    closedDetails: '#LL24132',
    notes: 'Curved 3-seater sofa in warm grey'
  },
  {
    id: 'rm9-j05-01',
    date: '2026-06-05',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Outlet', 'Side Tables'],
    orderClosed: false,
    notes: 'Outlet inspection'
  },
  {
    id: 'rm9-j06-01',
    date: '2026-06-06',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Outlet', 'DINING CHAIRS', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 43000,
    closedDetails: '#LL24160',
    notes: 'Midyear 6.6 promo closed'
  },

  // Week 2 Jun: 08 Jun - 13 Jun 2026
  {
    id: 'rm9-j08-01',
    date: '2026-06-08',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['TV Stands', 'Sideboards'],
    orderClosed: false,
    notes: 'Looking for 2.4m media console'
  },
  {
    id: 'rm9-j09-01',
    date: '2026-06-09',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'DINING CHAIRS', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 115000,
    closedDetails: '#LL24188',
    notes: 'Complete dining room package'
  },
  {
    id: 'rm9-j10-01',
    date: '2026-06-10',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Rugs', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Rugs size consultation'
  },
  {
    id: 'rm9-j11-01',
    date: '2026-06-11',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['L-Shape Sofas', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 89000,
    closedDetails: '#LL24205',
    notes: 'Stow sofa L-shape beige'
  },
  {
    id: 'rm9-j12-01',
    date: '2026-06-12',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Sectional Sofas', 'Rugs', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 138000,
    closedDetails: '#LL24215',
    notes: 'Villa project in Bangkok'
  },
  {
    id: 'rm9-j13-01',
    date: '2026-06-13',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Outdoor Seats', 'Outdoor Tables'],
    orderClosed: false,
    notes: 'Balcony seating inquiry'
  },

  // Week 3 Jun: 15 Jun - 20 Jun 2026
  {
    id: 'rm9-j15-01',
    date: '2026-06-15',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: false,
    notes: 'Finesse bed king size brown'
  },
  {
    id: 'rm9-j16-01',
    date: '2026-06-16',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['I-Shape Sofas', 'Rugs'],
    orderClosed: true,
    orderAmount: 58000,
    closedDetails: '#LL24255',
    notes: 'Sofa 3-seater + Milton rug'
  },
  {
    id: 'rm9-j17-01',
    date: '2026-06-17',
    branch: 'RM9',
    channel: 'Facebook / IG',
    salesperson: 'Pui',
    productInterests: ['Outlet', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Inquiring online promo'
  },
  {
    id: 'rm9-j18-01',
    date: '2026-06-18',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Tim',
    productInterests: ['TV Stands', 'Sideboards'],
    orderClosed: true,
    orderAmount: 56000,
    closedDetails: '#LL24280',
    notes: 'Custom smoked oak TV console'
  },
  {
    id: 'rm9-j19-01',
    date: '2026-06-19',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: false,
    notes: 'Sample wood finish loan'
  },
  {
    id: 'rm9-j20-01',
    date: '2026-06-20',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Outlet', 'Side Tables', 'Lounge Chair'],
    orderClosed: true,
    orderAmount: 39500,
    closedDetails: '#LL24302',
    notes: 'Clearance lounge chair and side table'
  },

  // Week 4 Jun: 22 Jun - 27 Jun 2026
  {
    id: 'rm9-j22-01',
    date: '2026-06-22',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['L-Shape Sofas', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Checking clearance dimension'
  },
  {
    id: 'rm9-j23-01',
    date: '2026-06-23',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Pendant Lamps', 'Wall Lamps'],
    orderClosed: true,
    orderAmount: 28000,
    closedDetails: '#LL24328',
    notes: 'Tessa 3 pendant + wall sconces'
  },
  {
    id: 'rm9-j24-01',
    date: '2026-06-24',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Bed', 'Night Tables', 'Dresser'],
    orderClosed: false,
    notes: 'Residential interior package'
  },
  {
    id: 'rm9-j25-01',
    date: '2026-06-25',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Outdoor Seats', 'Outdoor Tables'],
    orderClosed: true,
    orderAmount: 68000,
    closedDetails: '#LL24350',
    notes: 'Outdoor garden terrace set'
  },
  {
    id: 'rm9-j26-01',
    date: '2026-06-26',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: false,
    notes: 'Extension table inquiry'
  },
  {
    id: 'rm9-j27-01',
    date: '2026-06-27',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['L-Shape Sofas', 'Rugs', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 112000,
    closedDetails: '#LL24372',
    notes: 'Full living set Nordlux beige'
  },

  // ==========================================================================
  // JULY 2026 - RM9 BRANCH (Complete All Weeks)
  // ==========================================================================
  // Week 1 Jul: 29 Jun - 04 Jul 2026
  {
    id: 'rm9-jl01-01',
    date: '2026-07-01',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: true,
    orderAmount: 78000,
    closedDetails: '#LL24402',
    notes: 'Grazia 240 dining set 6 seats'
  },
  {
    id: 'rm9-jl02-01',
    date: '2026-07-02',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['I-Shape Sofas', 'Side Tables'],
    orderClosed: false,
    notes: 'Living room sofabed consultation'
  },
  {
    id: 'rm9-jl03-01',
    date: '2026-07-03',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Bed', 'Night Tables', 'Lounge Chair'],
    orderClosed: true,
    orderAmount: 125000,
    closedDetails: '#LL24418',
    notes: 'Master suite package for Sukhumvit condo'
  },
  {
    id: 'rm9-jl04-01',
    date: '2026-07-04',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'Rugs', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Matching rug texture with marble coffee table'
  },

  // Week 2 Jul: 06 Jul - 11 Jul 2026
  {
    id: 'rm9-jl06-01',
    date: '2026-07-06',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Outlet', 'Sideboards'],
    orderClosed: true,
    orderAmount: 32000,
    closedDetails: '#LL24442',
    notes: 'Outlet display console pickup'
  },
  {
    id: 'rm9-jl07-01',
    date: '2026-07-07',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['L-Shape Sofas', 'Pendant Lamps'],
    orderClosed: false,
    notes: 'Viewing Ricado sofa dimensions'
  },
  {
    id: 'rm9-jl08-01',
    date: '2026-07-08',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'DINING CHAIRS', 'Cafe Tables'],
    orderClosed: true,
    orderAmount: 86000,
    closedDetails: '#LL24460',
    notes: 'Solid oak table + 8 chairs'
  },
  {
    id: 'rm9-jl09-01',
    date: '2026-07-09',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Bar Chair', 'Pendant Lamps'],
    orderClosed: false,
    notes: 'Bespoke cafe counter barstools'
  },
  {
    id: 'rm9-jl10-01',
    date: '2026-07-10',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['TV Stands', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 51000,
    closedDetails: '#LL24479',
    notes: 'Smoked oak TV unit and round coffee table'
  },
  {
    id: 'rm9-jl11-01',
    date: '2026-07-11',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: false,
    notes: 'Checking king bed upholstery colors'
  },

  // Week 3 Jul: 13 Jul - 18 Jul 2026
  {
    id: 'rm9-jl13-01',
    date: '2026-07-13',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['I-Shape Sofas', 'Lounge Chair'],
    orderClosed: false,
    notes: 'Compact sofa for studio room'
  },
  {
    id: 'rm9-jl14-01',
    date: '2026-07-14',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Outdoor Seats', 'Outdoor Tables'],
    orderClosed: true,
    orderAmount: 64000,
    closedDetails: '#LL24510',
    notes: 'Teak outdoor set for patio'
  },
  {
    id: 'rm9-jl15-01',
    date: '2026-07-15',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Tim',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: true,
    orderAmount: 79000,
    closedDetails: '#LL24522',
    notes: 'Lampada walnut dining set'
  },
  {
    id: 'rm9-jl16-01',
    date: '2026-07-16',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Wall Arts', 'Pendant Lamps', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Art & lighting styling proposal'
  },
  {
    id: 'rm9-jl17-01',
    date: '2026-07-17',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Outlet', 'Coffee Tables', 'Side Tables'],
    orderClosed: true,
    orderAmount: 34000,
    closedDetails: '#LL24538',
    notes: 'Outlet living tables bundle'
  },
  {
    id: 'rm9-jl18-01',
    date: '2026-07-18',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['L-Shape Sofas', 'Rugs'],
    orderClosed: false,
    notes: 'Comparing light grey vs dark charcoal sofa'
  },

  // Week 4 Jul: 20 Jul - 25 Jul 2026
  {
    id: 'rm9-jl20-01',
    date: '2026-07-20',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Coffee Tables', 'Dining Tables'],
    orderClosed: true,
    orderAmount: 38000,
    closedDetails: '#LL24545',
    notes: 'Solid oak coffee table'
  },
  {
    id: 'rm9-jl21-01',
    date: '2026-07-21',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['DINING CHAIRS', 'Outlet'],
    orderClosed: false,
    notes: 'Outlet dining chairs review'
  },
  {
    id: 'rm9-jl22-01',
    date: '2026-07-22',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Pui',
    productInterests: ['I-Shape Sofas', 'Lounge Chair'],
    orderClosed: true,
    orderAmount: 72000,
    closedDetails: '#LL24558',
    notes: 'Sofabed + swivel lounge armchair'
  },
  {
    id: 'rm9-jl23-01',
    date: '2026-07-23',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Bed', 'Night Tables', 'Pendant Lamps'],
    orderClosed: false,
    notes: 'Villa master bedroom specs'
  },
  {
    id: 'rm9-jl24-01',
    date: '2026-07-24',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['Sideboards', 'TV Stands'],
    orderClosed: true,
    orderAmount: 61000,
    closedDetails: '#LL24574',
    notes: 'Rowena smoked oak sideboard'
  },
  {
    id: 'rm9-jl25-01',
    date: '2026-07-25',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Rugs', 'Cushions', 'Decor Accessories'],
    orderClosed: false,
    notes: 'Home decor accent shopping'
  },

  // August 2026 - RM9 (Week 1 Aug: 03 Aug - 08 Aug 2026)
  {
    id: 'rm9-ag03-01',
    date: '2026-08-03',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: true,
    orderAmount: 82000,
    closedDetails: '#LL24675',
    notes: 'August campaign dining set closed'
  },
  {
    id: 'rm9-ag03-02',
    date: '2026-08-03',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['L-Shape Sofas', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Testing sofa depth'
  },
  {
    id: 'rm9-ag04-01',
    date: '2026-08-04',
    branch: 'RM9',
    channel: 'Designer',
    salesperson: 'Aliss',
    productInterests: ['Pendant Lamps', 'chandelier', 'Floor Lamps'],
    orderClosed: true,
    orderAmount: 94000,
    closedDetails: '#LL24688',
    notes: 'Lighting package for Sathorn penthouse'
  },
  {
    id: 'rm9-ag04-02',
    date: '2026-08-04',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Outlet', 'Side Tables'],
    orderClosed: false,
    notes: 'Outlet display check'
  },
  {
    id: 'rm9-ag05-01',
    date: '2026-08-05',
    branch: 'RM9',
    channel: 'Appointment',
    salesperson: 'Tim',
    productInterests: ['Bed', 'Night Tables', 'Dresser'],
    orderClosed: true,
    orderAmount: 110000,
    closedDetails: '#LL24705',
    notes: 'Finesse bed king size brown + 2 night tables'
  },
  {
    id: 'rm9-ag05-02',
    date: '2026-08-05',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Pui',
    productInterests: ['Rugs', 'Lounge Chair'],
    orderClosed: false,
    notes: 'Matching armchair with rug'
  },
  {
    id: 'rm9-ag06-01',
    date: '2026-08-06',
    branch: 'RM9',
    channel: 'Walk in',
    salesperson: 'Tim',
    productInterests: ['TV Stands', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 48000,
    closedDetails: '#LL24719',
    notes: 'Oak TV stand and round coffee table'
  },

  // ==========================================================================
  // MAY 2026 - SKV BRANCH (Sukhumvit 26 Showroom)
  // ==========================================================================
  // Week 1 May: 04 May - 09 May 2026
  {
    id: 'skv-m04-01',
    date: '2026-05-04',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Console Tables', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 38000,
    closedDetails: '#LL23840',
    notes: 'Entryway console for Sukhumvit condo'
  },
  {
    id: 'skv-m05-01',
    date: '2026-05-05',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['L-Shape Sofas', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Designer drafting layout'
  },
  {
    id: 'skv-m06-01',
    date: '2026-05-06',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['I-Shape Sofas', 'Lounge Chair'],
    orderClosed: true,
    orderAmount: 82000,
    closedDetails: '#LL23865',
    notes: 'Expat client for Sukhumvit condo'
  },
  {
    id: 'skv-m07-01',
    date: '2026-05-07',
    branch: 'SKV',
    channel: 'Facebook / IG',
    salesperson: 'Kate',
    productInterests: ['Pendant Lamps', 'Wall Lamps'],
    orderClosed: false,
    notes: 'Inquiring pendant lamps'
  },
  {
    id: 'skv-m08-01',
    date: '2026-05-08',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['DINING CHAIRS', 'Dining Tables'],
    orderClosed: true,
    orderAmount: 65000,
    closedDetails: '#LL23880',
    notes: 'Dining set 4 seats'
  },
  {
    id: 'skv-m09-01',
    date: '2026-05-09',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Sideboards', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Living room consultation'
  },

  // Week 2 May: 11 May - 16 May 2026
  {
    id: 'skv-m11-01',
    date: '2026-05-11',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Bar Chair', 'Cafe Tables'],
    orderClosed: false,
    notes: 'Kitchen island barstools'
  },
  {
    id: 'skv-m12-01',
    date: '2026-05-12',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Outlet', 'Side Tables'],
    orderClosed: true,
    orderAmount: 22000,
    closedDetails: '#LL23908',
    notes: 'Outlet display side table'
  },
  {
    id: 'skv-m14-01',
    date: '2026-05-14',
    branch: 'SKV',
    channel: 'Appointment',
    salesperson: 'Tim',
    productInterests: ['Dining Tables', 'DINING CHAIRS', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 112000,
    closedDetails: '#LL23932',
    notes: 'Full dining room package'
  },
  {
    id: 'skv-m15-01',
    date: '2026-05-15',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Lounge Chair', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Reading nook armchair'
  },
  {
    id: 'skv-m16-01',
    date: '2026-05-16',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: true,
    orderAmount: 98000,
    closedDetails: '#LL23950',
    notes: 'Bedroom set for Thonglor duplex'
  },

  // Week 3 May: 18 May - 23 May 2026
  {
    id: 'skv-m18-01',
    date: '2026-05-18',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Rugs', 'Cushions'],
    orderClosed: false,
    notes: 'Wool rug collection'
  },
  {
    id: 'skv-m20-01',
    date: '2026-05-20',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['TV Stands', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 54000,
    closedDetails: '#LL23978',
    notes: 'Smoked oak media unit'
  },
  {
    id: 'skv-m22-01',
    date: '2026-05-22',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Kate',
    productInterests: ['Bed', 'Night Tables', 'Dresser'],
    orderClosed: true,
    orderAmount: 145000,
    closedDetails: '#LL23990',
    notes: 'Master bedroom suite for Thonglor penthouse'
  },
  {
    id: 'skv-m23-01',
    date: '2026-05-23',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Outdoor Seats', 'DayBeds'],
    orderClosed: false,
    notes: 'Terrace daybed inquiry'
  },

  // Week 4 May: 25 May - 30 May 2026
  {
    id: 'skv-m25-01',
    date: '2026-05-25',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['I-Shape Sofas', 'Side Tables'],
    orderClosed: false,
    notes: '3-seater sofa in warm beige'
  },
  {
    id: 'skv-m27-01',
    date: '2026-05-27',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: true,
    orderAmount: 89000,
    closedDetails: '#LL24040',
    notes: 'Ceramic extension dining set'
  },
  {
    id: 'skv-m29-01',
    date: '2026-05-29',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Rugs', 'Decor Accessories'],
    orderClosed: true,
    orderAmount: 34000,
    closedDetails: '#LL24070',
    notes: 'Wool rug + decorative vase collection'
  },
  {
    id: 'skv-m30-01',
    date: '2026-05-30',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['L-Shape Sofas', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Comparing modular sofa sizes'
  },

  // ==========================================================================
  // JUNE 2026 - SKV BRANCH
  // ==========================================================================
  // Week 1 Jun: 01 Jun - 06 Jun 2026
  {
    id: 'skv-j02-01',
    date: '2026-06-02',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Pendant Lamps', 'Wall Lamps'],
    orderClosed: false,
    notes: 'Dining area lighting'
  },
  {
    id: 'skv-j04-01',
    date: '2026-06-04',
    branch: 'SKV',
    channel: 'Appointment',
    salesperson: 'Aom',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: true,
    orderAmount: 92000,
    closedDetails: '#LL24135',
    notes: 'King size upholstered bed frame'
  },
  {
    id: 'skv-j05-01',
    date: '2026-06-05',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['L-Shape Sofas', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 98000,
    closedDetails: '#LL24150',
    notes: 'Nordlux 3.5s modular sofa in light grey'
  },
  {
    id: 'skv-j06-01',
    date: '2026-06-06',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Outlet', 'Side Tables'],
    orderClosed: false,
    notes: 'Midyear 6.6 outlet browsing'
  },

  // Week 2 Jun: 08 Jun - 13 Jun 2026
  {
    id: 'skv-j09-01',
    date: '2026-06-09',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: false,
    notes: 'Looking for 6-seater solid oak'
  },
  {
    id: 'skv-j11-01',
    date: '2026-06-11',
    branch: 'SKV',
    channel: 'Appointment',
    salesperson: 'Tim',
    productInterests: ['Bar Chair', 'Cafe Tables'],
    orderClosed: true,
    orderAmount: 49000,
    closedDetails: '#LL24195',
    notes: 'Cafe counter barstools 6 pcs'
  },
  {
    id: 'skv-j12-01',
    date: '2026-06-12',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['Lounge Chair', 'Wall Arts'],
    orderClosed: false,
    notes: 'Lounge area specifications'
  },
  {
    id: 'skv-j13-01',
    date: '2026-06-13',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Rugs', 'Cushions'],
    orderClosed: true,
    orderAmount: 31000,
    closedDetails: '#LL24222',
    notes: 'Living room rug + cushion set'
  },

  // Week 3 Jun: 15 Jun - 20 Jun 2026
  {
    id: 'skv-j16-01',
    date: '2026-06-16',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['I-Shape Sofas', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Checking 2.4m sofa in oatmeal fabric'
  },
  {
    id: 'skv-j18-01',
    date: '2026-06-18',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Console Tables', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 42000,
    closedDetails: '#LL24275',
    notes: 'Entryway console and brass pendant'
  },
  {
    id: 'skv-j19-01',
    date: '2026-06-19',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Kate',
    productInterests: ['Sideboards', 'Wall Arts', 'Floor Lamps'],
    orderClosed: true,
    orderAmount: 87000,
    closedDetails: '#LL24290',
    notes: 'Foyer styling package'
  },
  {
    id: 'skv-j20-01',
    date: '2026-06-20',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: false,
    notes: 'Bed frame dimensions inquiry'
  },

  // Week 4 Jun: 22 Jun - 27 Jun 2026
  {
    id: 'skv-j23-01',
    date: '2026-06-23',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: false,
    notes: 'Ceramic dining table check'
  },
  {
    id: 'skv-j25-01',
    date: '2026-06-25',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['L-Shape Sofas', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 105000,
    closedDetails: '#LL24342',
    notes: 'Designer package modular sofa'
  },
  {
    id: 'skv-j26-01',
    date: '2026-06-26',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Outdoor Seats', 'DayBeds'],
    orderClosed: true,
    orderAmount: 75000,
    closedDetails: '#LL24355',
    notes: 'Poolside lounger pair'
  },
  {
    id: 'skv-j27-01',
    date: '2026-06-27',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Rugs', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Living room area rug sizes'
  },

  // ==========================================================================
  // JULY 2026 - SKV BRANCH (Complete All Weeks)
  // ==========================================================================
  // Week 1 Jul: 29 Jun - 04 Jul 2026
  {
    id: 'skv-jl01-01',
    date: '2026-07-01',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: true,
    orderAmount: 74000,
    closedDetails: '#LL24398',
    notes: 'Solid oak dining set with 6 chairs'
  },
  {
    id: 'skv-jl02-01',
    date: '2026-07-02',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['Console Tables', 'Wall Arts'],
    orderClosed: false,
    notes: 'Duplex entryway design'
  },
  {
    id: 'skv-jl03-01',
    date: '2026-07-03',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['I-Shape Sofas', 'Coffee Tables'],
    orderClosed: true,
    orderAmount: 62000,
    closedDetails: '#LL24412',
    notes: 'Sofa 3-seater in light grey'
  },
  {
    id: 'skv-jl04-01',
    date: '2026-07-04',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Lounge Chair', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Swivel armchair testing'
  },

  // Week 2 Jul: 06 Jul - 11 Jul 2026
  {
    id: 'skv-jl06-01',
    date: '2026-07-06',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: true,
    orderAmount: 89000,
    closedDetails: '#LL24438',
    notes: 'King size bed + 2 bedside tables'
  },
  {
    id: 'skv-jl08-01',
    date: '2026-07-08',
    branch: 'SKV',
    channel: 'Appointment',
    salesperson: 'Aom',
    productInterests: ['Dining Tables', 'DINING CHAIRS', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 118000,
    closedDetails: '#LL24465',
    notes: 'Full dining suite for Thonglor condo'
  },
  {
    id: 'skv-jl09-01',
    date: '2026-07-09',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Rugs', 'Side Tables'],
    orderClosed: false,
    notes: 'Wool rug 200x300 inquiry'
  },
  {
    id: 'skv-jl10-01',
    date: '2026-07-10',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['Sideboards', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Smoked oak console selection'
  },
  {
    id: 'skv-jl11-01',
    date: '2026-07-11',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Outdoor Seats', 'Outdoor Tables'],
    orderClosed: true,
    orderAmount: 58000,
    closedDetails: '#LL24484',
    notes: 'Balcony lounge pair'
  },

  // Week 3 Jul: 13 Jul - 18 Jul 2026
  {
    id: 'skv-jl14-01',
    date: '2026-07-14',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['TV Stands', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Media console dimensions check'
  },
  {
    id: 'skv-jl15-01',
    date: '2026-07-15',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['L-Shape Sofas', 'Rugs'],
    orderClosed: true,
    orderAmount: 96000,
    closedDetails: '#LL24518',
    notes: 'Nordlux modular sofa in warm beige'
  },
  {
    id: 'skv-jl16-01',
    date: '2026-07-16',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['Pendant Lamps', 'chandelier'],
    orderClosed: true,
    orderAmount: 67000,
    closedDetails: '#LL24530',
    notes: 'Brass chandeliers for villa'
  },
  {
    id: 'skv-jl17-01',
    date: '2026-07-17',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Outlet', 'Side Tables'],
    orderClosed: false,
    notes: 'Checking outlet stock'
  },
  {
    id: 'skv-jl18-01',
    date: '2026-07-18',
    branch: 'SKV',
    channel: 'Appointment',
    salesperson: 'Kate',
    productInterests: ['Bed', 'Night Tables', 'Dresser'],
    orderClosed: true,
    orderAmount: 135000,
    closedDetails: '#LL24540',
    notes: 'Full bedroom collection'
  },

  // Week 4 Jul: 20 Jul - 25 Jul 2026
  {
    id: 'skv-jl20-01',
    date: '2026-07-20',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: false,
    notes: '6-seater ceramic dining table'
  },
  {
    id: 'skv-jl22-01',
    date: '2026-07-22',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Console Tables', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 29000,
    closedDetails: '#LL24560',
    notes: 'Entry console and pendant lamp'
  },
  {
    id: 'skv-jl23-01',
    date: '2026-07-23',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Aom',
    productInterests: ['I-Shape Sofas', 'Lounge Chair'],
    orderClosed: true,
    orderAmount: 84000,
    closedDetails: '#LL24572',
    notes: 'Lounge sofa package'
  },
  {
    id: 'skv-jl24-01',
    date: '2026-07-24',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Bar Chair', 'Cafe Tables'],
    orderClosed: false,
    notes: 'Kitchen island counter height'
  },
  {
    id: 'skv-jl25-01',
    date: '2026-07-25',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Rugs', 'Cushions', 'Floor Lamps'],
    orderClosed: true,
    orderAmount: 38000,
    closedDetails: '#LL24588',
    notes: 'Living room decor setup'
  },

  // August 2026 - SKV (Week 1 Aug: 03 Aug - 08 Aug 2026)
  {
    id: 'skv-ag03-01',
    date: '2026-08-03',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Console Tables', 'Pendant Lamps'],
    orderClosed: true,
    orderAmount: 36000,
    closedDetails: '#LL24679',
    notes: 'Entry console table'
  },
  {
    id: 'skv-ag04-01',
    date: '2026-08-04',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['I-Shape Sofas', 'Coffee Tables'],
    orderClosed: false,
    notes: 'Comparing 2.5s sofa comfort'
  },
  {
    id: 'skv-ag04-02',
    date: '2026-08-04',
    branch: 'SKV',
    channel: 'Designer',
    salesperson: 'Kate',
    productInterests: ['Dining Tables', 'DINING CHAIRS'],
    orderClosed: true,
    orderAmount: 91000,
    closedDetails: '#LL24692',
    notes: 'Dining set 8 chairs for condo project'
  },
  {
    id: 'skv-ag05-01',
    date: '2026-08-05',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Aom',
    productInterests: ['Bed', 'Night Tables'],
    orderClosed: true,
    orderAmount: 85000,
    closedDetails: '#LL24710',
    notes: 'King size bed frame delivery'
  },
  {
    id: 'skv-ag06-01',
    date: '2026-08-06',
    branch: 'SKV',
    channel: 'Walk in',
    salesperson: 'Kate',
    productInterests: ['Rugs', 'Floor Lamps'],
    orderClosed: false,
    notes: 'Living room rug measurement'
  }
];
