/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const friends = require("../seed-data/friends");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("friends").del();
  await knex("friends").insert(friends);
};
