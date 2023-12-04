const express = require("express").Router();
const knex = require("knex")(require("../knexfile"));

const getAllFriends = async (_req, res) => {
  try {
    const friends = await knex("friends").select("*");
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving friends: ${error}` });
  }
};

const addFriend = async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    const newItem = { user_id, friend_id };

    await knex("friends").insert(newItem);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: `Error adding friend: ${error}` });
  }
};

const viewFriends = async (req, res) => {
  try {
    const connectedFriends = await knex("friends").join(
      "users",
      "users.id",
      "friends.friend_id"
    );

    if (!connectedFriends) {
      return res.status(404).json({
        message: `Friends belonging to a user with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(connectedFriends);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving Friends belonging to that user: ${error}`,
    });
  }
};

const deleteFriend = async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    const result = await knex("friends")
      .where({ user_id: user_id, friend_id: friend_id })
      .del();
    if (result === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${user_id} not found` });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: `Error deleting user: ${error}` });
  }
};

module.exports = { getAllFriends, addFriend, viewFriends, deleteFriend };
