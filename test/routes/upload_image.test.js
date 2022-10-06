const request = require('supertest');

const path = require('path');
const imageTest = `${path.join(__dirname, 'images', 'test.png')}`;

const app = require('../../src/app');
const MAIN_ROUTE = '/upload-image';

test('Deve fazer o upload da image para o servidor', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .set('Content-Type', 'multipart/form-data')
    .attach('image', imageTest)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
    });
});
