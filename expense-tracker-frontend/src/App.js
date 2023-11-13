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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Expense Tracker</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <AddButton onClick={() => setShowBudgetModal(true)} text="Add New Budget" />
                  <AddButton onClick={() => setShowExpenseModal(true)} text="Add New Expense" />
                  <BudgetList budgets={budgets} expenses={expenses} />
                  <ExpenseList expenses={expenses} />
                </div>
              </div>
            </div>
        </div>
      </div>
      
      <Modal show={showBudgetModal} onClose={() => setShowBudgetModal(false)}>
        <AddBudgetForm onBudgetAdded={(newBudget) => {
          handleAddBudget(newBudget);
          setShowBudgetModal(false);
        }} />
      </Modal>

      <Modal show={showExpenseModal} onClose={() => setShowExpenseModal(false)}>
        <AddExpenseForm onExpenseAdded={(newExpense) => {
          handleAddExpense(newExpense);
          setShowExpenseModal(false);
        }} budgets={budgets} />
      </Modal>
    </div>
  );
}
export default App;
