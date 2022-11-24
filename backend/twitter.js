const Request = require('./request.js')

//Get Tweets from Twitter API
exports.getUserData = async (username) => {
  const endpointUrl = `https://api.twitter.com/2/users/by/username/${username}`;
  return await Request.get(endpointUrl)
};

//Get Tweets from Twitter API
exports.getUserTweets = async (userId, num = 100) => {
  if (num > 100) {
    throw new Error("Can load maximum of 100 tweets in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/tweets`;
  const params = {
    max_results: num,
  };
  return await Request.get(endpointUrl, params)
};

exports.getUserFollowers = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/followers`;
  const params = {
    max_results: num,
  };
  return await Request.get(endpointUrl, params)
};

exports.getUserFollowing = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/following`;
  const params = {
    max_results: num,
  };
  return await Request.get(endpointUrl, params)
};

exports.getUserMentions = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/mentions`;
  const params = {
    max_results: num,
  };
  return await Request.get(endpointUrl, params)
};

exports.getUserLikedTweets = async (userId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 followers in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/users/${userId}/liked_tweets`;
  const params = {
    max_results: num,
  };
  return await Request.get(endpointUrl, params)
};

exports.getUsersWhoLikedTweet = async (tweetId, num) => {
  if (num > 1000) {
    throw new Error("Can load maximum of 100 users in one pull");
  }
  const endpointUrl = `https://api.twitter.com/2/tweets/${tweetId}/liking_users`;
  const params = {
    max_results: num,
  };
  return await Request.get(endpointUrl, params)
};

