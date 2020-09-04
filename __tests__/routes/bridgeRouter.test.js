const Bridges = require('../../api/bridges/bridgeModal');
const db = require('../../data/db-config');
const data = require('../dummyData');

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

test('POST / add bridge to database', async () => {
  const newBridge = { ...data[0], project_code: '32323323' };
  delete newBridge.id;

  const bridges = await Bridges.add(newBridge);
  expect(bridges.project_code).toBe('32323323');
});

test('GET / get all bridges from database', async () => {
  const bridges = await Bridges.find();
  delete bridges.communities_served;

  expect(bridges).toHaveLength(5);
});

test('GET / find bridge by id from database', async () => {
  const bridges = await Bridges.findById(1);
  delete bridges.communities_served;
  expect(bridges).toMatchObject(data[0]);
});

test('PATCH / Update bridge', async () => {
  const bridges = await Bridges.update(1, { name: 'TEST' });

  delete bridges.communities_served;
  expect(bridges[0].name).toBe('TEST');
});
test('DELETE / Delete bridge', async () => {
  const bridges = await Bridges.remove(1);

  delete bridges.communities_served;
  expect(bridges).toBe(1);
});
