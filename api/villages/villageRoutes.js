const express = require('express');
const { validateId, validateValues } = require('./villageMiddleware');
const route = express.Router();
const Villages = require('./villageModel');

/**
 * @swagger
 * components:
 *  schemas:
 *    Village:
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
 * /villages/add:
 *  post:
 *    summary: Add new bridge
 *    tags:
 *      - village
 *    requestBody:
 *      description: Data require to add a new bridge
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Village'
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
