/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('budgets', (t) => {
    t.increments('id').primary();
    t.string('client').notNull();
    t.string('packageName').notNull();
    t.string('date').notNull();
    t.string('budgetValidity').notNull();
    t.string('budgetStatus').notNull();
    t.string('formOfPayment').notNull();
    t.string('comments').notNull();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return Promise.all([knex.schema.dropTable('budgets')]);
};
