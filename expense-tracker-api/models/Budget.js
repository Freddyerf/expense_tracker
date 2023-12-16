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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // This references the Users model
      key: 'id', // The id field in the Users model
    },
  },
});

export default Budget;