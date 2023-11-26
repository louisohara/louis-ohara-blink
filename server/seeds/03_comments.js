/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const comments = require("../seed-data/comments");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").del();
  await knex("comments").insert(comments);
};
