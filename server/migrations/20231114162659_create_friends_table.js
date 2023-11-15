/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("friends", (table) => {
    // table.increments("id").primary();
    table.integer("friend_id").unsigned();
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .foreign("friend_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    // table.timestamp("created_at").defaultTo(knex.fn.now());
    // table
    //   .timestamp("updated_at")
    //   .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("friends");
};
