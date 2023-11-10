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
    <form onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Expense Name'
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Amount'
          required
        />
      </div>
      <div>
        <label htmlFor="budget">Budget:</label>
        <select
          id='budget'
          value={selectedBudgetId}
          onChange={(e) => setSelectedBudgetId(e.target.value)}
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
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
