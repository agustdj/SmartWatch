// const dotenv = require("dotenv");
// dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chat = async (req, res) => {
  try {
    console.log("key: ", process.env.GEMINI_API_KEY);
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    res.json({
      reply: response.text(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
