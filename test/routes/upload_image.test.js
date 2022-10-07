const request = require('supertest');

const path = require('path');
const imageTest = `${path.join(__dirname, 'images', 'test.png')}`;

const app = require('../../src/app');
const MAIN_ROUTE = '/image';

let nameImage;

test('Deve fazer o upload da image para o servidor', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .set('Content-Type', 'multipart/form-data')
    .attach('image', imageTest)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();

      nameImage = res.body.filename;
    });
});

test('Deve buscar uma imagem', () => {
  return request(app)
    .get(`/files/${nameImage}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Deve remove uma imagem', () => {
  request(app)
    .delete(`${MAIN_ROUTE}/${nameImage}`)
    .then((res) => {
      expect(res.status).toBe(201);
    });
});
