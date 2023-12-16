import sequelize from './database.js';
import Budget from './Budget.js';
import Expense from './Expense.js';
import User from './User.js';

// Establish relationships
Budget.hasMany(Expense, { foreignKey: 'budgetId' });
Expense.belongsTo(Budget, { foreignKey: 'budgetId' });

// User has many Budgets
User.hasMany(Budget, { foreignKey: 'userId', onDelete: 'CASCADE' });
Budget.belongsTo(User, { foreignKey: 'userId' });

// User has many Expenses
User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
};

syncModels();

export { Budget, Expense };
