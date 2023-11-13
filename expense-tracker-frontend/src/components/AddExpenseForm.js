import React, { useState } from 'react';
import axios from 'axios';

const AddExpenseForm = ({ onExpenseAdded, budgets }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBudgetId, setSelectedBudgetId] = useState('');
  const apiBaseUrl = 'http://localhost:3001/api';

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setSelectedBudgetId('');
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/expenses`, {
        title,
        amount,
        budgetId: selectedBudgetId
      });
      onExpenseAdded(response.data); 
      resetForm();
    } catch (error) {
      console.error('There was an error creating the expense:', error.response);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-3">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Expense Title"
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
            placeholder="Amount"
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
