const express = require("express");
const router = express.Router();
const axios = require("axios");
const moment = require("moment");
require("dotenv").config();

const baseURL = process.env.NEWS_BASE_URL;

router.get("/", async (req, res) => {
  try {
    const queryParams = req.query;
    const search = queryParams.q || "football";

    const ukSources = [
      "bbc-sport",
      "sky-sports",
      "the-guardian-uk",
      "independent",
      "mirror",
    ].join(",");

    const newsApiQuery = `q=${encodeURIComponent(search)}&sources=${ukSources}&from=${moment()
      .subtract(1, "month")
      .format("YYYY-MM-DD")}&sortBy=publishedAt&language=en&apiKey=${
      process.env.NEWS_API_KEY
    }`;

    const response = await axios.get(`${baseURL}?${newsApiQuery}`);

    if (response.data.status === "ok") {
      const articles = response.data.articles.slice(0, 15);
      res.status(200).json({ status: "ok", articles });
    } else {
      res.status(400).json({ message: "Something went wrong with NewsAPI" });
    }
  } catch (error) {
    console.error("Error fetching news:", error.message);

    res.status(500).json({
      message: "An error occurred while fetching news articles. Please try again later.",
    });
  }
});

module.exports = router;
