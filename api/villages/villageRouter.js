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
 *        name: 'newVillage'
 *        prov_id: 5
 *        province: 'Amajyepfo'
 *        dist_id: 22
 *        sect_id: 2205
 *        sector: 'Kigmbe'
 *        cell_id: 220501
 *        status: 'Rural'
 *        fid: 1842
 *
 * /villages/add:
 *  post:
 *    summary: Add new village
 *    tags:
 *      - village
 *    requestBody:
 *      description: Data required to add a new village
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Village'
 *    responses:
 *      500:
 *        $ref: '#/components/responses/InternalServerError'
 *      201:
 *        description: Added village site object.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                - id: 1
 *                  name: 'newVillage'
 *                  prov_id: 5
 *                  province: 'Amajyepfo'
 *                  dist_id: 22
 *                  sect_id: 2205
 *                  sector: 'Kigmbe'
 *                  cell_id: 220501
 *                  status: 'Rural'
 *                  fid: 1842
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

/**
 * @swagger
 * components:
 *  parameters:
 *      villageId:
 *        name: id
 *        in: path
 *        description: ID of the village to return
 *        required: true
 *        example: 1
 *        schema:
 *          type: number
 *
 * /villages/{id}:
 *  patch:
 *    description: Edit village by ID
 *    summary: Returns updated village
 *    tags:
 *      - village
 *    parameters:
 *      - $ref: '#/components/parameters/villageId'
 *    requestBody:
 *      description: To edit Village, it's not required to send all unchanged data
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Village'
 *    responses:
 *      200:
 *        description: Message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              example:
 *                - id: 1
 *                  name: 'newVillage'
 *                  prov_id: 5
 *                  province: 'Amajyepfo'
 *                  dist_id: 22
 *                  sect_id: 2205
 *                  sector: 'Kigmbe'
 *                  cell_id: 220501
 *                  status: 'Rural'
 *                  fid: 1842
 *      404:
 *        description: 'Village not found'
 */
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
/**
 * @swagger
 * components:
 *  parameters:
 *      villageId:
 *        name: id
 *        in: path
 *        description: ID of the village to return
 *        required: true
 *        example: 1
 *        schema:
 *          type: number
 *
 * /village/{id}:
 *  delete:
 *    description: Delete village by ID
 *    summary: Returns a message
 *    tags:
 *      - village
 *    parameters:
 *      - $ref: '#/components/parameters/villageId'
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
 *                  example: Village deleted successfully.
 *      404:
 *        description: 'Village not found'
 */
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
