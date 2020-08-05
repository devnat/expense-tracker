import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { ExpensesList, ExpenseInsert, ExpenseUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/expenses/list" exact component={ExpensesList} />
                <Route path="/expense/create" exact component={ExpenseInsert} />
                <Route
                    path="/expense/update/:id"
                    exact
                    component={ExpenseUpdate}
                />
            </Switch>
        </Router>
    )
}
export default App
