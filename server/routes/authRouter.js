const express = require("express");
const router = express.Router();

const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
JWT_KEY = "c9d5abfeb26796f0979acd756bb4a71b12fe4c8dd4dd6556968b8047c316ad0e";

router.post("/register", async (req, res) => {
  const { first_name, surname, email, password } = req.body;

  if (!first_name || !surname || !email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  const hashedPassword = bcrypt.hashSync(password);

  try {
    const newUser = {
      first_name,
      surname,
      email,
      password: hashedPassword,
      avatar_url: "http://localhost:8080/images/profile_image.jpg",
    };

    const [id] = await knex("users").insert(newUser).returning("id");
    const insertedUser = await knex("users").where({ id }).first();
    res.status(201).json(insertedUser);
  } catch (error) {
    res.status(500).json({ message: `Error adding User: ${error}` });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).send("Please enter the required fields");
  }

  const user = await knex("users").where({ email: email }).first();
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    // process.env.JWT_KEY,
    JWT_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
});

module.exports = router;
