/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const postsSeed = require("../seed-data/posts");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();
  await knex("posts").insert(postsSeed);
};
