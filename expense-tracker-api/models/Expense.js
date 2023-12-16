import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Expense = sequelize.define('Expense', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Assuming you won't have expenses higher than 10 billion and need 2 decimal places for cents
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  budgetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Budgets', // This is a reference to another model
      key: 'id', // This is the column name of the referenced model
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // This references the Users model
      key: 'id', // The id field in the Users model
    },
  },
}, {
  // Model options go here
});

export default Expense;
