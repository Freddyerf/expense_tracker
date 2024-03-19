import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      {/* Fixed Header */}
      <div className="flex bg-white p-4 rounded-t-lg shadow">
        <span className="font-bold w-1/4">Name</span>
        <span className="font-bold w-1/4">Amount</span>
        <span className="font-bold w-1/4">Category</span>
        <span className="font-bold w-1/4">Actions</span>
      </div>

      {/* Scrollable List */}
      <ul className="space-y-3 overflow-auto h-96">
        {expenses.map((expense) => (
          <li key={expense.id} className="p-4 bg-white rounded shadow flex items-center justify-between">
            <div className="w-1/4">
              <h3 className="text-sm font-semibold text-gray-700">{expense.title}</h3>
            </div>
            <div className="w-1/4">
              <span className="text-sm font-semibold text-gray-700">${expense.amount}</span>
            </div>
            <div className="w-1/4">
              <p className="text-sm font-semibold text-gray-700">{expense.Budget.category}</p>
            </div>
            <div className="flex items-center space-x-2 w-1/4 justify-end pr-4">
              <button onClick={() => onEdit(expense)} className="text-indigo-600 hover:text-indigo-900">
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button onClick={() => onDelete(expense.id)} className="text-red-600 hover:text-red-900">
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
