const db = require('../../data/db-config');
module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};
// adds a bridge
async function add(bridge) {
  const bridgeSite = await db('bridges').insert(bridge, 'id').returning('*');
  return bridgeSite[0];
}
//returns all bridges with all values
function find() {
  return db('bridges');
}
//find using filter
function findBy(filter) {
  return db('bridges').where(filter);
}

//returns bridges by id filter. returns the whole object
function findById(id) {
  return db('bridges').where({ id }).first();
}

//updates bridge using given id
async function update(id, changes) {
  return await db('bridges').where({ id }).update(changes).returning('*');
}

//removes bridge using given id
function remove(id) {
  return db('bridges').where({ id }).del();
}
