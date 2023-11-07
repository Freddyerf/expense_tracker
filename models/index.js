import sequelize from './database.js';
import Budget from './Budget.js';
import Expense from './Expense.js';

// Establish relationships
Budget.hasMany(Expense, { foreignKey: 'budgetId' });
Expense.belongsTo(Budget, { foreignKey: 'budgetId' });

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
