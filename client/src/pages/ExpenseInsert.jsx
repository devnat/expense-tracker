import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class ExpenseInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            description: '',
            amount: '',
            date: '',
        }
    }

    handleChangeInputDescription = async event => {
        const description = event.target.value
        this.setState({ description })
    }

    handleChangeInputAmount = async event => {
        const amount = event.target.validity.valid
            ? event.target.value
            : this.state.amount

        this.setState({ amount })
    }

    handleChangeInputDate = async event => {
        const date = event.target.value
        this.setState({ date })
    }

    handleIncludeExpense = async () => {
        const { description, amount, date } = this.state
        const payload = { description, amount, date }

        await api.insertExpense(payload).then(res => {
            this.setState({
                description: '',
                amount: '',
                date: '',
            })
            window.location.href = '/expenses/list'
        })
    }

    render() {
        const { description, amount, date } = this.state
        return (
            <Wrapper>
                <Title>Create Expense</Title>

                <Label>Description: </Label>
                <InputText
                    type="text"
                    value={description}
                    onChange={this.handleChangeInputDescription}
                />

                <Label>Amount: </Label>
                <InputText
                    type="number"
                    step="1"
                    lang="en-US"
                    min="0"
                    max="100000"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={amount}
                    onChange={this.handleChangeInputAmount}
                />

                <Label>Date: </Label>
                <InputText
                    type="text"
                    value={date}
                    onChange={this.handleChangeInputDate}
                />

                <Button onClick={this.handleIncludeExpense}>Add Expense</Button>
                <CancelButton href={'/expenses/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default ExpenseInsert
