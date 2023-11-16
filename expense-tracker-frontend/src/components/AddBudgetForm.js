import React, { useState } from 'react';
import axios from 'axios';

const AddBudgetForm = ({onBudgetAdded}) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const resetForm = () => {
    setCategory('');
    setAmount('');
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/budgets`, { category, amount });
      onBudgetAdded(response.data);
      resetForm();
    } catch (error) {
        console.error('There was an error creating the budget:', error.response);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-3">Add New Budget</h2>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 disabled:opacity-25 transition">
          Add Budget
        </button>
      </div>
    </form>
  );
};


export default AddBudgetForm;
