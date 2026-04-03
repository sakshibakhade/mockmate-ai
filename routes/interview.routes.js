const express = require("express");
const router = express.Router();

const {
  askQuestion,
  evaluate,
} = require("../controllers/interview.controller");

router.post("/ask-question", askQuestion);
router.post("/evaluate-answer", evaluate);

module.exports = router;
