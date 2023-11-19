import { Sequelize } from 'sequelize';


let sequelize;

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Important for Heroku
            }
        }
    });
} else {
    sequelize = new Sequelize(
        process.env.DEV_DB_NAME,
        process.env.DEV_DB_USER,
        process.env.DEV_DB_PASS,{
        host: process.env.DEV_DB_HOST || 'localhost',
        dialect: 'postgres'
    });
}

export default sequelize;