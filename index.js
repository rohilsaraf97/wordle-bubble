const PORT = 8000;
const axios = require("axios");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/word", (req, res) => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    params: { count: "5", wordLength: "5" },
    headers: {
      "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data[Math.floor(Math.random() * 4)]);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/check", (req, res) => {
  console.log(req.query.word);
  const guess = req.query.word;
  const options = {
    method: "GET",
    url: `https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`,
    // headers: {
    //   "X-RapidAPI-Host": "twinword-word-graph-dictionary.p.rapidapi.com",
    //   "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    // },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data[0]);
      res.send(true);
    })
    .catch(function (error) {
      // console.log("word does not exist");
      res.send(false);
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
