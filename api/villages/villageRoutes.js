const express = require('express');
const { validateId, validateValues } = require('./villageMiddleware');
const route = express.Router();
const Villages = require('./villageModel');

route.post('/add', validateValues, async (req, res) => {
  const body = req.body;
  try {
    const newVillage = await Villages.add(body);
    res.status(201).json(newVillage);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
//have to add validateId
route.patch('/:id', validateId, async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  try {
    const editVillage = await Villages.update(id, changes);
    res.status(201).json(editVillage[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
route.delete('/:id', validateId, (req, res) => {
  const id = req.params.id;

  Villages.remove(id)
    .then(() => {
      res.status(200).json({ message: 'Village Deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = route;
