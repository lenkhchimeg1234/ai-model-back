const client = require("../huggininface-inference");

const getImageAnalysis = async (req, res) => {
  console.log("file info:", {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });

  try {
    const base64Image = req.file.buffer.toString("base64");
    console.log("base64Image:", base64Image);

    const chatCompletion = await client.chatCompletion({
      model: "zai-org/GLM-4.6V-Flash:novita",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in one sentence.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${req.file.mimetype};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });
    console.log("chatCompletion:", chatCompletion);

    console.log(chatCompletion.choices[0].message);
    res.json({
      success: true,
      analysis: chatCompletion.choices[0].message.content,
      message: chatCompletion.choices[0].message,
    });
  } catch (err) {
    console.log("error:", err);

    res.status(500).json({
      success: false,
      error: err.message || "Image analysis failed",
    });
  }
};

module.exports = getImageAnalysis;
