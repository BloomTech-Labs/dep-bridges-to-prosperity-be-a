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

//returns all communities served by a bridge. Using bridge id
async function find() {
  let bridges = await db('bridges');
  return Promise.all(
    bridges.map(async (bridge) => ({
      ...bridge,
      communitiesServed: await db('communities_served as c')
        .where({ 'c.bridge_id': bridge.id })
        .join('villages as v', 'c.village_id', 'v.id'),
    }))
  );
}

//find using filter
function findBy(filter) {
  return db('bridges').where(filter);
}

//returns bridges by id filter. returns the whole object
async function findById(id) {
  const bridge = await db('bridges').where({ id }).first();
  const communitiesServed = await db('communities_served as co')
    .join('villages as v', 'co.village_id', 'v.id')
    .where('co.bridge_id', id)
    .select('v.*');
  return await db('bridges').where({ id }).update(changes).returning('*');
}

function update(id, changes) {
  return db('bridges').where({ id }).update(changes).returning('*');
}

//removes bridge using given id
function remove(id) {
  return db('bridges').where({ id }).del();
}
