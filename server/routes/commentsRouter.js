const express = require("express");
const router = express.Router();
const commentsController = require("../controller/commentsController");

router.get("/", commentsController.getAllComments);
router.post("/", commentsController.addComment);
router.put("/:id", commentsController.editComment);

module.exports = router;
