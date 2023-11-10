import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetList from './components/BudgetList';
import ExpenseList from './components/ExpenseList';
import AddBudgetForm from './components/AddBudgetForm';
import AddExpenseForm from './components/AddExpenseForm';
import './App.css';

function App() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const apiBaseUrl = 'http://localhost:3001/api';

  useEffect(() => {
    const fetchBudgetsAndExpenses = async () => {
      try {
        const budgetsResponse = await axios.get(`${apiBaseUrl}/budgets`);
        const expensesResponse = await axios.get(`${apiBaseUrl}/expenses`);

        setBudgets(budgetsResponse.data);
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        // Optionally, handle the error state here (e.g., show a notification to the user)
      }
    };

    fetchBudgetsAndExpenses();
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenses(currentExpenses => [...currentExpenses, newExpense]);
  };

  const handleAddBudget = (newBudget) => {
    setBudgets(currentBudgets => [...currentBudgets, newBudget]);
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <AddBudgetForm setBudgets={setBudgets} onBudgetAdded={handleAddBudget} />
      <AddExpenseForm setExpenses={setExpenses} onExpenseAdded={handleAddExpense} budgets={budgets} />
      <BudgetList budgets={budgets} expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;
