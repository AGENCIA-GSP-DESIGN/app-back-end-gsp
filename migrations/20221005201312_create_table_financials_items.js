/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('financials_items', (t) => {
    t.increments('id').primary();
    t.integer('clientId').notNull();
    t.string('service').notNull();
    t.string('detail').notNull();
    t.double('quantity', 15, 2);
    t.double('unitaryValue', 15, 2);
    t.double('subTotal', 15, 2);
    t.integer('finacialId', 11)
      .unsigned()
      .references('id')
      .inTable('financials')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable('financials_items');
};
