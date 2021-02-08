const generate = require('shortid');
const express = require('express');

const dbFunc = require('./users/model');

const users = [
  {id:generate(), name:"Bob", job: "Clown"},
  {id:generate(), name:"Tom", job: "Mattress Salesman"},
  {id:generate(), name:"Steve", job: "Racer"},
  {id:generate(), name:"Jake", job: "Alcoholic"},
];

const app = express();
app.use(express.json());

app.get('/api/users', (req, res) => {
  dbFunc.find().then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
});

app.get('/api/users/:id', (req, res) => {

})




module.exports = {}; // EXPORT YOUR SERVER instead of {}
