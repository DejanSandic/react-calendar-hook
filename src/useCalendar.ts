import { useState, useMemo } from 'react';
import { monthNames, dayNames } from './consts';
import { createCalendar, CalendarItem } from './createCalendar';

interface Calendar {
   date: Date;
   month: {
      index: number;
      number: number;
      name: string;
   };
   day: {
      index: number;
      number: number;
      name: string;
   };
   year: number;
   prevMonth: () => void;
   nextMonth: () => void;
   selectDate: (date: Date) => void;
   items: CalendarItem[];
}

export function useCalendar (currentDate: Date = new Date()): Calendar {
   const [fullDate, setFullDate] = useState(currentDate);
   const date = useMemo(() => fullDate.getDate(), [fullDate]);
   const day = useMemo(() => fullDate.getDay(), [fullDate]);
   const month = useMemo(() => fullDate.getMonth(), [fullDate]);
   const year = useMemo(() => fullDate.getFullYear(), [fullDate]);

   const selectDate = (dayDate: Date) => setFullDate(dayDate);

   const prevMonth = () => {
      const newMonth = month - 1 < 0 ? 11 : month - 1;
      const newYear = newMonth === 11 ? year - 1 : year;
      setFullDate(new Date(newYear, newMonth, 1));
   };

   const nextMonth = () => {
      const newMonth = month + 1 > 11 ? 0 : month + 1;
      const newYear = newMonth === 0 ? year + 1 : year;
      setFullDate(new Date(newYear, newMonth, 1));
   };

   const items = useMemo(() => createCalendar(fullDate), [fullDate]);

   return {
      date: fullDate,
      month: {
         index: month,
         number: month + 1,
         name: monthNames[month]
      },
      day: {
         index: day,
         number: date,
         name: dayNames[day]
      },
      year,
      prevMonth,
      nextMonth,
      selectDate,
      items
   };
}
