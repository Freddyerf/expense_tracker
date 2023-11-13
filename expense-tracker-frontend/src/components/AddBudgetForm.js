import React, { useState } from 'react';
import axios from 'axios';

const AddBudgetForm = ({onBudgetAdded}) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const apiBaseUrl = 'http://localhost:3001/api';

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
    <form onSubmit={handleSubmit}>
      <h2>Add New Budget</h2>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='Category name'
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
      <button type="submit">Add Budget</button>
    </form>
  );
};

export default AddBudgetForm;
