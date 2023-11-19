const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUser);
router.post("/", usersController.addUser);
router.put("/:id", usersController.editUser);
router.get("/:id/posts", usersController.getUserPosts);
router.get("/:id/friends", usersController.getUserFriends);

module.exports = router;
