const { GoogleGenerativeAI } = require("@google/generative-ai");

// 🔐 Check API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY is missing in .env file");
}

// 🔗 Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ⚡ Use fast model (you can switch to gemini-1.5-pro for better quality)
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// 🎯 1. Generate Interview Question
const generateQuestion = async (role) => {
  const questions = {
    "Frontend Developer": [
      "What are React hooks?",
      "Explain virtual DOM",
      "What is useEffect?",
    ],
    "Backend Developer": ["What is REST API?", "Explain middleware in Express"],
  };

  const list = questions[role] || ["Tell me about yourself"];

  return list[Math.floor(Math.random() * list.length)];
};

// 🧠 2. Evaluate Answer
const evaluateAnswer = async (question, answer) => {
  try {
    const prompt = `
You are an expert interviewer.

Question: ${question}
Answer: ${answer}

Evaluate the answer and respond ONLY in valid JSON format:

{
  "score": number (0-10),
  "feedback": "short constructive feedback",
  "better_answer": "improved professional answer"
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // 🧹 Clean response (AI sometimes adds extra text)
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 🔐 Safe JSON parse
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      console.error("❌ JSON parse failed:", parseError.message);
      return {
        score: 0,
        feedback: "Could not evaluate answer properly.",
        better_answer: "",
      };
    }

    return parsed;
  } catch (error) {
    console.error("❌ Error evaluating answer:", error.message);
    return {
      score: 0,
      feedback: "Evaluation failed due to server error.",
      better_answer: "",
    };
  }
};

// 📦 Export functions
module.exports = {
  generateQuestion,
  evaluateAnswer,
};
