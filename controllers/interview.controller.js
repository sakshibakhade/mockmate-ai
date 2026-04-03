const {
  generateQuestion,
  evaluateAnswer,
} = require("../services/gemini.service");

const askQuestion = async (req, res) => {
  try {
    const { role } = req.body;

    const question = await generateQuestion(role);

    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating question" });
  }
};

const evaluate = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const feedback = await evaluateAnswer(question, answer);

    res.json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error evaluating answer" });
  }
};

module.exports = {
  askQuestion,
  evaluate,
};