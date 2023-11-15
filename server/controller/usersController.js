const express = require("express").Router();
const knex = require("knex")(require("../knexfile"));

const getAllUsers = async (_req, res) => {
  try {
    const users = await knex("users").select("*");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving users: ${error}` });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await knex("users").where({ id: req.params.id }).first();
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${req.params.id} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving user: ${error}` });
  }
};

const addUser = async (req, res) => {
  const { first_name, surname, email, password } = req.body;
  try {
    const newUser = { first_name, surname, email, password };

    const [id] = await knex("users").insert(newUser).returning("id");
    const insertedUser = await knex("users").where({ id }).first();
    res.status(201).json(insertedUser);
  } catch (error) {
    res.status(500).json({ message: `Error adding User: ${error}` });
  }
};
const getUserPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await knex("users")
      .join("posts", "posts.author_id", "users.id")
      .where({ author_id: id });
    if (!posts) {
      return res.status(404).json({
        message: `Posts belonging to a user with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving posts belonging to that user: ${error}`,
    });
  }
};
const getUserFriends = async (req, res) => {
  const { id } = req.params;

  try {
    const friendsWithUserData = await knex("users")
      .join("friends", "friends.friend_id", "users.id")
      .where({ user_id: id });
    if (!friendsWithUserData) {
      return res.status(404).json({
        message: `Friends belonging to a user with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(friendsWithUserData);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving friends belonging to that user: ${error}`,
    });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  //   editUser,
  getUserPosts,
  getUserFriends,
};
