import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditExpenseForm = ({ expense, onExpenseUpdated, onClose, budgets }) => {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [selectedBudgetId, setSelectedBudgetId] = useState(expense.budgetId);
  const [description, setDescription] = useState(expense.description || '');
  const [date, setDate] = useState(expense.date || '');
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount);
      setSelectedBudgetId(expense.budgetId);
      setDescription(expense.description || '');
      setDate(expense.date || '');
    }
  }, [expense]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedExpense = {
      title,
      amount,
      budgetId: selectedBudgetId,
      description,
      date,
    };

    try {
      const response = await axios.put(`${apiBaseUrl}/expenses/${expense.id}`, updatedExpense);
      onExpenseUpdated(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-3">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
          <select
            id="budget"
            value={selectedBudgetId}
            onChange={(e) => setSelectedBudgetId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value="">Select Budget</option>
            {budgets.map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Update Expense
          </button>
          <button onClick={onClose} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpenseForm;
