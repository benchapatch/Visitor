export function formatDateEnglish(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return dateStr;
  
  const day = String(date.getDate()).padStart(2, '0');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDailyTrendDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
  if (isNaN(date.getTime())) return dateStr;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();
  const year = date.getFullYear();

  return `${dayName}, ${monthName} ${dayNum}, ${year}`;
}

export function formatShortDateRange(startDateStr: string, endDateStr: string): string {
  if (!startDateStr || !endDateStr) return '';
  const start = new Date(startDateStr + 'T00:00:00');
  const end = new Date(endDateStr + 'T00:00:00');
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return `${startDateStr} - ${endDateStr}`;
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startDay = String(start.getDate()).padStart(2, '0');
  const endDay = String(end.getDate()).padStart(2, '0');
  const startMonth = months[start.getMonth()];
  const endMonth = months[end.getMonth()];
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} ${endMonth} ${endYear}`;
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`;
  }
  return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
}

export function formatReportDateRange(startDateStr: string, endDateStr: string): string {
  if (!startDateStr || !endDateStr) return '';
  const start = new Date(startDateStr + 'T00:00:00');
  const end = new Date(endDateStr + 'T00:00:00');
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return `${startDateStr} - ${endDateStr}`;
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const startDay = String(start.getDate()).padStart(2, '0');
  const endDay = String(end.getDate()).padStart(2, '0');
  const startMonth = months[start.getMonth()];
  const endMonth = months[end.getMonth()];
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} ${endMonth} ${endYear}`;
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`;
  }
  return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
}

// Given any date, return the Monday and Saturday/Sunday of that week
export function getWeekRange(referenceDate: Date = new Date(), endOnSaturday = true): { startDate: string; endDate: string } {
  const d = new Date(referenceDate);
  const day = d.getDay(); // 0 is Sunday, 1 is Monday...
  // If it is Sunday (0), we consider the active/upcoming work week or Monday of that week
  const diffToMonday = day === 0 ? 1 : 1 - day;
  
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  
  const endDay = new Date(monday);
  endDay.setDate(monday.getDate() + (endOnSaturday ? 5 : 6)); // Saturday (+5) or Sunday (+6)

  const toYMD = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const dayStr = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${dayStr}`;
  };

  return {
    startDate: toYMD(monday),
    endDate: toYMD(endDay)
  };
}

export function shiftWeek(startDateStr: string, weeks: number, endOnSaturday = true): { startDate: string; endDate: string } {
  const currentStart = new Date(startDateStr + 'T00:00:00');
  currentStart.setDate(currentStart.getDate() + (weeks * 7));
  const day = currentStart.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(currentStart);
  monday.setDate(currentStart.getDate() + diffToMonday);
  const endDay = new Date(monday);
  endDay.setDate(monday.getDate() + (endOnSaturday ? 5 : 6));

  const toYMD = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const dayStr = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${dayStr}`;
  };

  return {
    startDate: toYMD(monday),
    endDate: toYMD(endDay)
  };
}

export interface DynamicWeeklyOptions {
  currentWeek: {
    startDate: string;
    endDate: string;
    label: string;
  };
  lastWeek: {
    startDate: string;
    endDate: string;
    label: string;
  };
}

export function getDynamicWeeklyRanges(records?: { date: string }[]): DynamicWeeklyOptions {
  const now = new Date();
  let maxDateStr = '';

  if (records && records.length > 0) {
    for (const r of records) {
      if (r.date && r.date > maxDateStr) {
        maxDateStr = r.date;
      }
    }
  }

  let refDate = now;
  if (maxDateStr) {
    const maxDate = new Date(maxDateStr + 'T00:00:00');
    if (!isNaN(maxDate.getTime())) {
      // Use whichever is later between real-world clock and newest record in sheet
      if (maxDate.getTime() > now.getTime()) {
        refDate = maxDate;
      }
    }
  }

  const currentWeekRange = getWeekRange(refDate, true);
  const lastWeekRange = shiftWeek(currentWeekRange.startDate, -1, true);

  return {
    currentWeek: {
      ...currentWeekRange,
      label: `Current Week (${formatShortDateRange(currentWeekRange.startDate, currentWeekRange.endDate)})`
    },
    lastWeek: {
      ...lastWeekRange,
      label: `Last Week (${formatShortDateRange(lastWeekRange.startDate, lastWeekRange.endDate)})`
    }
  };
}

export interface MonthOption {
  key: string;
  yearMonth: string;
  startDate: string;
  endDate: string;
  label: string;
  display: string;
}

export function getAvailableMonthsFromRecords(records?: { date: string }[]): MonthOption[] {
  const monthSet = new Set<string>();
  
  // Include current month
  const now = new Date();
  const currentYm = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  monthSet.add(currentYm);

  if (records) {
    for (const r of records) {
      if (r.date && r.date.length >= 7) {
        monthSet.add(r.date.substring(0, 7));
      }
    }
  }

  const sortedMonths = Array.from(monthSet).sort().reverse();
  const fullMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return sortedMonths.map((ym) => {
    const [yStr, mStr] = ym.split('-');
    const y = parseInt(yStr, 10);
    const m = parseInt(mStr, 10);
    const lastDay = new Date(y, m, 0).getDate();
    const lastDayStr = String(lastDay).padStart(2, '0');
    const monthName = fullMonths[m - 1] || ym;
    const shortName = shortMonths[m - 1] || ym;

    return {
      key: `month-${ym}`,
      yearMonth: ym,
      startDate: `${ym}-01`,
      endDate: `${ym}-${lastDayStr}`,
      label: `${monthName} ${y}`,
      display: `${monthName} ${y} (01 - ${lastDayStr} ${shortName} ${y})`
    };
  });
}
