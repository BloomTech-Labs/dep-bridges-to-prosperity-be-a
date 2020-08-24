const db = require('../../data/db-config');

module.exports = { validateId, validateValues };
//middleware to check if the id is valid
async function validateId(req, res, next) {
  const { id } = req.params;

  const [village] = await db('villages').where({ id });

  if (village) {
    next();
  } else {
    res.status(404).json({ message: 'Please provide valid id' });
  }
}

//middleware to check if values are not empty
function validateValues(req, res, next) {
  const {
    vill_id,
    name,
    prov_id,
    province,
    dist_id,
    sect_id,
    sector,
    cell_id,
    status,
    fid,
  } = req.body;
  if (
    !vill_id ||
    !name ||
    !prov_id ||
    !province ||
    !dist_id ||
    !sect_id ||
    !sector ||
    !cell_id ||
    !status ||
    !fid
  ) {
    res.status(400).json({ message: 'Please fill in all fields' });
  } else {
    next();
  }
}
