const request = require('supertest');

const app = require('../../src/app');
const MAIN_ROUTE = '/budget';

test('Deve inserir um orçamento', async () => {
  const res = await request(app).post(MAIN_ROUTE).send({
    client: 'Client #1',
    packageName: 'Package Name #1',
    date: '01/09/2022',
    budgetValidity: '01',
    budgetStatus: 'Ativo',
    formOfPayment: 'Cartão de Crédito',
    comments: 'Comments #1',
  });

  const budget = await app.db('budgets').where({ id: res.body }).first();

  expect(res.status).toBe(200);
  expect(budget.client).toBe('Client #1');
  expect(budget.date).toBe('01/09/2022');
});

test('Deve listar todos os orçamentos', () => {
  return request(app)
    .get(MAIN_ROUTE)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve encontrar um orçamento por id', async () => {
  const result = await request(app).post(MAIN_ROUTE).send({
    client: 'Client Find',
    packageName: 'Package Name Find',
    date: '02/09/22',
    budgetValidity: '01',
    budgetStatus: 'Ativo',
    formOfPayment: 'Cartão de Crédito',
    comments: 'Comments Find',
  });

  return request(app)
    .get(`${MAIN_ROUTE}/${result.body[0]}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.client).toBe('Client Find');
      expect(res.body.id).toBe(result.body[0]);
    });
});

test('Deve deletar um orçamento', async () => {
  const result = await request(app).post(MAIN_ROUTE).send({
    client: 'Client Delete',
    packageName: 'Package Name Delete',
    date: '02/09/22',
    budgetValidity: '01',
    budgetStatus: 'Ativo',
    formOfPayment: 'Cartão de Crédito',
    comments: 'Comments Delete',
  });

  await app.db('budgets_items').insert({
    budgetId: result.body[0],
    quantity: 25,
    service: 'Banner',
    itemDetail: 'Banner ItemD',
    unitaryValue: 32.98,
    discount: 5,
    subTotal: 783.2749999999999,
    totalValue: 824.4999999999999,
  });

  return request(app)
    .delete(`${MAIN_ROUTE}/${result.body[0]}`)
    .then(async (res) => {
      const budget = await app
        .db('budgets')
        .where({ id: result.body[0] })
        .first();

      const budgetItem = await app
        .db('budgets_items')
        .where({ budgetId: result.body[0] })
        .first();

      expect(res.status).toBe(204);
      expect(budget).toBeUndefined();
      expect(budgetItem).toBeUndefined();
    });
});

test('Deve atualizar um orçamento', async () => {
  const result = await request(app).post(MAIN_ROUTE).send({
    client: 'Client Update',
    packageName: 'Package Name Update',
    date: '02/09/22',
    budgetValidity: '01',
    budgetStatus: 'Ativo',
    formOfPayment: 'Cartão de Crédito',
    comments: 'Comments Update',
  });

  return request(app)
    .put(`${MAIN_ROUTE}/${result.body[0]}`)
    .send({ client: 'Client Update Plus+' })
    .then(async (res) => {
      const budget = await app
        .db('budgets')
        .where({ id: result.body[0] })
        .first();

      expect(res.status).toBe(200);
      expect(budget.client).toBe('Client Update Plus+');
    });
});
