import React, { useState, useEffect } from "react";
import NumberCard from "./components/NumberCard"

import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import twitterLogo from './resources/twitter-logo.png'
import Home from "./components/Home";
// import useFetch from "./useFetch";
import { fetchData } from "./fetch/fetch";
import Loading from "./components/Loading";
import Results from "./components/Results";

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultsFound, setResultsFound] = useState(false)
  const [results, setResults] = useState({})


  const handleSubmit = async () => {
    setLoading(true)
    // console.log(username)
    const userId = await fetchData(`id/${username}`)
    await Promise.all([
      fetchData('tweets', { id: userId, limit: 5 }),
      fetchData('categories', { id: userId }),
      fetchData('hashtags', { id: userId }),
      fetchData('getInteractedWithAccounts', {id: userId})

    ]).then((res) => {
      const [tweets, categories, hashtags, interacted] = res
      setResults({ tweets, categories, hashtags, interacted })
      console.log(tweets, categories, hashtags)
      setResultsFound(true)
    })
    setLoading(false)
  }

  if (resultsFound) {
    return <Results results={results} />
  }

  return (
    loading ?
      <Loading /> :
      <Home setUsername={setUsername} handleSubmit={handleSubmit} />
  );
}

export default App;
