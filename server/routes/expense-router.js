const express = require('express')

const ExpenseController = require('../controllers/expense-controller')

const router = express.Router()

router.post('/expense', ExpenseController.createExpense)
router.put('/expense/:id', ExpenseController.updateExpense)
router.delete('/expense/:id', ExpenseController.deleteExpense)
router.get('/expense/:id', ExpenseController.getExpenseById)
router.get('/expenses', ExpenseController.getExpenses)

module.exports = router
