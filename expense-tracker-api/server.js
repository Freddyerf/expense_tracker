import 'dotenv/config.js';
import express, { json } from 'express';
import cors from 'cors';
import sequelize from './models/database.js';
import budgetsRouter from './routes/budgets.js';
import expensesRouter from './routes/expenses.js';
import passport from './config/passport-setup.js';
import authRoutes from './routes/auth.js';
import authenticateToken from './middleware/authToken.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(json());

// Define routes here
app.use('/api/budgets', authenticateToken, budgetsRouter);
app.use('/api/expenses', authenticateToken, expensesRouter);
// Authentication routes
app.use(authRoutes);


// Passport config
app.use(passport.initialize());

// Start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});