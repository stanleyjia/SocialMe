const e = require('express');
const Request = require('./request.js')

//Get Tweets from Twitter API
exports.getUserData = async (username) => {
  const endpointUrl = `https://api.twitter.com/2/users/by/username/${username}`;
  const response = await Request.get(endpointUrl)
  return response.data
};

//Get Tweets from Twitter API
exports.getUserTweets = async (userId, num = 100) => {
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/tweets`;
  let params = {
    'tweet.fields': 'public_metrics,text,id'
  }
  if (num > 100) {
    let i = 0
    let data = [];
    let next_token = null;
    while (i < num) {
      // console.log(i, next_token)
      // console.log(data.length)
      if ((num - i) < 100) {
        params = {
          max_results: (num + 10) - i,
        }
        if (next_token != null) params["pagination_token"] = next_token
        i = num
      } else {
        params = {
          max_results: 100
        }
        if (next_token != null) params["pagination_token"] = next_token
        i += 100
      }
      const res = await Request.get(endpointUrl, params)
      next_token = res.meta.next_token
      data = data.concat(res.data)
    }
    // console.log('length', data.length)
    return data


    // console.log("RES", res.meta.next_token)

  } else {
    params = {
      'tweet.fields': 'public_metrics,text,id',
      max_results: num,
    };
    const res = await Request.get(endpointUrl, params)
    return res.data
  }
};

exports.getUserFollowers = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/followers`;
  const params = {
    max_results: num,
  };
  const res = await Request.get(endpointUrl, params)
  return res.data
};

exports.getUserFollowing = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/following`;
  const params = {
    max_results: num,
  };
  const res = await Request.get(endpointUrl, params)
  return res.data
};

exports.getUserMentions = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/mentions`;
  const params = {
    max_results: num,
  };
  const res = await Request.get(endpointUrl, params)
  return res.data
};

exports.getUserLikedTweets = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/liked_tweets`;
  const params = {
    max_results: num,
  };
  const res = await Request.get(endpointUrl, params)
  return res.data
};

exports.getUsersWhoLikedTweet = async (tweetId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 users in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/tweets/${tweetId}/liking_users`;
  const params = {
    max_results: num,
  };
  const res = await Request.get(endpointUrl, params)
  return res.data
};

exports.getTimeline = async (userId) => {
  const endpointUrl = `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}`;
  const params = {
    user_id: userId
  };
  const res = await Request.get(endpointUrl, params)
  return res.data
}

exports.getMostInteractedUsers = (tweets) => {
  // tweets.forEach((tweet) => {

  // })
  const tweetText = tweets.map((tweet) => tweet.text).join(' ');
  const mentionMatch = tweetText.match(/(^|\B)@(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g);

  if (!mentionMatch || mentionMatch.length === 0) {
    return []
  }
  let count = {}
  mentionMatch.forEach((e) => {
    if (count[e]) {
      count[e]++
    } else {
      count[e] = 1
    }
  })

  let result = [... new Set(mentionMatch)]
  result.sort((a, b) => count[b] - count[a]);
  // console.log(result, count)

  let output = {}
  result.slice(0, 10).forEach((id) => {
    output[id] = count[id]
  })
  // console.log(output)
  return output

}

exports.getTweetById = async (tweetId) => {
 
  const endpointUrl = `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=public_metrics`;
  const params = {
  };
  const res = await Request.get(endpointUrl, params)
  return res.data
};