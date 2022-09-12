/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('client', (t) => {
    t.increments('id').primary();
    t.string('bestPayDay').notNull();
    t.string('clientStatus').notNull();
    t.string('cnpj').notNull();
    t.string('corporateName').notNull();
    t.string('cpf').notNull();
    t.string('customerInformation').notNull();
    t.string('email').notNull().unique();
    t.string('image').notNull();
    t.string('name').notNull();
    t.string('nameCompany').notNull();
    t.string('phone').notNull();
    t.string('typeClient').notNull();
    t.string('address').notNull();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('client');
};
