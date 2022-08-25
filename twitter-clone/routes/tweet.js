const express = require("express");
const { getTweets, addTweet, likeTweet, getTrendingTweets, deleteTweet } = require("../controllers/tweet");

const router = express.Router();

router.post("/", addTweet);
router.post("/delete", deleteTweet);
router.post("/like", likeTweet);
router.get("/trending", getTrendingTweets);
router.get("/:userId", getTweets);
module.exports = router;
