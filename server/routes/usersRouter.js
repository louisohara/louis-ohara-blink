const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");
const authenticate = require("../middleware/authenticate");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUser);
router.post("/", usersController.addUser);
router.put("/:id", usersController.editUser);
router.get("/:id/posts", usersController.getUserPosts);
router.get("/:id/friends", usersController.getUserFriends);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
