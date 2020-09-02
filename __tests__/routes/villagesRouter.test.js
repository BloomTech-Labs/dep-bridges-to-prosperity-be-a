const request = require('supertest');
const express = require('express');
const Villages = require('../../api/villages/villageModel');
const villageRoute = require('../../api/villages/villageRouter');
// const Bridges = require('../../api/bridges/bridgeModal');
// const bridgeRouter = require('../../api/bridges/bridgeRouter');
//cleaner
const server = express();
server.use(express.json());
server.use('/', villageRoute);

const newVillage = {
  vill_id: 22301,
  name: 'New Village',
  prov_id: 5,
  province: 'Amajyepfo',
  dist_id: 22,
  sect_id: 2205,
  sector: 'Kigembe',
  cell_id: 220501,
  status: 'Rural',
  fid: 1842,
};

test('POST /add to be successful', async () => {
  const mock = jest.spyOn(Villages, 'add');
  mock.mockImplementation(() => Promise.resolve(newVillage));
  const res = await request(server).post('/add').send(newVillage);
  expect(res.status).toBe(201);
  //console.log(res.status);
  mock.mockRestore();
});
