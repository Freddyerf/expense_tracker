import React, { useState } from 'react';
import axios from 'axios';

const EditBudgetForm = ({ budget, onBudgetUpdated, onClose }) => {
  const [category, setCategory] = useState(budget.category);
  const [amount, setAmount] = useState(budget.amount);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedBudget = {
      id: budget.id,
      category,
      amount,
    };

    try {
      // Assuming your API supports updating budgets via PUT request
      const response = await axios.put(`${apiBaseUrl}/budgets/${budget.id}`, updatedBudget);
      onBudgetUpdated(response.data);
      onClose(); // Close the modal or form view
    } catch (error) {
      console.error('There was an error updating the budget:', error);
      // Handle the error appropriately in your UI
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3">Edit Budget</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
          >
            Update Budget
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBudgetForm;
