const axios = require("axios");

module.exports.getMainPage = (req, res) => {
  if (req.isAuthenticated()) {
    const userData = req.user.data[0];
    axios
      .get(`${process.env.BASE_URL}/tweet/${userData.id}`)
      .then((result) => {
        const tweets = result.data;
        axios.get(`${process.env.BASE_URL}/tweet/trending`)
        .then(trendingResult => {
          const trendingTweets = trendingResult.data;
          res.render("main", {page: req.params.page, tweets, userData, trendingTweets});
        })
        .catch(err => {
          console.log(err);
          res.redirect("/");
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  } else {
    res.redirect("/");
  }
};
