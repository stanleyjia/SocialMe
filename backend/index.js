const express = require("express");
const dotenv = require("dotenv");
const needle = require("needle");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const language = require("@google-cloud/language");

const client = new language.LanguageServiceClient();

dotenv.config();

//Get Bearer Token from .env
const BearerToken = process.env.BEARER_TOKEN;
// console.log(process.env.BEARER_TOKEN)

// const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Get Tweets from Twitter API
const getUserData = async (username) => {
  const endpointUrl = `https://api.twitter.com/2/users/by/username/${username}`;
  const response = await needle(
    "get",
    endpointUrl,
    {},
    {
      headers: {
        "User-Agent": "v2RecentSearchJS",
        authorization: `Bearer ${BearerToken}`,
      },
    }
  );
  if (response.statusCode !== 200) {
    if (response.statusCode === 403) {
      res.status(403).send(response.body);
    } else {
      throw new Error(response.body.error.message);
    }
  }
  if (response.body) return response.body.data;
  else throw new Error("Unsuccessful Request");
};

//Get Tweets from Twitter API
const getUserTweets = async (userId, num = 100) => {
  if (num > 100) {
    throw new Error("Can load maximum of 100 tweets in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/tweets`;
  const params = {
    max_results: num,
  };
  const response = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${BearerToken}`,
    },
  });
  if (response.statusCode !== 200) {
    if (response.statusCode === 403) {
      res.status(403).send(response.body);
    } else {
      throw new Error(response.body.error.message);
    }
  }
  if (response.body) return response.body.data;
  else throw new Error("Unsuccessful Request");
};

const getUserFollowers = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/followers`;
  const params = {
    max_results: num,
  };
  const response = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${BearerToken}`,
    },
  });
  if (response.statusCode !== 200) {
    if (response.statusCode === 403) {
      res.status(403).send(response.body);
    } else {
      throw new Error(response.body.error.message);
    }
  }
  if (response.body) return response.body.data;
  else throw new Error("Unsuccessful Request");
};

const getUserFollowing = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/following`;
  const params = {
    max_results: num,
  };
  const response = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${BearerToken}`,
    },
  });
  if (response.statusCode !== 200) {
    if (response.statusCode === 403) {
      res.status(403).send(response.body);
    } else {
      throw new Error(response.body.error.message);
    }
  }
  if (response.body) return response.body.data;
  else throw new Error("Unsuccessful Request");
};

const getUserMentions = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/mentions`;
  const params = {
    max_results: num,
  };
  const response = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${BearerToken}`,
    },
  });
  if (response.statusCode !== 200) {
    if (response.statusCode === 403) {
      res.status(403).send(response.body);
    } else {
      throw new Error(response.body.error.message);
    }
  }
  if (response.body) return response.body.data;
  else throw new Error("Unsuccessful Request");
};

const getUserLikedTweets = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/liked_tweets`;
  const params = {
    max_results: num,
  };
  const response = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${BearerToken}`,
    },
  });
  if (response.statusCode !== 200) {
    if (response.statusCode === 403) {
      res.status(403).send(response.body);
    } else {
      throw new Error(response.body.error.message);
    }
  }
  if (response.body) return response.body.data;
  else throw new Error("Unsuccessful Request");
};

const getUsersWhoLikedTweet = async (tweetId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 users in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/tweets/${tweetId}/liking_users`;
  const params = {
    max_results: num,
  };
  const response = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${BearerToken}`,
    },
  });
  if (response.statusCode !== 200) {
    if (response.statusCode === 403) {
      res.status(403).send(response.body);
    } else {
      throw new Error(response.body.error.message);
    }
  }
  if (response.body) return response.body.data;
  else throw new Error("Unsuccessful Request");
};

async function run() {
  const { id, name, username } = await getUserData("elonMusk");
  const tweets = await getUserTweets(id, 5);
  const followers = await getUserFollowers(id, 5);
  const following = await getUserFollowing(id, 5);

  const mentions = await getUserMentions(id, 5);
  const likedTweets = await getUserLikedTweets(id, 5);

  const sampleTweetId = likedTweets[0].id;
  const likedUsers = await getUsersWhoLikedTweet(sampleTweetId, 5);

  // console.log(id, name, username)
  // console.log(tweets)
  // console.log(followers)
  // console.log(mentions)
  // console.log(likedTweets)
  console.log(likedUsers);
}

//run()

app.post("/id/:username", async (req, res) => {
  const username = req.params.username;

  const { id } = await getUserData(username);
  console.log(id);
  res.send(id);
});

app.post("/tweets/", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const number = req.body.limit;
  console.log("GET tweets", id, number);
  res.send(await getUserTweets(id, number));
});

app.post("/likedusers/", async (req, res) => {
  console.log(req.body);
  const tweetId = req.body.tweetId;
  const number = req.body.limit;
  console.log("GET users who liked tweet", tweetId, number);
  res.send(await getUsersWhoLikedTweet(tweetId, number));
});

app.post("/hashtags/", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  console.log("GET tweets", id);
  const tweets = await getUserTweets(id);

  const tweetText = tweets.map((tweet) => tweet.text).join(' ');
  const hashMatch = tweetText.match(/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g);

  if(!hashMatch || hashMatch.length === 0) {
    res.send([])
    return
  }
  let seen = {}
  hashMatch.forEach((e) => {
    if (seen[e]) {
      seen[e]++
    } else {
      seen[e] = 1
    }
  })

  let result = [... new Set(hashMatch)]
  result.sort((a, b) => seen[b] - seen[a]);
  res.send(result)

})

app.post("/categories/", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  console.log("GET tweets", id);
  const tweets = await getUserTweets(id);

  let result = [];
  let tweetInd = [];

  tweets.forEach((tweet) => {
    if (tweet.text.length > 80) {
      const document = {
        content: tweet.text,
        type: "PLAIN_TEXT",
      };
      //console.log(tweet)
      tweetInd.push(tweet);
      result.push(client.classifyText({ document }));
    }
  });

  Promise.allSettled(result).then((resArr) => {
    resArr.forEach((e, i) => (e.tweet = tweetInd[i]));
    // console.log(resArr)
    resArr = resArr.filter((prms) => prms.status === "fulfilled");
    resArr.forEach((e) =>
      e.value[0].categories.forEach((el) => (el.tweets = [e.tweet]))
    );
    resArr = resArr
      .map((e) => e.value[0].categories)
      .filter((e) => e.length !== 0)
      .flat()
      .sort((a, b) => b.confidence - a.confidence);
    let seenMap = new Map()

    resArr.forEach((e) => {
      if(seenMap.has(e.name)) {
        seenMap.set(e.name, [...seenMap.get(e.name), e.tweets])
      } else {
        seenMap.set(e.name, e.tweets)
      }
    })

    let sendArr = [];
    for (const [k,v] of seenMap) {
      sendArr.push({name: k, tweets: v.flat()})
    }
    // let seen = {}
    // resArr = resArr.map((e, i) => {
    //   console.log(seen)
    //   if(seen[e.name]) {
    //     resArr[seen[e.name]].tweets.push(e.tweets)
    //     resArr[seen[e.name]].tweets.flat()
    //   } else {
    //     seen[e.name] = i
    //     return e
    //   }
    // })
    res.send(sendArr);
  });
});

app.post("/entities/", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  console.log("GET tweets", id);
  const tweets = await getUserTweets(id);

  const tweetstr = tweets.map((tweet) => tweet.text).join(" ");

  //console.log(tweetstr)

  const document = {
    content: tweetstr,
    type: "PLAIN_TEXT",
  };

  const [result] = await client.analyzeEntities({ document });

  const entities = result.entities;

  res.send(entities);
  // console.log('Entities:');
  // entities.forEach(entity => {
  //     console.log(entity.name);
  //     console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
  //     if (entity.metadata && entity.metadata.wikipedia_url) {
  //         console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
  //     }

  // })
});

//You can specify the port in .env file
app.listen(process.env.PORT || 3000, () => {
  console.log("Currently Listening to the Server");
});

async function quickstart() {
  // Imports the Google Cloud client library
  const language = require("@google-cloud/language");

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = "Hello, world!";

  const document = {
    content: text,
    type: "PLAIN_TEXT",
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

  const [result2] = await client.analyzeEntities({ document });

  const entities = result2.entities;

  console.log("Entities:");
  entities.forEach((entity) => {
    console.log(entity.name);
    console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    if (entity.metadata && entity.metadata.wikipedia_url) {
      console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
    }
  });
}

module.exports = app;
