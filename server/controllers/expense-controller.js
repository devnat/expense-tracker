const Expense = require('../models/expense-model')

createExpense = (req, res) => {
    const body = req.body

    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'Some details are missing..',
      })
    }

    const expense = new Expense(body)

    if (!expense) {
        return res.status(400).json({ success: false, error: err })
    }

    expense
      .save()
      .then(() => {
        return res.status(201).json({
            success: true,
            id: expense._id,
            message: 'Expense is created.',
        })
      })
      .catch(error => {
        return res.status(400).json({
            error,
            message: 'Expense id NOT created.',
        })
      })
}

updateExpense = async (req, res) => {
    const body = req.body

    if (!body) {
      return res.status(400).json({
          success: false,
          error: 'Some details are missing..',
      })
    }

    Expense.findOne({ _id: req.params.id }, (err, expense) => {
      if (err) {
        return res.status(404).json({
            err,
            message: 'Expense not found.',
        })
      }
      expense.description = body.description
      expense.date        = body.date
      expense.amount      = body.amount

      expense
        .save()
        .then(() => {
          return res.status(200).json({
              success: true,
              id: expense._id,
              message: 'Expense is updated.',
          })
        })
        .catch(error => {
          return res.status(404).json({
              error,
              message: 'Expense is NOT updated.',
          })
        })
    })
}

deleteExpense = async (req, res) => {
    await Expense.findOneAndDelete({ _id: req.params.id }, (err, expense) => {
      if (err) {
        return res.status(400).json({ success: false, error: err })
      }

      if (!expense) {
        return res
          .status(404)
          .json({ success: false, error: `Expense not found` })
      }

      return res.status(200).json({ success: true, data: expense })
    }).catch(err => console.log(err))
}

getExpenseById = async (req, res) => {
    await Expense.findOne({ _id: req.params.id }, (err, expense) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!expense) {
        return res
          .status(404)
          .json({ success: false, error: `Expense not found` })
      }
      return res.status(200).json({ success: true, data: expense })
    }).catch(error => {
      console.log(error)
    })
}

getExpenses = async (req, res) => {
    await Expense.find({}, (err, expenses) => {
      if (err) {
        return res.status(400).json({ success: false, error: err })
      }
      if (!expenses.length) {
          return res
            .status(404)
            .json({ success: false, error: `Expense not found` })
      }
        return res.status(200).json({ success: true, data: expenses })
    }).catch(error => {
      console.log(error)
    })
}

module.exports = {
    createExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    getExpenses
}
