const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Bridges = require('./bridgeModal');
const { validateId, validateValues } = require('../middleware/authMiddleware');

const route = express.Router();

// [bridge, bridges]/all
//This returns all bridges
route.get('/all', (req, res) => {
  Bridges.find()
    .then((bridges) => {
      res.status(200).json(bridges);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

// /[bridge, bridges]/add
//Adds bridge/s and checks if all values are passed by user(checked by middleware)
route.post('/add', validateValues, (req, res) => {
  const body = req.body;

  Bridges.add(body)
    .then(() => {
      res.status(201).json({ message: 'bridge added successfully.' });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//[bridge, bridges]/:id
//returns bridge by id - middleware checks if id is valid
route.get('/:id', validateId, (req, res) => {
  const id = req.params.id;
  Bridges.findById(id)
    .then((id) => {
      res.status(200).json(id);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// [bridge, bridges]/:id
// updates the bridge by id - middleware checks if id is valid
route.patch('/:id', validateId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Bridges.update(id, changes)
    .then((count) => {
      res.status(201).json({ data: count });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// /[bridge, bridges]/:id
//Deletes bridge by given id - middleware checks if id is valid
route.delete('/:id', validateId, (req, res) => {
  const id = req.params.id;

  Bridges.remove(id)
    .then(() => {
      res.status(200).json({ message: 'Bridge Deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = route;
