import 'dotenv/config.js';
import express, { json } from 'express';
import cors from 'cors';
import sequelize from './models/database.js';
import budgetsRouter from './routes/budgets.js';
import expensesRouter from './routes/expenses.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(json());

// Define routes here
app.use('/api/budgets', budgetsRouter);
app.use('/api/expenses', expensesRouter);

// Start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});