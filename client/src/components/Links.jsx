import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Expense tracker
                </Link>

            </React.Fragment>
        )
    }
}

export default Links
