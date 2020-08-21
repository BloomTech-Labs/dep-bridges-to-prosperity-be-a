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
//returns all bridges with all values
async function find() {
  let bridges = await db('bridges');

  const newBridges = await bridges.map(async (bridge) => {
    const villageList = await testFunc(bridge.id);
    const bridgeObj = { ...bridge, communityServed: villageList };

    //  return bridgeObj;
    // console.log('Bridge OBJ-->', bridgeObj);
  });
  //the bridge obj is logging what we want but when we return, its still an unresolved Promise
  //console.log('New Bridges', test);
  //still a promise
  return newBridges;
}
//from testFunc(communities served)
// use the returned array(communities served) -> bridges object

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
