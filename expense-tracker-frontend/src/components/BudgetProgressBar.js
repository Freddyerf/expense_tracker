// BudgetProgressBar.js
import React from 'react';

const BudgetProgressBar = ({ budget }) => {
  const percentageSpent = ((budget.amountSpent / budget.amount) * 100).toFixed(2);

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">{budget.category}</span>
        <span className="text-sm font-semibold">${budget.amountSpent} / ${budget.amount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${percentageSpent}%` }}
        ></div>
      </div>
      <div className="text-sm font-semibold text-gray-700">
        <span>{percentageSpent}%</span>
      </div>
    </div>
  );
};

export default BudgetProgressBar;
