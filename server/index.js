const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken"); //AUTH MIDDLEWARE
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const friendsRouter = require("./routes/friendsRouter");
const authRouter = require("./routes/authRouter");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/friends", friendsRouter);

// //AUTH MIDDLEWARE
// app.get("/api/", authorize, (req, res) => {
//     res.json(req.decoded);
//   });

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
