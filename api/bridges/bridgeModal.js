const db = require('../../data/db-config');
const { test } = require('../../config/knexfile');
module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  testFunc,
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

//returns object array of communities served
function testFunc(bridge_id) {
  return db('communities_served as c')
    .where({ bridge_id })
    .join('villages as v', 'c.village_id', 'v.id');
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
    .where('co.bridge_id', id);
  return { ...bridge, communitiesServed };
}

//updates bridge using given id
async function update(id, changes) {
  return await db('bridges').where({ id }).update(changes).returning('*');
}

//removes bridge using given id
function remove(id) {
  return db('bridges').where({ id }).del();
}
