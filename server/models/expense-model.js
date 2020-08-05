const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Expense = new Schema(
	{
		description: { type: String, required: true },
		date: { type: String, required: true },
		amount: { type: Number, required: true },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('expenses', Expense)
