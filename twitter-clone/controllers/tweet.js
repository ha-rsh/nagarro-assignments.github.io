const db = require("../config/dbConfig");

module.exports.getTweets = (req, res) => {
  const { userId } = req.params;
  db.query(
    `SELECT u.id as userId, u.avatar as avatar, u.email as email, u.name as name, u.username as username, t.id as tweetId, t.tweet as tweet, t.likeCount as likeCount, t.__createdtime__ as tweetTime, l.isLiked as isLiked FROM twitter.tweets as t INNER JOIN twitter.user as u ON u.id = t.userId LEFT OUTER JOIN twitter.tweetLikes as l on t.id = l.tweetId AND l.userId = "${userId}" ORDER BY t.__createdtime__ DESC` /*LIMIT 10*/
  )
    .then((result) => {
      const tweets = result.data;
      tweets.forEach((tweet) => {
        tweet.tweetTime =
          (new Date().getTime().toString() - tweet.tweetTime) / 1000 / 60 / 60;
        if (tweet.tweetTime >= 24) {
          tweet.tweetTime = Math.floor(tweet.tweetTime / 24) + "d ago";
        } else if (tweet.tweetTime < 1) {
          tweet.tweetTime = "less than 1h ago";
        } else {
          tweet.tweetTime = Math.floor(tweet.tweetTime) + "h ago";
        }
      });
      res.send(tweets);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
};

module.exports.getTrendingTweets = (req, res) => {
  db.query(
    `SELECT u.id as userId, u.avatar as avatar, u.name as name, u.username as username, t.id as tweetId, t.tweet as tweet, t.__createdtime__ as tweetTime FROM twitter.tweets as t INNER JOIN twitter.user as u ON u.id = t.userId ORDER BY t.likeCount DESC LIMIT 5`
  )
    .then((result) => {
      const tweets = result.data;
      tweets.forEach((tweet) => {
        tweet.tweetTime =
          (new Date().getTime().toString() - tweet.tweetTime) / 1000 / 60 / 60;
        if (tweet.tweetTime >= 24) {
          tweet.tweetTime = Math.floor(tweet.tweetTime / 24) + "d ago";
        } else if (tweet.tweetTime < 1) {
          tweet.tweetTime = "less than 1h ago";
        } else {
          tweet.tweetTime = Math.floor(tweet.tweetTime) + "h ago";
        }
      });
      res.send(tweets);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
};

module.exports.addTweet = (req, res) => {
  const { tweet, userId } = req.body;
  if (req.isAuthenticated()) {
    db.insert({
      table: "tweets",
      records: [{ tweet, userId, likeCount: 0 }],
    })
      .then((result) => {
        res.redirect("/home");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  } else {
    res.redirect("/");
  }
};

module.exports.likeTweet = (req, res) => {
  if (req.isAuthenticated()) {
    const { tweetId, userId, isLiked } = req.body;
    db.query(
      `SELECT * FROM twitter.tweetLikes WHERE tweetId = "${tweetId}" and userId = "${userId}"`,
      (err, response) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error");
        } else {
          if (response.data.length == 0) {
            db.insert({
              table: "tweetLikes",
              records: [{ tweetId, userId, isLiked }],
            })
              .then((result) => {
                changeLikeCount(tweetId, isLiked, res);
              })
              .catch((err) => {
                console.log(err);
                res.status(500).send("Error");
              });
          } else {
            db.query(
              `UPDATE twitter.tweetLikes SET isLiked = ${isLiked} WHERE tweetId = "${tweetId}" and userId = "${userId}"`,
              (err, response) => {
                if (err) {
                  console.log(err);
                  res.status(500).send("Error");
                } else {
                  changeLikeCount(tweetId, isLiked, res);
                }
              }
            );
          }
        }
      }
    );
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports.deleteTweet = (req, res) => {
  if (req.isAuthenticated()) {
    const { tweetId, userId } = req.body;
    const currentUserId = req.user.data[0].id;
    if(currentUserId === userId){
      db.delete(
        {
          table: "tweets",
          hashValues: [tweetId],
        },
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error");
          } else {
            res.status(200).send("Success");
          }
        }
      );
    }
    else{
      res.status(401).send("Unauthorized");
    }
  }
  else{
    res.status(401).send("Unauthorized");
  }
};

function changeLikeCount(tweetId, isLiked, res) {
  db.query(
    `UPDATE twitter.tweets SET likeCount = likeCount ${
      isLiked ? "+" : "-"
    } 1 WHERE id = "${tweetId}"`,
    (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      } else {
        res.status(200).send("OK");
      }
    }
  );
}
