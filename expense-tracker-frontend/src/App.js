import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetList from './components/BudgetList';
import ExpenseList from './components/ExpenseList';
import AddBudgetForm from './components/AddBudgetForm';
import AddExpenseForm from './components/AddExpenseForm';
import Modal from './components/Modal'; 
import './App.css';
import AddButton from './components/AddButton';
import EditExpenseForm from './components/EditExpenseForm';
import LoginPage from './components/Login';
import { jwtDecode } from 'jwt-decode';



function App() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // State to control the visibility of the modals
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    // If there is a user, fetch budgets and expenses
    if (user) {
      fetchBudgetsAndExpenses();
    }
  }, [user]);

  // Capture the token in the URL after the redirect from Google OAuth
  useEffect(() => { 
    const hash = window.location.hash;
    const tokenMatch = hash.match(/token=([^&]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (token) {
      localStorage.setItem('jwt', token);
      const userPayload = jwtDecode(token);
      setUser({ token, name: userPayload.name });
      window.location.hash = ''; // Clear the URL fragment
    } else {
      // Check for token in localStorage
      const storedToken = localStorage.getItem('jwt');
      if (storedToken) {
        const userPayload = jwtDecode(storedToken);
        setUser({ token: storedToken, name: userPayload.name });
      }
    }
  }, []);

  // Configure Axios to use the token
  useEffect(() => {
    if (user && user.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
    fetchBudgetsAndExpenses();

  }, [user]);

  // Logout function should also clear Axios authorization header
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Function to handle the edit button click
  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setShowEditModal(true);
  };

  // Function to handle the delete button click
  const handleDeleteClick = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`${apiBaseUrl}/expenses/${expenseId}`);
        // Update the state to reflect the deletion
        setExpenses(expenses.filter((expense) => expense.id !== expenseId));
      } catch (error) {
        console.error('Error deleting expense:', error);
        // Optionally handle the error, such as displaying a notification
      }
    }
  };

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

  const handleAddExpense = (newExpense) => {
    setExpenses(currentExpenses => [...currentExpenses, newExpense]);
  };

  const handleAddBudget = (newBudget) => {
    setBudgets(currentBudgets => [...currentBudgets, newBudget]);
  };

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className='app'>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="app-title text-2xl font-bold">Expense Tracker</h1>
        <div className="user-info">
        <span>{user.name}</span>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      </nav>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-6 sm:py-12">
        <div className="relative flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* The blue background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg relative">
            <div className="text-center">
              {/* Include any header content here */}
            </div>
            
            <div className="flex flex-col md:flex-row px-4 py-5 sm:px-6">
              {/* Budgets Section */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Budgets</h2>
                  <AddButton onClick={() => setShowBudgetModal(true)} text="Add New Budget" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BudgetList budgets={budgets} expenses={expenses} />
                </div>
              </div>
              
              {/* Expenses Section */}
              <div className="flex-1 mt-6 md:mt-0 md:ml-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Expenses</h2>
                  <AddButton onClick={() => setShowExpenseModal(true)} text="Add New Expense" />
                </div>
                <ExpenseList expenses={expenses} onEdit={handleEditClick} onDelete={handleDeleteClick} />
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

        {/* Edit Expense Modal */}
        <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
          <EditExpenseForm
            expense={selectedExpense}
            onExpenseUpdated={(updatedExpense) => {
              // Update the expenses state with the updated expense
              setExpenses(expenses.map((expense) => expense.id === updatedExpense.id ? updatedExpense : expense));
              setShowEditModal(false);
            }}
            onClose={() => setShowEditModal(false)}
            budgets={budgets}
          />
        </Modal>
      </div>
    </div>

  );
}

export default App;
