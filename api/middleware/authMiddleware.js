const Bridge = require('../bridges/bridgeModal');

module.exports = {
  validateId,
  validateValues,
};
// middleware to check if id is valid
function validateId(req, res, next) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'Please provide ID' });
  } else {
    Bridge.findById(id)
      .then((bridge) => {
        if (bridge) {
          next();
        } else {
          res.status(404).json({ message: 'Please provide valid ID.' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
}
//middleware to check if values are not empty/NUll
function validateValues(req, res, next) {
  const {
    name,
    type,
    stage,
    subStage,
    individualsDirectlyServed,
    span,
    latitude,
    longitude,
  } = req.body;

  if (
    !name ||
    !type ||
    !stage ||
    !subStage ||
    !individualsDirectlyServed ||
    !span ||
    !latitude ||
    !longitude
  ) {
    res.status(400).json({ message: 'Please fill in all fields' });
  } else {
    next();
  }
}
