const express = require("express");
const router = express.Router();

const {
  textCompletion,
  imageGeneration,
  imageGenerationEdits,
} = require("./controllers");

router.get("/text-completion/:text", textCompletion);
router.get("/image-generation/:text", imageGeneration);
router.get("/image-generation-edits", imageGenerationEdits);

module.exports = router;
