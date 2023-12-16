import express from 'express';
import {Expense, Budget} from '../models/index.js';

const router = express.Router();

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.findAll({
      include: [{
        model: Budget,
        as: 'Budget', 
        attributes: ['category'],
        where: { userId: userId }
      }]
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single expense by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const expense = await Expense.findByPk(req.params.id, {
      include: [{
        model: Budget,
        as: 'Budget',
        attributes: ['category'],
        where: { userId: userId }
      }]
    });

    // Ensure the expense exists and belongs to the user
    if (expense && expense.Budget && expense.Budget.userId === userId) {
      res.json(expense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new expense
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseData = {
      ...req.body,
      userId: userId
    }
    const newExpense = await Expense.create(expenseData);

    // After creating the expense, fetch it back along with the associated Budget
    const expenseWithBudget = await Expense.findByPk(newExpense.id, {
      include: [{
        model: Budget,
        as: 'Budget', 
        attributes: ['category'],
        where: { userId: userId }
      }]
    });

    res.status(201).json(expenseWithBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const updated = await Expense.update(req.body, {
      where: { 
        id: req.params.id,
        userId: userId 
      }
    });
    if (updated) {
      const updatedExpense = await Expense.findByPk(req.params.id, {
        include: [{
          model: Budget,
          as: 'Budget', 
          attributes: ['category'],
          where: { userId: userId }
        }]
      });
      res.status(200).json(updatedExpense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const deleted = await Expense.destroy({
      where: { 
        id: req.params.id,
        userId: userId 
      }
    });
    if (deleted) {
      res.status(200).json({ message: 'Expense deleted' });
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
