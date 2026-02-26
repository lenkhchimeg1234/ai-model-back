const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();


const getImageAnalysis = require("./image-analysis");
const getImageCreator = require("./imagecreator");
const getTextGenerator = require("./textgeneration");
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.post("/analyze-image", upload.single("image"), getImageAnalysis);
app.post("/create-image", getImageCreator);
app.post("/generate-text", getTextGenerator);
app.post("/Chat-Bot", ChatBot);

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the Image Analysis API" });
// });

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
