import { Sequelize } from 'sequelize';

// Connect to db
const sequelize = new Sequelize('expense_tracker_db', 'myuser', 'mypass',{
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize;