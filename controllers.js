const openAi = require("openai");
const axios = require("axios");
const fs = require("fs");
const config = require('./config/config');

const textCompletion = async (req, res) => {
  const text = req.params.text;
  try {
    let data = JSON.stringify({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 2048,
      temperature: 0,
      n: 1,
    });

    let config = {
      method: "post",
      url: "https://api.openai.com/v1/completions",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        res.status(400).json({ success: false, error });
      });
    return res.json(response);
  } catch (e) {
    res.status(500).json({ error: e.errors });
  }
};

const imageGeneration = async (req, res) => {
  const text = req.params.text;
  try {
    let data = JSON.stringify({
      prompt: text,
      n: 5,
      size: "1024x1024",
      response_format: "url",
    });

    let config = {
      method: "post",
      url: "https://api.openai.com/v1/images/generations",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        res.status(400).json({ success: false, error });
      });
    return res.json(response);
  } catch (e) {
    res.status(500).json({ error: e.errors });
  }
};

const imageGenerationEdits = async (req, res) => {
  const { image, promptText, maskImage } = req.body;
  console.log(image, promptText);

  try {
    let data = JSON.stringify({
      image: fs.createReadStream(image),
      mask: fs.createReadStream(maskImage),
      prompt: promptText,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    let config = {
      method: "post",
      url: "https://api.openai.com/v1/images/edits",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        res.status(400).json({ success: false, error });
      });
    return res.json(response);
  } catch (e) {
    res.status(500).json({ error: e.errors });
  }
};

module.exports = {
  textCompletion,
  imageGeneration,
  imageGenerationEdits,
};
