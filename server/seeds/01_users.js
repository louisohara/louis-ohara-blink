/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const usersData = require("../seed-data/users");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert(usersData);
};
