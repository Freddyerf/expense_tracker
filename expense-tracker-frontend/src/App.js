import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetList from './components/BudgetList';
import ExpenseList from './components/ExpenseList';
import AddBudgetForm from './components/AddBudgetForm';
import AddExpenseForm from './components/AddExpenseForm';
import AddButton from './components/AddButton'; 
import Modal from './components/Modal'; 
import './App.css';


function App() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const apiBaseUrl = 'http://localhost:3001/api';

  // State to control the visibility of the modals
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

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
      <AddButton onClick={() => setShowBudgetModal(true)} text="Add New Budget" />
      <AddButton onClick={() => setShowExpenseModal(true)} text="Add New Expense" />

      <Modal show={showBudgetModal} onClose={() => setShowBudgetModal(false)}>
        <AddBudgetForm onBudgetAdded={(newBudget) => {
          handleAddBudget(newBudget);
          setShowBudgetModal(false); // Close the modal after adding
        }} />
      </Modal>

      <Modal show={showExpenseModal} onClose={() => setShowExpenseModal(false)}>
        <AddExpenseForm onExpenseAdded={(newExpense) => {
          handleAddExpense(newExpense);
          setShowExpenseModal(false); // Close the modal after adding
        }} budgets={budgets} />
      </Modal>

      <BudgetList budgets={budgets} expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;
