const client = require("../huggininface-inference");

const getImageCreator = async (req, res) => {
  try {
    const { text } = req.body;

    // Зураг үүсгэх
    const image = await client.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: text,
      parameters: { num_inference_steps: 5 },
    });
    console.log("image", image);
    console.log("Generated image data:", image.data);

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");
    res.json({
      success: true,
      images: `data:image/png;base64,${base64Image}`,
      prompt: text,
    });
  } catch (err) {
    console.error("Image creation error:", err);

    res.status(500).json({
      success: false,
      error: err.message || "Image generation failed",
    });
  }
};

module.exports = getImageCreator;
