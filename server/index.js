const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
const expenseRouter = require('./routes/expense-router')

app.use('/api', expenseRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
