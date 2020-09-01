const express = require('express');
const authRequired = require('../middleware/authRequired');
const Bridges = require('./bridgeModal');
const { validateId, validateValues } = require('../middleware/authMiddleware');

const route = express.Router();
const db = require('../../data/db-config');

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
 *        id: 23243222
 *        name: 'Buzi'
 *        type: 'Suspended'
 *        stage: 'Rejected'
 *        subStage: 'Technical'
 *        individualsDirectlyServed: 0.0
 *        span: 0.0
 *        latitude: -2.42056
 *        longitude: 28.9662
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
 *                - id: 23243222
 *                  name: 'Buzi'
 *                  type: 'Suspended'
 *                  stage: 'Rejected'
 *                  subStage: 'Technical'
 *                  individualsDirectlyServed: 0
 *                  span: 0.0
 *                  latitude: -2.42056
 *                  longitude: 28.9662
 *      500:
 *        $ref: '#/components/responses/InternalSeverError'
 */
route.get('/all', (req, res) => {
  Bridges.find()
    .then((bridges) => {
      console.log('length ', bridges.length);
      res.status(200).json(bridges);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

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
 *        id: 23243222
 *        name: 'Buzi'
 *        type: 'Suspended'
 *        stage: 'Rejected'
 *        subStage: 'Technical'
 *        individualsDirectlyServed: 0.0
 *        span: 0.0
 *        latitude: -2.42056
 *        longitude: 28.9662
 *
 * /bridges/search:
 *  get:
 *    description: Returns a list of bridges
 *    summary: Searches through the list of all bridges
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
 *                - id: 23243222
 *                  name: 'Buzi'
 *                  type: 'Suspended'
 *                  stage: 'Rejected'
 *                  subStage: 'Technical'
 *                  individualsDirectlyServed: 0
 *                  span: 0.0
 *                  latitude: -2.42056
 *                  longitude: 28.9662
 *      500:
 *        $ref: '#/components/responses/InternalSeverError'
 */
route.post('/search', async (req, res) => {
  const search = req.body.search.toLowerCase();
  try {
    const bridges = await db('bridges')
      .select('*')
      .whereRaw(`LOWER(name) LIKE ?`, [`%${search}%`]);
    res.status(200).json(bridges);
  } catch (err) {
    res.status(500).json(err.message);
  }

  // Bridges.find()
  //   .then((bridges) => {
  //     res.status(200).json(bridges);
  //   })
  //   .catch((err) => {
  //     res.status(500).json(err.message);
  //   });
});

/**
 * @swagger
 *
 * /bridges/add:
 *  post:
 *    summary: Add new bridge
 *    tags:
 *      - bridge
 *    requestBody:
 *      description: Data require to add a new bridge
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Bridges'
 *    responses:
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 *      201:
 *        description: Added bridge site object.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                - id: 23243222
 *                  name: 'Buzi'
 *                  type: 'Suspended'
 *                  stage: 'Rejected'
 *                  subStage: 'Technical'
 *                  individualsDirectlyServed: 0
 *                  span: 0.0
 *                  latitude: -2.42056
 *                  longitude: 28.9662
 */
route.post('/add', validateValues, authRequired, async (req, res) => {
  const body = req.body;
  try {
    const newBridge = await Bridges.add(body);
    res.status(201).json(newBridge);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *      bridgeId:
 *        name: id
 *        in: path
 *        description: ID of the bridge to return
 *        required: true
 *        example: 1014107
 *        schema:
 *          type: number
 *
 * /bridges/{id}:
 *  get:
 *    description: Find bridge by ID
 *    summary: Returns a single bridge
 *    tags:
 *      - bridge
 *    parameters:
 *      - $ref: '#/components/parameters/bridgeId'
 *    responses:
 *      200:
 *        description: A bridge object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bridges'
 *      404:
 *        description: 'Bridge not found'
 */

route.get('/:id', validateId, (req, res) => {
  const id = req.params.id;
  Bridges.findById(id)
    .then((id) => {
      res.status(200).json(id);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});
/**
 * @swagger
 * components:
 *  parameters:
 *      bridgeId:
 *        name: id
 *        in: path
 *        description: ID of the bridge to return
 *        required: true
 *        example: 1014107
 *        schema:
 *          type: number
 *
 * /bridges/{id}:
 *  patch:
 *    description: Edit bridge by ID
 *    summary: Returns updated bridge
 *    tags:
 *      - bridge
 *    parameters:
 *      - $ref: '#/components/parameters/bridgeId'
 *    requestBody:
 *      description: Data require to add a new bridge
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Bridges'
 *    responses:
 *      200:
 *        description: Message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                - id: 23243222
 *                  name: 'Buzi'
 *                  type: 'Suspended'
 *                  stage: 'Rejected'
 *                  subStage: 'Technical'
 *                  individualsDirectlyServed: 0
 *                  span: 0.0
 *                  latitude: -2.42056
 *                  longitude: 28.9662
 *      404:
 *        description: 'Bridge not found'
 */
route.patch('/:id', validateId, authRequired, async (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  try {
    const editBridge = await Bridges.update(id, changes);
    if (!editBridge) res.status(404).json({ message: 'ID not found' });
    res.status(201).json(editBridge[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *      bridgeId:
 *        name: id
 *        in: path
 *        description: ID of the bridge to return
 *        required: true
 *        example: 1014107
 *        schema:
 *          type: number
 *
 * /bridges/{id}:
 *  delete:
 *    description: Delete bridge by ID
 *    summary: Returns a message
 *    tags:
 *      - bridge
 *    parameters:
 *      - $ref: '#/components/parameters/bridgeId'
 *    responses:
 *      200:
 *        description: Message
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Bridge deleted successfully.
 *      404:
 *        description: 'Bridge not found'
 */
route.delete('/:id', validateId, authRequired, (req, res) => {
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
