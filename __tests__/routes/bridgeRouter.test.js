// const request = require('supertest');
// const express = require('express');
const Bridges = require('../../api/bridges/bridgeModal');
// const bridgeRouter = require('../../api/bridges/bridgeRouter');
const db = require('../../data/db-config');

// const server = express();
// const server = require('../../api/app');

// server.use(express.json());

// jest.mock('../../api/bridges/bridgeModal');
// // mock the auth middleware completely
// jest.mock('../../api/middleware/authRequired', () =>
//   jest.fn((req, res, next) => next())
// );

beforeAll(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

const data = [
  {
    id: 1,
    project_code: '1014107',
    name: 'Buzi',
    type: 'Suspended',
    stage: 'Rejected',
    sub_stage: 'Technical',
    individuals_directly_served: 0.0,
    span: 0.0,
    latitude: -2.42056,
    longitude: 28.9662,
    country: 'Rwanda',
    province: 'Western Province',
    sector: 'Giheke',
    cell: 'Gakomeye',
    form_name: 'Project Assessment - 2018.10.29',
    case_safe_id_form: 'a1if1000002e51bAAA',
    bridge_opportunity_id: '006f100000d1fk1',
    communities_served: [],
  },
  {
    id: 2,
    project_code: '1014106',
    name: 'Kamigisha',
    type: 'Suspended',
    stage: 'Rejected',
    sub_stage: 'Technical',
    individuals_directly_served: 0.0,
    span: 0.0,
    latitude: -2.42486,
    longitude: 28.95726,
    country: 'Rwanda',
    province: 'Western Province',
    sector: 'Giheke',
    cell: 'Gakomeye',
    form_name: 'Project Assessment - 2018.10.29',
    case_safe_id_form: 'a1if1000002e51WAAQ',
    bridge_opportunity_id: '006f100000d1fjw',
    communities_served: [],
  },
  {
    id: 3,
    project_code: '1007651',
    name: 'Gipfundo',
    type: 'Suspended',
    stage: 'Rejected',
    sub_stage: 'Technical',
    individuals_directly_served: 0.0,
    span: 8.0,
    latitude: -1.72053,
    longitude: 30.08124,
    country: 'Rwanda',
    province: 'Northern Province',
    sector: 'Buyoga',
    cell: 'Gahororo-Gipfundo',
    form_name: 'Project Assessment - 2018.8.11',
    case_safe_id_form: 'a1if10000025nz8AAA',
    bridge_opportunity_id: '006f100000a86I3',
    communities_served: [],
  },
  {
    id: 4,
    project_code: '1012493',
    name: 'Nyarubande',
    type: 'Other',
    stage: 'Rejected',
    sub_stage: 'NaN',
    individuals_directly_served: 0.0,
    span: 0.0,
    latitude: -1.65595,
    longitude: 30.07884,
    country: 'Rwanda',
    province: 'Northern Province',
    sector: 'Kageyo',
    cell: 'Kabuga/gatobotobo',
    form_name: 'Project Assessment - 2018.10.29',
    case_safe_id_form: 'a1if10000025nzDAAQ',
    bridge_opportunity_id: '006f100000cPpL8',
    communities_served: [],
  },
  {
    id: 5,
    project_code: '1014318',
    name: 'Kirwa',
    type: 'Suspended',
    stage: 'Identidied',
    sub_stage: 'Requested',
    individuals_directly_served: 0.0,
    span: 0.0,
    latitude: -1.870868,
    longitude: 29.877686,
    country: 'Rwanda',
    province: 'Southern Province',
    sector: 'Kayenzi',
    cell: 'Kirwa',
    form_name: 'Project Assessment - 2018.11.1',
    case_safe_id_form: 'a1if1000002gMwRAAU',
    bridge_opportunity_id: '006f100000eescb',
    communities_served: [],
  },
];

test('GET / get all bridges from database', async () => {
  const bridges = await Bridges.find();

  expect(bridges).toHaveLength(5);
});

test('GET / get all bridges from database', async () => {
  const bridges = await Bridges.findById(1);

  expect(bridges).toMatchObject(data[0]);
});
