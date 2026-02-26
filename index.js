const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const getImageAnalysis = require("./image-analysis");
const getImageCreator = require("./imagecreator");
const getTextGenerator = require("./textgeneration");
const ChatBot = require("./chatbot");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/analyze-image", upload.single("image"), getImageAnalysis);
app.post("/create-image", getImageCreator);
app.post("/generate-text", getTextGenerator);
app.post("/Chat-Bot", ChatBot);   // ← ЭНЭГ НЭМНЭ

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});