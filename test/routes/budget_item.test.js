const request = require('supertest');

const app = require('../../src/app');
const MAIN_ROUTE = '/budget_item';

let budgetId;

beforeAll(async () => {
  const res = await app.db('budgets').insert({
    client: 'Client Item Budget #2',
    packageName: 'Package Name #2',
    date: '10/09/2022',
    budgetValidity: '01',
    budgetStatus: 'Ativo',
    formOfPayment: 'Cartão de Crédito',
    comments: 'Comments #2',
  });

  budgetId = res[0];
});

test('Deve inserir um item de orçamento', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      budgetId,
      quantity: 25,
      service: 'Banner',
      itemDetail: 'Banner ItemD',
      unitaryValue: 32.98,
      discount: 5,
      subTotal: 783.2749999999999,
      totalValue: 824.4999999999999,
    })
    .then(async (res) => {
      expect(res.status).toBe(200);

      const budgetItem = await app
        .db('budgets_items')
        .where({ id: res.body[0] })
        .first();

      expect(budgetItem.itemDetail).toBe('Banner ItemD');
      expect(budgetItem.service).toBe('Banner');
      expect(budgetItem.budgetId).toBe(budgetId);
      expect(budgetItem.totalValue).toBe(824.4999999999999);
    });
});

test('Deve listar os budget item', () => {
  return request(app)
    .get(MAIN_ROUTE)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve buscar um budget item por id', async () => {
  const result = await app.db('budgets_items').insert({
    budgetId,
    quantity: 25,
    service: 'Banner Find',
    itemDetail: 'Banner FindI',
    unitaryValue: 32.98,
    discount: 5,
    subTotal: 783.2749999999999,
    totalValue: 824.4999999999999,
  });

  return request(app)
    .get(`${MAIN_ROUTE}/${result[0]}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.service).toBe('Banner Find');
      expect(res.body.itemDetail).toBe('Banner FindI');
    });
});

test('Deve atualizar um budget item', async () => {
  const result = await app.db('budgets_items').insert({
    budgetId,
    quantity: 25,
    service: 'Banner U',
    itemDetail: 'Banner UDI',
    unitaryValue: 32.98,
    discount: 5,
    subTotal: 783.2749999999999,
    totalValue: 824.4999999999999,
  });

  return request(app)
    .put(`${MAIN_ROUTE}/${result[0]}`)
    .send({ service: 'Banner Updated' })
    .then(async (res) => {
      expect(res.status).toBe(200);

      const budgetItem = await app
        .db('budgets_items')
        .where({ id: result[0] })
        .first();

      expect(budgetItem.service).toBe('Banner Updated');
    });
});

test('Deve remover um budget item', async () => {
  const result = await app.db('budgets_items').insert({
    budgetId,
    quantity: 25,
    service: 'Banner Remove',
    itemDetail: 'Banner RemoveI',
    unitaryValue: 32.98,
    discount: 5,
    subTotal: 783.2749999999999,
    totalValue: 824.4999999999999,
  });

  return request(app)
    .delete(`${MAIN_ROUTE}/${result[0]}`)
    .then(async (res) => {
      expect(res.status).toBe(204);

      const budgetItem = await app.db('budgets_items').where({ id: result[0] });

      expect(budgetItem.length).toBe(0);
    });
});
