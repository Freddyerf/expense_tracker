import React from 'react';
import BudgetProgressBar from './BudgetProgressBar';
import AddButton from './AddButton';

const BudgetList = ({ budgets, expenses, onAddBudget }) => {
  // Calculate the total expenses for each budget category
  const budgetsWithTotals = budgets.map(budget => {
    const totalExpenses = expenses
      .filter(expense => expense.budgetId === budget.id)
      .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

    return {
      ...budget,
      amountSpent: totalExpenses
    };
  });

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Budgets</h2>
        <AddButton onClick={onAddBudget} text="Add New Budget" />
      </div>
      {budgetsWithTotals.map(budget => (
        <BudgetProgressBar key={budget.id} budget={budget} />
      ))}
    </div>
  );
};

export default BudgetList;
