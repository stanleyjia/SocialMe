import React, { useState, useEffect } from "react";
import NumberCard from "./components/NumberCard"

import {Box, Button} from "@mui/material";
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


  const handleSubmit = async () => {
    setLoading(true)
    console.log(username)
    const userId = await fetchData(`id/${username}`)
    await Promise.all([
      fetchData('tweets', {id: userId, limit:5}),
      fetchData('getcategories', {id: userId}),
      fetchData('entities', {id: userId})


    ]).then(([tweets, categories, entities]) => {
      console.log(tweets, categories, entities)
      setResultsFound(true)
    })
    setLoading(false)
  }

  if (resultsFound) {
    return <Results />
  }

  return (
    loading ?
    <Loading /> :
    <Home setUsername={setUsername} handleSubmit={handleSubmit} />
  );
}

export default App;
