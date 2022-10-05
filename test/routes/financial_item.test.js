const request = require('supertest');

const app = require('../../src/app');
const MAIN_ROUTE = '/financial_items';

const findId = async (id) => {
  const res = await app.db('financials_items').where({ id }).first();
  return res;
};

test('Deve adicionar um fechamento itens financeiro para um cliente', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      quantity: 33,
      service: 'teste',
      subTotal: 66.2,
      unitaryValue: 2,
    })
    .then(async (res) => {
      expect(res.status).toBe(200);

      const financial_items = await findId(res.body[0]);

      expect(financial_items.quantity).toBe(33);
      expect(financial_items.service).toBe('teste');
      expect(financial_items.subTotal).toBe(66.2);
      expect(financial_items.unitaryValue).toBe(2);
    });
});

test('Deve retornar todos os fechamento itens financeiros', () => {
  return request(app)
    .get(MAIN_ROUTE)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve buscar um fechamento por id', async () => {
  const financial = await app.db('financials_items').insert({
    quantity: 33,
    service: 'teste id',
    subTotal: 66.2,
    unitaryValue: 2,
  });

  return request(app)
    .get(`${MAIN_ROUTE}/${financial[0]}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.service).toBe('teste id');
    });
});

test('Deve remover um fechamento', async () => {
  const financial_items = await app.db('financials_items').insert({
    quantity: 30,
    service: 'teste remove',
    subTotal: 67.2,
    unitaryValue: 3,
  });

  return request(app)
    .delete(`${MAIN_ROUTE}/${financial_items[0]}`)
    .then(async (res) => {
      expect(res.status).toBe(204);

      const result = await findId(financial_items[0]);
      expect(result).toBeUndefined();
    });
});

test('Deve atualizar um fechamento', async () => {
  const financial_items = await app.db('financials_items').insert({
    quantity: 30,
    service: 'teste up',
    subTotal: 68.2,
    unitaryValue: 7,
  });

  return request(app)
    .put(`${MAIN_ROUTE}/${financial_items[0]}`)
    .send({ service: 'Teste Updated' })
    .then(async (res) => {
      expect(res.status).toBe(200);

      const result = await findId(financial_items[0]);
      expect(result.service).toBe('Teste Updated');
    });
});
