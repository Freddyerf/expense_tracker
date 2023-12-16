import { DataTypes } from 'sequelize';
import sequelize from './database.js'; 

const User = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    }
    // Add other fields as necessary
});

export default User;
