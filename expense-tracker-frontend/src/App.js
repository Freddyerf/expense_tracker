import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetList from './components/BudgetList';
import ExpenseList from './components/ExpenseList';
import AddBudgetForm from './components/AddBudgetForm';
import AddExpenseForm from './components/AddExpenseForm';
import Modal from './components/Modal'; 
import './App.css';
import AddButton from './components/AddButton';


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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6 sm:py-12">
      <div className="relative flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The blue background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg relative">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Expense Tracker</h1>
            {/* Include any other header content here */}
          </div>
          
          <div className="flex flex-col md:flex-row px-4 py-5 sm:px-6">
            {/* Budgets Section */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Budgets</h2>
                <button
                  onClick={() => setShowBudgetModal(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add New Budget
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BudgetList budgets={budgets} expenses={expenses} />
              </div>
            </div>
            
            {/* Expenses Section */}
            <div className="flex-1 mt-6 md:mt-0 md:ml-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Expenses</h2>
                <button
                  onClick={() => setShowExpenseModal(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add New Expense
                </button>
              </div>
              <div className="overflow-auto h-96">
                <ExpenseList expenses={expenses} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
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
