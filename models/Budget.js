import { DataTypes } from 'sequelize';
import sequelize from './database.js'; // Your Sequelize connection

const Budget = sequelize.define('Budget', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Budget;