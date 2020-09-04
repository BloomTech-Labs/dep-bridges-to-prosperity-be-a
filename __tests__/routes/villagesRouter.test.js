const Villages = require('../../api/villages/villageModel');
const db = require('../../data/db-config');
const data = require('../villageDummyData');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

test('POST / add village to database', async () => {
  const newVillage = { ...data[0], vill_id: 1234, name: 'TEST_VILL' };

  const villages = await Villages.add(newVillage);
  expect(villages.vill_id).toBe(1234);
});

test('PATCH / Update village', async () => {
  const villages = await Villages.update(1, { name: 'TEST' });

  expect(villages[0].name).toBe('TEST');
});
test('DELETE / Delete village', async () => {
  const villages = await Villages.remove(1);

  expect(villages).toBe(1);
});
