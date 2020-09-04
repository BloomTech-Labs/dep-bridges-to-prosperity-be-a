const request = require('supertest');
// Full app so we can test the 404
const db = require('../../data/db-config');

const server = require('../../api/app.js');

beforeAll(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

describe('index router endpoints', () => {
  beforeAll(() => {});

  describe('GET /', () => {
    it('should return json with api:up', async () => {
      const res = await request(server).get('/');

      expect(res.status).toBe(200);
      expect(res.body.api).toBe('up');
    });

    it('should return 404 for /ping', async () => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {});
      const res = await request(server).get('/ping');

      expect(res.status).toBe(404);
    });
  });
});
