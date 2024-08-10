const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

exports.summaryController = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = `Generate Summary of: ${req.body.inputs}`;
    console.log("prompt", prompt);
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            }
          ],
        }
      ],
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.1,
      },
    });
    const response = result.response;
    const text = response.text();
    console.log(text);
    return res.status(200).json(text);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = `Generate a Paragraph on the Topic: ${req.body.inputs}`;
    console.log("prompt", prompt);
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            }
          ],
        }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1,
      },
    });
    const response = result.response;
    const text = response.text();
    console.log(text);
    return res.status(200).json(text);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chat = model.startChat({ history: [] });

    const prompt = `Reply as if you are talking to the user: ${req.body.inputs}`;
    console.log("text", prompt);
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text)
    return res.status(200).json(text);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.jsConverterController = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      tools: [
        {
          codeExecution: {},
        },
      ],
    });
    const prompt = `Generate the Code in Javascript: ${req.body.inputs}`;
    console.log("text", prompt);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
    return res.status(200).json(text);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.scifiImageController = async (req, res) => {
  try {
    const text = req.body.inputs;
    console.log("text", text);
    const result = await getCompletion(text, "generate a scifi image of ${text}");
    console.log(result);
    return res.status(200).json(result);
    // const { text } = req.body;
    // const { data } = await openai.createImage({
    //   prompt: `generate a scifi image of ${text}`,
    //   n: 1,
    //   size: "512x512",
    // });
    // if (data) {
    //   if (data.data[0].url) {
    //     return res.status(200).json(data.data[0].url);
    //   }
    // }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};