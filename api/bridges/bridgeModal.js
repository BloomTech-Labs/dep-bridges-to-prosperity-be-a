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
function add(bridge) {
  return db('bridges').insert(bridge, 'id');
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
function update(id, changes) {
  return db('bridges').where({ id }).update(changes);
}

//removes bridge using given id
function remove(id) {
  return db('bridges').where({ id }).del();
}
