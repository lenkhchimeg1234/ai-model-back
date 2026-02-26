// aimodelbackend/chatbot/index.js

const client = require("../huggininface-inference");

const ChatBot = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message required",
    });
  }

  try {
    const chatCompletion = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = chatCompletion.choices[0].message.content;

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "ChatBot failed",
    });
  }
};

module.exports = ChatBot;
