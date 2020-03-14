import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useCalendar } from '../src';

const march = 'Sat Mar 14 2020 21:41:31 GMT+0100 (Central European Standard Time)';

describe('useCalendar should return', () => {
   const d = new Date(march);
   const { result } = renderHook(() => useCalendar(d));
   const calendar = result.current;

   // Date
   test('correct date object', () => {
      expect(calendar.date.toString()).toBe(new Date('2020-03-14T20:41:31.000Z').toString());
   });

   test('correct year and (name, number and index) properties fro month and day', () => {
      // Year
      expect(calendar.year).toBe(2020);

      // Day
      expect(calendar.day.index).toBe(6);
      expect(calendar.day.number).toBe(14);
      expect(calendar.day.name).toBe('Saturday');

      // Month
      expect(calendar.month.index).toBe(2);
      expect(calendar.month.number).toBe(3);
      expect(calendar.month.name).toBe('March');
   });

   test('list of items with proper data on them', () => {
      // March should have 31 days
      const activeDays = calendar.items.filter(({ active }) => active);
      expect(activeDays.length).toBe(31);

      // First item
      const firstItem = calendar.items[0];
      expect(firstItem.date).toBe(1);
      expect(firstItem.fullDate.toString()).toBe(new Date('2020-02-29T23:00:00.000Z').toString());
      expect(firstItem.active).toBe(true);
      expect(firstItem.selected).toBe(false);
      expect(firstItem.name).toBe('Sunday');
   });

   test('prevMonth, nextMonth and selectDate functions', () => {
      expect(typeof calendar.prevMonth).toBe('function');
      expect(typeof calendar.nextMonth).toBe('function');
      expect(typeof calendar.selectDate).toBe('function');
   });
});

/**
 * Default Date value
 */
describe('useCalendar should return calendar for the current date if parameter is not provided', () => {
   test('default date object', () => {
      const d = new Date();
      const currentDate = d.getDate();
      const currentMonth = d.getMonth();
      const currentYear = d.getFullYear();

      const { result } = renderHook(() => useCalendar());
      const calendar = result.current;

      expect(calendar.day.number).toBe(currentDate);
      expect(calendar.month.index).toBe(currentMonth);
      expect(calendar.year).toBe(currentYear);
   });
});

/**
 * Select date
 */
describe('selectDate function should', () => {
   test('select provided date', () => {
      const d = new Date(march);
      const { result } = renderHook(() => useCalendar(d));

      expect(result.current.month.number).toBe(3);
      expect(result.current.day.number).toBe(14);
      expect(result.current.year).toBe(2020);

      act(() => {
         const newDate = new Date(2021, 5, 3);
         result.current.selectDate(newDate);
      });

      expect(result.current.month.index).toBe(5);
      expect(result.current.day.number).toBe(3);
      expect(result.current.year).toBe(2021);
   });
});

/**
 * Select prev month
 */
describe('prevMonth function should', () => {
   test('select previous month', () => {
      const d = new Date(march);
      const { result } = renderHook(() => useCalendar(d));

      expect(result.current.month.number).toBe(3);

      act(() => {
         result.current.prevMonth();
      });

      expect(result.current.month.number).toBe(2);
   });

   test('select previous year when called enough times', () => {
      const d = new Date(march);
      const { result } = renderHook(() => useCalendar(d));

      expect(result.current.month.number).toBe(3);

      act(() => {
         result.current.prevMonth();
      });
      act(() => {
         result.current.prevMonth();
      });
      act(() => {
         result.current.prevMonth();
      });

      expect(result.current.month.number).toBe(12);
      expect(result.current.year).toBe(2019);
   });
});

/**
 * Select next month
 */
describe('nextMonth function should', () => {
   test('select next month', () => {
      const d = new Date(march);
      const { result } = renderHook(() => useCalendar(d));

      expect(result.current.month.number).toBe(3);

      act(() => {
         result.current.nextMonth();
      });

      expect(result.current.month.number).toBe(4);
   });

   test('select previous year when called enough times', () => {
      const d = new Date(march);
      const { result } = renderHook(() => useCalendar(d));

      expect(result.current.month.number).toBe(3);

      act(() => {
         result.current.nextMonth();
      });
      act(() => {
         result.current.nextMonth();
      });
      act(() => {
         result.current.nextMonth();
      });
      act(() => {
         result.current.nextMonth();
      });
      act(() => {
         result.current.nextMonth();
      });
      act(() => {
         result.current.nextMonth();
      });
      act(() => {
         result.current.nextMonth();
      });
      act(() => {
         result.current.nextMonth();
      });
      act(() => {
         result.current.nextMonth();
      });
      act(() => {
         result.current.nextMonth();
      });

      expect(result.current.month.number).toBe(1);
      expect(result.current.year).toBe(2021);
   });
});
