const express = require("express").Router();
const knex = require("knex")(require("../knexfile"));

const getAllPosts = async (_req, res) => {
  try {
    const posts = await knex("posts").select("*");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving posts: ${error}` });
  }
};
const getPost = async (req, res) => {
  try {
    const post = await knex("posts").where({ id: req.params.id }).first();
    if (!post) {
      return res
        .status(404)
        .json({ message: `Post with ID ${req.params.id} not found` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving user: ${error}` });
  }
};
const addPost = async (req, res) => {
  const { author_id, duration, content } = req.body;
  try {
    const newItem = { author_id, duration, content };

    const [id] = await knex("posts").insert(newItem).returning("id");
    const insertedItem = await knex("posts").where({ id }).first();
    res.status(201).json(insertedItem);
  } catch (error) {
    res.status(500).json({ message: `Error adding post: ${error}` });
  }
};
const deletePost = async (req, res) => {
  try {
    const result = await knex("posts").where({ id: req.params.id }).del();
    if (result === 0) {
      return res.status(404).json({ message: `Post with ID ${id} not found` });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: `Error deleting post: ${error}` });
  }
};
const editPost = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await knex("posts").where({ id }).update(updates);
    if (result === 0) {
      return res.status(404).json({ message: `Post with ID ${id} not found` });
    }
    const editSinglePost = await knex("posts").where({ id }).first();
    res.status(200).json(editSinglePost);
  } catch (error) {
    res.status(500).json({ message: `Error editing post: ${error}` });
  }
};

const getPostComments = async (req, res) => {
  const { id } = req.params;

  try {
    const userCommentsOnPostData = await knex("comments")
      .join("users", "users.id", "comments.author_id")
      .where({ post_id: id });
    if (!userCommentsOnPostData) {
      return res.status(404).json({
        message: `Comments belonging to a post with ID ${req.params.id} not found`,
      });
    }
    const userCommentsOnPostDataReduced = userCommentsOnPostData.map(
      (comment) => {
        const condensed = {
          id: comment.id,
          post_id: comment.post_id,
          author_id: comment.author_id,
          avatar_url: comment.avatar_url,
          comment: comment.comment,
          first_name: comment.first_name,
          surname: comment.surname,
          created_at: comment.created_at,
        };
        return condensed;
      }
    );
    res.status(200).json(userCommentsOnPostDataReduced);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving comments belonging to that post: ${error}`,
    });
  }
};

module.exports = {
  getAllPosts,
  getPost,
  addPost,
  deletePost,
  editPost,
  getPostComments,
};
