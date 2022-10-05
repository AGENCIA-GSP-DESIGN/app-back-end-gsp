const request = require('supertest');

const app = require('../../src/app');
const MAIN_ROUTE = '/financial';

const findId = async (id) => {
  const res = await app.db('financials').where({ id }).first();
  return res;
};

test('Deve adicionar um fechamento financeiro para um cliente', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      clientId: 1,
      client: 'Produtos da Terra',
      date: '08/2022',
      quantity: 99.0,
      totalValue: 198.0,
    })
    .then(async (res) => {
      expect(res.status).toBe(200);

      const financial = await findId(res.body[0]);

      expect(financial.client).toBe('Produtos da Terra');
      expect(financial.date).toBe('08/2022');
      expect(financial.quantity).toBe(99);
      expect(financial.totalValue).toBe(198);
    });
});

test('Deve retornar todos os fechamento financeiros', () => {
  return request(app)
    .get(MAIN_ROUTE)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve buscar um fechamento por id', async () => {
  const financial = await app.db('financials').insert({
    clientId: 2,
    client: 'Produtos sem Terra',
    date: '09/2022',
    quantity: 99.3,
    totalValue: 198.4,
  });

  return request(app)
    .get(`${MAIN_ROUTE}/${financial[0]}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.client).toBe('Produtos sem Terra');
    });
});

test('Deve remover um fechamento', async () => {
  const financial = await app.db('financials').insert({
    clientId: 2,
    client: 'Produtos Remove',
    date: '07/2022',
    quantity: 98.3,
    totalValue: 197.4,
  });

  const financialItem = await app.db('financials_items').insert({
    quantity: 33,
    service: 'item remove',
    subTotal: 66.2,
    unitaryValue: 2,
  });

  return request(app)
    .delete(`${MAIN_ROUTE}/${financial[0]}`)
    .then(async (res) => {
      expect(res.status).toBe(204);

      const result = await findId(financial[0]);
      expect(result).toBeUndefined();

      const item = await app
        .db('financials_items')
        .where({ finacialId: financialItem[0] })
        .first();

      expect(item).toBeUndefined();
    });
});

test('Deve atualizar um fechamento', async () => {
  const financial = await app.db('financials').insert({
    clientId: 5,
    client: 'Produtos Up',
    date: '05/2022',
    quantity: 92.3,
    totalValue: 192.4,
  });

  return request(app)
    .put(`${MAIN_ROUTE}/${financial[0]}`)
    .send({ client: 'Produtos Updated' })
    .then(async (res) => {
      expect(res.status).toBe(200);

      const result = await findId(financial[0]);
      expect(result.client).toBe('Produtos Updated');
    });
});
