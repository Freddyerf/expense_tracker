import React from 'react';

const BudgetProgressBar = ({ budget }) => {
  const percentage = Math.round((budget.amountSpent / budget.amount) * 100);

  return (
    <div className="budget-progress">
      <span>{budget.category}</span>
      <div className="progress-bar">
        <div
          className="progress-bar-filled"
          style={{ width: `${percentage}%` }}
        >{`${percentage}%`}</div>
      </div>
      <span>{`$${budget.amountSpent} / $${budget.amount}`}</span>
    </div>
  );
};

export default BudgetProgressBar;
