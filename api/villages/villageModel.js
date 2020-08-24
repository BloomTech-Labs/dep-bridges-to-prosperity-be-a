const db = require('../../data/db-config');
module.exports = {
  add,
  update,
  remove,
};

//adds a village
// waiting to find out what this returns
async function add(village) {
  const villageSite = await db('villages').insert(village, 'id').returning('*');
  return villageSite[0];
}

async function update(id, changes) {
  return await db('villages').where({ id }).update(changes).returning('*');
}

function remove(id) {
  return db('villages').where({ id }).del();
}
