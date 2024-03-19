import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';


const BudgetProgressBar = ({ budget, onEdit, onDelete }) => {
  const rawPercentageSpent = (budget.amountSpent / budget.amount) * 100;
  const percentageSpent = rawPercentageSpent.toFixed(2); // Actual percentage
  const visualPercentageSpent = Math.min(rawPercentageSpent, 100).toFixed(2); // Visual cap at 100%

  // Function to determine color based on the raw percentage spent
  const getProgressBarColor = (percentage) => {
    // If the percentage is over 100, always return red
    if (percentage > 100) {
      return 'hsl(0, 100%, 50%)'; // Red
    }
  
    // Calculate the hue based on the percentage
    // Start with green (120) and end with red (0)
    const hue = ((100 - percentage) * 120 / 100);
    return `hsl(${hue}, 100%, 50%)`;
  };
  

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">{budget.category}</span>
        <span className="text-sm font-semibold">${budget.amountSpent} / ${budget.amount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="h-2.5 rounded-full"
          style={{ 
            width: `${visualPercentageSpent}%`, 
            backgroundColor: getProgressBarColor(rawPercentageSpent),
          }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
        <span>{percentageSpent}%</span>
        <div>
          <button
            onClick={() => onEdit(budget)}
            className="mr-2 p-1 text-blue-500 hover:text-blue-600"
            aria-label="Edit"
          >
            <PencilIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => onDelete(budget.id)}
            className="p-1 text-red-500 hover:text-red-600"
            aria-label="Delete"
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgressBar;
