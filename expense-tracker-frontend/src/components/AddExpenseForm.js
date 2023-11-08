import React, { useState } from 'react';
import axios from 'axios';

const AddExpenseForm = ({ onExpenseAdded }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetId, setBudgetId] = useState('');
  const apiBaseUrl = 'http://localhost:3001/api';

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setBudgetId('');
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/expenses`, {
        title,
        amount,
        budgetId
      });
      console.log(response.data);
      onExpenseAdded(response.data); 
      resetForm();
    } catch (error) {
      console.error('There was an error creating the expense:', error.response);
      // Handle errors here
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
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="budgetId">Budget:</label>
        <input
          type="text"
          id="budgetId"
          value={budgetId}
          onChange={(e) => setBudgetId(e.target.value)}
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
