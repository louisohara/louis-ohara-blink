const express = require("express");
const router = express.Router();
const postsController = require("../controller/postsController");

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPost);
router.post("/", postsController.addPost);
router.put("/:id", postsController.editPost);
router.delete("/:id", postsController.deletePost);
router.get("/:id/comments", postsController.getPostComments);

module.exports = router;
