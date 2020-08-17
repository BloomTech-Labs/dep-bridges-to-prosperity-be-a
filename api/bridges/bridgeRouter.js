const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Bridges = require('./bridgeModal');
const { validateId, validateValues } = require('../middleware/authMiddleware');

const route = express.Router();

// [bridge, bridges]/all
//This returns all bridges

/**
 * @swagger
 * components:
 *  schemas:
 *    Bridges:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - stage
 *      properties:
 *        id:
 *          type: string
 *          description: This is a foreign key (the okta user ID)
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        avatarUrl:
 *          type: string
 *          description: public url of profile avatar
 *      example:
 *        id: '00uhjfrwdWAQvD8JV4x6'
 *        email: 'frank@example.com'
 *        name: 'Frank Martinez'
 *        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/hermanobrother/128.jpg'
 *
 * /bridges/all:
 *  get:
 *    description: Returns a list of bridges
 *    summary: Get a list of all bridges
 *    tags:
 *      - bridge
 *    responses:
 *      200:
 *        description: array of bridges
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Bridges'
 *              example:
 *                - id: '00uhjfrwdWAQvD8JV4x6'
 *                  name: 'Buzi'
 *                  type: 'Suspended'
 *                  stage: 'Rejected'
 *                  subStage: 'Technical'
 *      500:
 *        $ref: '#/components/responses/InternalSeverError'
 */
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
