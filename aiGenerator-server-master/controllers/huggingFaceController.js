const { HfInference } = require('@huggingface/inference');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');

dotenv.config();

const inference = new HfInference(process.env.HUGGINGFACE_API_TOKEN);
const streamPipeline = promisify(pipeline);

// Controller to generate an image caption
exports.captionController = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);
    
    const imagePath = './image.jpg';
    await streamPipeline(response.body, fs.createWriteStream(imagePath));

    const result = await inference.imageToText({
      model: 'nlpconnect/vit-gpt2-image-captioning',
      inputs: fs.createReadStream(imagePath),
    });

    res.status(200).json({ caption: result.generated_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Controller to summarize text
exports.summaryController = async (req, res) => {
  console.log("Test1");
  try {
    const { text } = req.body;
    console.log("Text: ", text);
    const result = await inference.textGeneration({
      model: 'facebook/bart-large-cnn',
      inputs: text,
      parameters: { max_new_tokens: 100, do_sample: false },
    });
    console.log("Result: ", result)
    // res.status(200).json({ summary: result.generated_text });
    res.status(200).json({ summary: "result.generated_text" });
  } catch (err) {
    console.log("Test2");
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Controller to generate a detailed paragraph
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const result = await inference.textGeneration({
      model: 'gpt2',
      inputs: `Write a detailed paragraph:\n${text}`,
      parameters: { max_new_tokens: 100, temperature: 0.7 },
    });

    res.status(200).json({ paragraph: result.generated_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
