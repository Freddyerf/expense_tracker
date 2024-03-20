import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    console.log(dateString);
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // This will format the date as dd/mm/yy 
  };
  

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex flex-col justify-between">
      <div className="flex justify-between">
        <span className="font-bold">{expense.title}</span>
        <span className="font-semibold">${expense.amount}</span>
      </div>
      <div className="flex justify-between items-center my-2">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
          {expense.Budget.category}
        </span>
        <span className="text-sm">{formatDate(expense.date)}</span>
      </div>
      <div className="flex justify-end">
        <button onClick={() => onEdit(expense)} className="text-indigo-600 hover:text-indigo-800 mr-2">
          <PencilIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button onClick={() => onDelete(expense.id)} className="text-red-600 hover:text-red-800">
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};


export default ExpenseCard;
