/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('financials', (t) => {
    t.increments('id').primary();
    t.integer('clientId').notNull();
    t.string('client').notNull();
    t.string('date').notNull();
    t.double('quantity', 15, 2).notNull();
    t.double('totalValue', 15, 2).notNull();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('financials');
};
