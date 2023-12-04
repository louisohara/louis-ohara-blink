const express = require("express");
const router = express.Router();
const FriendsController = require("../controller/friendsController");

router.get("/", FriendsController.getAllFriends);
router.post("/", FriendsController.addFriend);
router.delete("/", FriendsController.deleteFriend);
router.get("/view", FriendsController.viewFriends);
// the last one might be redundant.
module.exports = router;
