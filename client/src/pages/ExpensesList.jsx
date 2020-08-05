
import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    margin-top: 40px;
    padding: 0 40px 40px 40px;
`
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Create = styled.div`
    color: #32a852;
    cursor: pointer;
    float: right;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
class CreateExpense extends Component {
    createExpense = event => {
        event.preventDefault()

        window.location.href = `/expense/create`
    }

    render() {
        return <Create onClick={this.createExpense}>Add new expense</Create>
    }
}

class UpdateExpense extends Component {
    updateExpense = event => {
        event.preventDefault()

        window.location.href = `/expense/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateExpense}>Edit</Update>
    }
}

class DeleteExpense extends Component {
    deleteUser = event => {
        event.preventDefault()

        api.deleteExpenseById(this.props.id)
        window.location.reload()
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

// function MyCell({ value, columnProps: { rest: { someFunc } } }) {
//   return <a href="#" onClick={someFunc}>{value}</a>
// }



class ExpensesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expenses: [],
            columns: [],
            isLoading: false,
        }
    }



    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllExpenses().then(expenses => {

            this.setState({
                expenses: expenses.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { expenses, isLoading } = this.state
        console.log('Expenses render: ', expenses)

        const columns = [
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Amount',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            {(props.original.amount).toFixed(2)}
                        </span>
                    )
                },
            },
            {
                Header: 'Taxes (15%)',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            {(props.original.amount * 0.15).toFixed(2)}
                        </span>
                    )
                },
            },
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateExpense id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteExpense id={props.original._id} />
                        </span>
                    )
                },
            }
        ]

        let showTable = true
        if (!expenses.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <span><CreateExpense /></span><br />
                <span> The subtotal of expenses is {expenses.map(el => el.amount).reduce(function(acc, el){ return acc + el}, 0).toFixed(2)} $</span><br />
                <span> The total with taxes is {(expenses.map(el => el.amount).reduce(function(acc, el){ return acc + el}, 0)  * 0.15).toFixed(2)} $</span><br /><br />
                {showTable && (
                    <ReactTable
                        data={expenses}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default ExpensesList
