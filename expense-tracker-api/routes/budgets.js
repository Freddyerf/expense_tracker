import express from 'express';
import Budget from '../models/Budget.js';

const router = express.Router();

// Get all budgets for the logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const budgets = await Budget.findAll({
      where: {userId: userId}
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single budget by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const budget = await Budget.findOne({
      where: {
        id: req.params.id,
        userId: userId
      }
    });
    if (budget) {
      res.json(budget);
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new budget
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const budgetData = {
      ...req.body,
      userId: userId
    };
    const newBudget = await Budget.create(budgetData);
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a budget
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const updated = await Budget.update(req.body, {
      where: { 
        id: req.params.id,
        userId: userId
      }
    });
    if (updated) {
      const updatedBudget = await Budget.findByPk(req.params.id);
      res.status(200).json(updatedBudget);
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a budget
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const deleted = await Budget.destroy({
      where: { 
        id: req.params.id, 
        userId: userId
      }
    });
    if (deleted) {
      res.status(200).json({ message: 'Budget deleted' });
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
