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
      const client = await getById(res.body);

      expect(res.status).toBe(200);
      expect(client.email).toBe(email);
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
    .then((client) => {
      const clientId = client[0];
      return request(app)
        .get(`${MAIN_ROUTE}/${clientId}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.id).toBe(clientId);
          expect(res.body.name).toBe('Fake Find');
        });
    });
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
    .then(async (client) => {
      const clientId = client[0];
      return request(app)
        .put(`${MAIN_ROUTE}/${clientId}`)
        .send({ name: 'Client Updated' })
        .then(async (res) => {
          const client = await getById(clientId);

          expect(res.status).toBe(200);
          expect(client.id).toBe(clientId);
          expect(client.name).toBe('Client Updated');
        });
    });
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
      const clientId = client[0];
      return request(app)
        .delete(`${MAIN_ROUTE}/${clientId}`)
        .then(async (res) => {
          const client = await getById({ id: clientId });

          expect(res.status).toBe(204);
          expect(client).toBeUndefined();
        });
    });
});

test('Devo validar o campos antes de Salvar', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      id: 0,
      bestPayDay: '',
      clientStatus: '',
      cnpj: '',
      corporateName: '',
      cpf: '',
      customerInformation: '',
      email: `${Date.now()}@mail.com`,
      image: '',
      name: '',
      nameCompany: '',
      phone: '',
      typeClient: '',
      address: '',
    })
    .then(async (res) => {
      expect(res.status).toBe(400);
      expect(res.body.errors).toContain('O Id é obrigatório!');
      expect(res.body.errors).toContain(
        'O campo Melhor dia de Pagamento é obrigatório!'
      );
      expect(res.body.errors).toContain(
        'O campo de Status de Cliente é obrigatório!'
      );
      expect(res.body.errors).toContain('O campo de Cnpj é obrigatório!');
      expect(res.body.errors).toContain(
        'O campo Nome da Empresa é obrigatório!'
      );
      expect(res.body.errors).toContain('O campo de Cpf é obrigatório!');
      expect(res.body.errors).toContain(
        'O campo de Informação de Customer é obrigatório!'
      );
      expect(res.body.errors).toContain('O campo da Imagem é obrigatório!');
      expect(res.body.errors).toContain('O campo de Nome é obrigatório!');
      expect(res.body.errors).toContain(
        'O campo Nome da Companhia é obrigatório!'
      );
      expect(res.body.errors).toContain('O campo de Telefone é obrigatório!');
      expect(res.body.errors).toContain(
        'O campo Tipo de Cliente é obrigatório!'
      );
      expect(res.body.errors).toContain('O campo de Endereço é obrigatório!');
    });
});

test('Não deve inserir um Cliente com o mesmo E-mail', () => {
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
      name: 'Same Email #3',
      nameCompany: 'Fake Company',
      phone: '(56)46456-4564',
      typeClient: 'Cliente Final',
      address: 'Endereço Fake 2',
    })
    .then(async (res) => {
      expect(res.status).toBe(400);
      expect(res.body.errors).toContain(
        'Não pode inserir um Cliente com o mesmo E-mail!'
      );
    });
});
