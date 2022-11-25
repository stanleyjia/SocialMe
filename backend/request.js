const needle = require("needle");
const dotenv = require("dotenv");
dotenv.config();
const BEARER_TOKEN = process.env.BEARER_TOKEN;

async function get(url, params = {}) {
  const response = await needle(
    "get",
    url,
    params,
    {
      headers: {
        "User-Agent": "v2RecentSearchJS",
        authorization: `Bearer ${BEARER_TOKEN}`,
      },
    }
  );
  if (response.body) {
    // console.log(response.body.meta)
    return response.body
  }
  else {
    console.log(response.body.error)
    throw new Error("Unsuccessful Request")
  }
}

module.exports = { get: get }