const generate = require('shortid');
const express = require('express');
const server = express();
server.use(express.json());

const dbFunc = require('./users/model');

server.get('/api/users', (req, res) => {
  dbFunc.find().then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json(err.message)
  })
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id

  dbFunc.findById(id)
  .then(user => res.status(200).json(user))
  .catch(err => res.status(404).json(err.message))
});

server.post('/api/users', (req, res) => {
 
  dbFunc.insert(req.body)
  .then(user => res.status(201).json(user))
  .catch(err => res.status(400).json(err.message))
});

server.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if(!changes.name || !changes.bio) {
    res.status(400).json({ message:"All fields required!" })
  } else {
    try {
      const updated = await dbFunc.update(id, changes)
      res.status(200).json(updated)
    } catch (error) {
      res.status(500).json({ message:error })
    }
  }
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  dbFunc.remove(id)
  .then(user => res.status(200).json(user))
  .catch(err => res.status(500).json(err.message))
});

module.exports = server;

// const users = [
//   {id:generate(), name:"Bob", job: "Clown"},
//   {id:generate(), name:"Tom", job: "Mattress Salesman"},
//   {id:generate(), name:"Steve", job: "Racer"},
//   {id:generate(), name:"Jake", job: "Alcoholic"},
// ];
