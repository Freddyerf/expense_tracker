import React from 'react';
import AddButton from './AddButton';

const ExpenseList = ({ expenses, onAddExpense }) => {
  return (
    <div className="mt-6">
      <ul className="space-y-3">
        {expenses.map((expense) => (
          <li key={expense.id} className="p-4 bg-white rounded shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{expense.title}</h3>
                <p className="text-sm text-gray-500">{expense.category}</p>
              </div>
              <div>
                <span className="text-lg font-semibold">${expense.amount}</span>
              </div>
              <div className="flex items-center">
                <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
