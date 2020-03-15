# react-calendar-hook
React helper for event emitters and socket.io

# Installation
```bash
npm install react-calendar-hook
```
```bash
yarn add react-calendar-hook
```

# Usage
Live demo:
[Code Sandbox](https://codesandbox.io/s/green-leaf-vn82q)

```typescript
import React from 'react';
import {
   useCalendar, // Hook shown bellow
   dayNames, // Monday, Tuesday, etc...
   shortDayNames, // Mon, Tue, etc...
   monthNames, // January, February, etc...
   shortMonthNames, // Jan, Feb, etc...
   Calendar, // Type shown bellow
   CalendarItem // Type shown bellow
} from 'react-calendar-hook';

function App() {
   // Date is optional, current date will be set by default
   const currentDate = new Date();
   
   const calendar = useCalendar(currentDate);
}

// Return value of the userCalendar() hook
interface Calendar {
	date: Date; // Date object
	month: {
		index: number; // 0 - 11
		number: number; // 1 - 12
		name: string; // January, February, etc...
	};
	day: {
		index: number; // 0 - 6
		number: number; // 1 - 31
		name: string; // Monday, Tuesday, etc...
	};
	year: number; // 2020
	prevMonth: () => void; // Select previous month
	nextMonth: () => void; //Select next month
	selectDate: (date: Date) => void; // Select specific date
	items: CalendarItem[];
}

interface CalendarItem {
   date: number; // 1 - 31
   fullDate: Date; // Date object
   active: boolean; // Belongs to the current month
   selected: boolean; // Is current date
   name: string; // Monday, Tuesday, etc...
}
```