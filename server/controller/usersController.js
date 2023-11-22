const express = require("express");
const router = express.Router();

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
    const newUser = {
      first_name,
      surname,
      email,
      password,
      avatar_url: "/images/profile_image.jpg",
      //GET HELP WITH STATIC IMAGE LINKING
    };

    const [id] = await knex("users").insert(newUser).returning("id");
    const insertedUser = await knex("users").where({ id }).first();
    res.status(201).json(insertedUser);
  } catch (error) {
    res.status(500).json({ message: `Error adding User: ${error}` });
  }
};
const editUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await knex("users").where({ id }).update(updates);
    if (result === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    const editSingleUser = await knex("users").where({ id }).first();
    res.status(200).json(editSingleUser);
  } catch (error) {
    res.status(500).json({ message: `Error editing user: ${error}` });
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
    const postsReduced = posts.map((post) => {
      const condensed = {
        id: post.id,
        first_name: post.first_name,
        surname: post.surname,
        author_id: post.author_id,
        avatar_url: post.avatar_url,
        duration: post.duration,
        expirationTime: post.expirationTime,
        content: post.content,
        created_at: post.created_at,
      };
      return condensed;
    });
    res.status(200).json(postsReduced);
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
    const friendsWithUserDataReduced = friendsWithUserData.map((friend) => {
      const condensed = {
        id: friend.id,
        first_name: friend.first_name,
        surname: friend.surname,
        active: friend.active,
        avatar_url: friend.avatar_url,
        user_id: friend.user_id,
        friend_id: friend.friend_id,
      };
      return condensed;
    });
    res.status(200).json(friendsWithUserDataReduced);
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
  editUser,
  getUserPosts,
  getUserFriends,
};
