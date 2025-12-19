const client = require("../huggininface-inference");

const getTextGenerator = async (req, res) => {
  try {
    const { text } = req.body;

    const chatCompletion = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3.2:novita",
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
    });
    res.json({
      success: true,
      generatedText: chatCompletion.choices[0].message.content,
      message: chatCompletion.choices[0].message,
    });
    console.log(chatCompletion.choices[0].message);
  } catch (err) {
    console.error("Text generation error:", err);

    res.status(500).json({
      success: false,
      error: err.message || "Text generation failed",
    });
  }
};

module.exports = getTextGenerator;
