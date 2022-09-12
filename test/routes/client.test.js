const request = require('supertest');

const app = require('../../src/app');
const MAIN_ROUTE = '/client';

const email = `${Date.now()}@mail.com`;

const getById = (id) => {
  return app.services.client.findById(id);
};

test('Deve inserir um cliente', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      bestPayDay: '11',
      clientStatus: 'Ativo',
      cnpj: '90.705.515/0001-80',
      corporateName: 'Fake Corporate Name 2',
      cpf: '763.462.660-04',
      customerInformation: 'informação cliente',
      email,
      image: 'https://via.placeholder.com/150',
      name: 'Fake Name #3',
      nameCompany: 'Fake Company',
      phone: '(56)46456-4564',
      typeClient: 'Cliente Final',
      address: 'Endereço Fake 2',
    })
    .then(async (res) => {
      const client = await getById(res.body[0]);

      expect(res.status).toBe(200);
      expect(client[0].email).toBe(email);
    });
});

test('Deve buscar um usuário por id', () => {
  return app
    .db('client')
    .insert({
      bestPayDay: '11',
      clientStatus: 'Ativo',
      cnpj: '90.705.515/0001-80',
      corporateName: 'Fake Corporate Name 2',
      cpf: '763.462.660-04',
      customerInformation: 'informação cliente',
      email: `${Date.now()}@mail.com`,
      image: 'https://via.placeholder.com/150',
      name: 'Fake Find',
      nameCompany: 'Fake Company',
      phone: '(56)46456-4564',
      typeClient: 'Cliente Final',
      address: 'Endereço Fake 6',
    })
    .then((client) =>
      request(app)
        .get(`${MAIN_ROUTE}/${client[0]}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body[0].id).toBe(client[0]);
        })
    );
});

test('Deve buscar todos os clientes', () => {
  return request(app)
    .get(MAIN_ROUTE)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve atualizar um cliente', () => {
  return app
    .db('client')
    .insert({
      bestPayDay: '20',
      clientStatus: 'Ativo',
      cnpj: '90.705.515/0001-80',
      corporateName: 'Fake Corporate Update',
      cpf: '763.462.660-04',
      customerInformation: 'informação cliente',
      email: `${Date.now()}@gmail.com`,
      image: 'https://via.placeholder.com/150',
      name: 'Client DSS',
      nameCompany: 'Company Updated',
      phone: '(56)46456-4564',
      typeClient: 'Cliente Final',
      address: 'Endereço Fake Updated',
    })
    .then(async (client) =>
      request(app)
        .put(`${MAIN_ROUTE}/${client[0]}`)
        .send({ name: 'Client Updated' })
        .then(async (res) => {
          const clientId = await getById(client[0]);

          expect(res.status).toBe(200);
          expect(clientId[0].id).toBe(client[0]);
          expect(clientId[0].name).toBe('Client Updated');
        })
    );
});

test('Deve remover um cliente', () => {
  return app
    .db('client')
    .insert({
      bestPayDay: '11',
      clientStatus: 'Ativo',
      cnpj: '90.705.515/0001-80',
      corporateName: 'Fake Corporate Name 2',
      cpf: '763.462.660-04',
      customerInformation: 'informação cliente',
      email: `${Date.now()}@yahoo.com`,
      image: 'https://via.placeholder.com/150',
      name: 'Fake Find',
      nameCompany: 'Fake Company',
      phone: '(56)46456-4564',
      typeClient: 'Cliente Final',
      address: 'Endereço Fake 6',
    })
    .then((client) => {
      request(app)
        .delete(`${MAIN_ROUTE}/${client[0]}`)
        .then(async (res) => {
          const client = await getById({ id: client[0] });

          expect(res.status).toBe(201);
          expect(client).toBeNull();
        });
    });
});
