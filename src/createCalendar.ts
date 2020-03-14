import { dayNames } from './consts';

export interface CalendarItem {
   date: number;
   fullDate: Date;
   active: boolean;
   selected: boolean;
   name: string;
}

export function createCalendar (d: Date): CalendarItem[] {
   const currentDate = d.getDate();
   const month = d.getMonth();
   const year = d.getFullYear();

   const prevMonth = month - 1;
   const nextMonth = month + 1;

   const firstDay = new Date(year, month, 1).getDay();

   // Date 0 is the last date of the previous month
   const length = new Date(year, nextMonth, 0).getDate();
   const lastMonthLength = new Date(year, month, 0).getDate();

   let items = [];

   // Populate the calendar with the dates from the current month
   for (let date = 1; date <= length; date++) {
      const fullDate = new Date(year, month, date);
      items.push({
         date,
         fullDate,
         active: true,
         selected: date === currentDate,
         name: dayNames[fullDate.getDay()]
      });
   }

   // Populate beginning of the calendar with dates from the last month
   for (let i = 0; i < firstDay; i++) {
      const date = lastMonthLength - i;
      const fullDate = new Date(year, prevMonth, date);
      items.unshift({
         date,
         fullDate,
         active: false,
         selected: false,
         name: dayNames[fullDate.getDay()]
      });
   }

   // Populate end of the calendar with dates from the next month
   let nextMonthDay = 1;
   while (items.length < 42) {
      const date = nextMonthDay++;
      const fullDate = new Date(year, nextMonth, date);

      items.push({
         date,
         fullDate,
         active: false,
         selected: false,
         name: dayNames[fullDate.getDay()]
      });
   }

   return items;
}
