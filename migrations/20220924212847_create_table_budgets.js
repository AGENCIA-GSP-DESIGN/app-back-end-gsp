/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('budgets', (t) => {
    t.increments('id').primary();
    t.string('client').notNull();
    t.string('packageName').notNull();
    t.datetime('date', { precision: 6 }).defaultTo(knex.fn.now(6));
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
  Promise.all([knex.schema.dropTable('budgets')]);
};
