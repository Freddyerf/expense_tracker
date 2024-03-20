import React from 'react';
import ExpenseCard from './ExpenseCard';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  // Parses a date string as a local date without time zone conversion.
  const parseLocalDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Group expenses by date
  const expensesByDate = expenses.reduce((acc, expense) => {
    const date = parseLocalDate(expense.date);
    const dateStr = date.toISOString().split('T')[0]; // Get the date string in the format 'yyyy-mm-dd'
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(expense);
    return acc;
  }, {});


  // Convert the groups object into a sorted array of date and expenses pairs
  const sortedGroups = Object.entries(expensesByDate).sort((a, b) => new Date(b[0]) - new Date(a[0]));

  const getRelativeDateLabel = (dateStr) => {
    const targetDate = parseLocalDate(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison
  
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (targetDate.getTime() === today.getTime()) return 'Today';
    if (targetDate.getTime() === yesterday.getTime()) return 'Yesterday';
    // Format the date as dd/mm/yy
    return targetDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

  }; 

  return (
    <div className="max-h-96 overflow-y-auto">
      {sortedGroups.map(([dateStr, expensesForDate]) => (
        <div key={dateStr}>
          <div className="bg-gray-200 text-gray-700 px-4 py-2">
            {getRelativeDateLabel(dateStr)}
          </div>
          {expensesForDate.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
