const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const friendsRouter = require("./routes/friendsRouter");

app.use(express.json());
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/friends", friendsRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
