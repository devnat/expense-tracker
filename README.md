This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Expense tracker


 A simple expense tracking application build with a basic express backend and React frontend.

## Up and running

 To get mongodb up and  and run it as a background process:

`mkdir -p /data/db`

`brew tap mongodb/brew`
`brew install mongodb-community`

`brew services start mongodb-community`

`mongod --config /usr/local/etc/mongod.conf --fork`


## To run server side (BE) of the application

`cd server && npm install && nodemon index.js`

Should be running under : http://127.0.0.1:3000/api

## Available endpoints

- GET http://127.0.0.1:3000/api/expense/<ID>

- POST http://127.0.0.1:3000/api/expense
**payload**:
{
    "description": “Fruits”,
    "date": "2020-07-22T20:30:45.025Z",
    "amount": 10.20
}

- PUT http://127.0.0.1:3000/api/expense/<ID>
**payload**:
{
    "description": “Fruits”,
    "date": "2020-07-24T20:30:45.025Z",
    "amount": 20.20
}
- DELETE http://127.0.0.1:3000/api/expense/<ID>


## To run client side (FE) part of the application:

`cd client && npm install && npm start`

Should be available under:  `http://localhost:8000/expenses/list`


Have fun!

