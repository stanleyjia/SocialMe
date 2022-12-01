const express = require("express");
const Twitter = require("./twitter.js");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const language = require("@google-cloud/language");

const client = new language.LanguageServiceClient();

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function run() {
  const { id, name, username } = await Twitter.getUserData("elonMusk");
  // console.log(id, name, username)
  const tweets = await Twitter.getUserTweets(id, 10);
  const followers = await Twitter.getUserFollowers(id, 5);
  const following = await Twitter.getUserFollowing(id, 5);

  const mentions = await Twitter.getUserMentions(id, 5);
  const likedTweets = await Twitter.getUserLikedTweets(id, 5);

  // console.log(likedTweets)
  const sampleTweetId = likedTweets[0].id;
  const likedUsers = await Twitter.getUsersWhoLikedTweet(sampleTweetId, 5);
  const mostInteractedWithUser = await Twitter.getMostInteractedUsers(tweets);
  // const tweetInfo = await Twitter.getTweetById('1553190311450386433')
  // const timeline = await Twitter.getTimeline(id)
  // console.log('timeline', timeline)

  // console.log(id, name, username)
  // console.log(tweets)
  // console.log(followers)
  // console.log(mentions)
  // console.log(likedTweets)
  // console.log(likedUsers);
  console.log(tweets)
}

// run()

app.post("/id/:username", async (req, res) => {
  const username = req.params.username;

  const { id } = await Twitter.getUserData(username);
  console.log(id);
  res.send(id);
});

app.post("/tweets/", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const number = req.body.limit;
  console.log("GET tweets", id, number);
  res.send(await Twitter.getUserTweets(id, number));
});

app.post("/likedusers/", async (req, res) => {
  console.log(req.body);
  const tweetId = req.body.tweetId;
  const number = req.body.limit;
  console.log("GET users who liked tweet", tweetId, number);
  res.send(await Twitter.getUsersWhoLikedTweet(tweetId, number));
});

app.post("/getInteractedWithAccounts/", async (req, res) => {
  // console.log(req.body);
  const id = req.body.id;
  // console.log("GET hashtags", id);
  const tweets = await Twitter.getUserTweets(id, 1000);
  const mostInteractedWith = Twitter.getMostInteractedUsers(tweets);
  console.log(mostInteractedWith)
  res.send(mostInteractedWith);
});


app.post("/hashtags/", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  console.log("GET hashtags", id);
  const tweets = await Twitter.getUserTweets(id);

  if (!tweets || tweets.length === 0) {
    res.send([]);
    return;
  }

  const tweetText = tweets.map((tweet) => tweet.text).join(" ");
  // console.log(tweetText)
  const hashMatch = tweetText.match(
    /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g
  );

  if (!hashMatch || hashMatch.length === 0) {
    res.send([]);
    return;
  }
  let seen = {};
  hashMatch.forEach((e) => {
    if (seen[e]) {
      seen[e]++;
    } else {
      seen[e] = 1;
    }
  });

  let result = [...new Set(hashMatch)];
  result.sort((a, b) => seen[b] - seen[a]);
  res.send(result);
});

app.post("/categories/", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  console.log("GET tweets", id);
  const tweets = await Twitter.getUserTweets(id);

  let result = [];
  let tweetInd = [];

  if (!tweets || tweets.length === 0) {
    res.send([]);
    return;
  }

  tweets.forEach((tweet) => {
    if (tweet.text.length > 70) {
      const document = {
        content: tweet.text,
        type: "PLAIN_TEXT",
      };
      //console.log(tweet)
      tweetInd.push(tweet);
      result.push(client.classifyText({ document }));
    }
  });

  Promise.allSettled(result).then(async (resArr) => {
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
    let seenMap = new Map();

    resArr.forEach((e) => {
      if (seenMap.has(e.name)) {
        seenMap.set(e.name, [...seenMap.get(e.name), e.tweets]);
      } else {
        seenMap.set(e.name, e.tweets);
      }
    });

    let sendArr = [];
    for (const [k, v] of seenMap) {
      sendArr.push({ name: k, tweets: v.flat() });
    }

    for (const categ of sendArr) {
      for (const tweet of categ.tweets) {
        const document = {
          content: tweet.text,
          type: "PLAIN_TEXT",
        };

        const [result] =  await client.analyzeSentiment({ document: document })
        const sentiment = result.documentSentiment;
        tweet.sentiment = sentiment;
        console.log(await Twitter.getTweetById(tweet.id))

        // client.analyzeSentiment({ document: document }).then((res) => {
        //   const [result] = res;
        //   const sentiment = result.documentSentiment;
        //   tweet.sentiment = sentiment;
        //   Twitter.getTweetById(tweet.id)
        //   .then((res) => {
        //     console.log(tweet)
        //     console.log(res)
        //   })
        // });
      }
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
    
    res.send(sendArr)
  });
});

app.post("/entities/", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  console.log("GET tweets", id);
  const tweets = await Twitter.getUserTweets(id);

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
