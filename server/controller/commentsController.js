const express = require("express").Router();
const knex = require("knex")(require("../knexfile"));

const getAllComments = async (_req, res) => {
  try {
    const comments = await knex("comments").select("*");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving comments: ${error}` });
  }
};

const addComment = async (req, res) => {
  const { post_id, author_id, comment } = req.body;
  try {
    const newItem = { post_id, author_id, comment };

    const [id] = await knex("comments").insert(newItem).returning("id");
    const insertedItem = await knex("comments").where({ id }).first();
    res.status(201).json(insertedItem);
  } catch (error) {
    res.status(500).json({ message: `Error adding comment: ${error}` });
  }
};
const editComment = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await knex("comments").where({ id }).update(updates);
    if (result === 0) {
      return res
        .status(404)
        .json({ message: `Comment with ID ${id} not found` });
    }
    const editedComment = await knex("comments").where({ id }).first();
    res.status(200).json(editedComment);
  } catch (error) {
    res.status(500).json({ message: `Error editing comment: ${error}` });
  }
};
const deleteComment = async (req, res) => {
  try {
    const result = await knex("comments").where({ id: req.params.id }).del();
    if (result === 0) {
      return res
        .status(404)
        .json({ message: `Comment with ID ${id} not found` });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: `Error deleting comment: ${error}` });
  }
};
module.exports = { getAllComments, addComment, editComment, deleteComment };
