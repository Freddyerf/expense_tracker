import express from 'express';
import Budget from '../models/Budget.js';

const router = express.Router();

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.findAll();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single budget by ID
router.get('/:id', async (req, res) => {
  try {
    const budget = await Budget.findByPk(req.params.id);
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
    const newBudget = await Budget.create(req.body);
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a budget
router.put('/:id', async (req, res) => {
  try {
    const updated = await Budget.update(req.body, {
      where: { id: req.params.id }
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
    const deleted = await Budget.destroy({
      where: { id: req.params.id }
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
