/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('budgets_items', (t) => {
    t.increments('id').primary();
    t.double('quantity').notNull();
    t.string('service').notNull();
    t.string('itemDetail').notNull();
    t.double('unitaryValue').notNull();
    t.double('discount').notNull();
    t.double('subTotal').notNull();
    t.double('totalValue').notNull();
    t.integer('budgetId', 11)
      .unsigned()
      .references('id')
      .inTable('budgets')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('budgets_items');
};
