const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken"); //AUTH MIDDLEWARE
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const friendsRouter = require("./routes/friendsRouter");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// function authorize(req, res, next) {
//   // STEP 2: Logic for getting the token and
//   // decoding the contents of the token. The
//   // decoded contents should be placed on req.decoded
//   // If the token is not provided, or invalid, then
//   // this function should not continue on to the
//   // end-point and respond with an error status code.
//   const { authorization } = req.headers;

//   const token = authorization.split(" ")[1];
//   jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
//     if (err) {
//       console.log("invalid token");
//       console.error(error);
//       return;
//     } else {
//       req.payload = payload;
//       console.log(req.payload);
//       req.decoded = req.payload.username;
//       console.log(req.decoded);
//       next();
//     }
//   });
// }

// app.use("/api/signup", signupRouter);
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
