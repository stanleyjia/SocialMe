import React, { useState, useEffect } from "react";
import NumberCard from "./NumberCard"

import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import twitterLogo from '.././resources/twitter-logo.png'
import InterestList from './InterestList'
import HashTagList from "./HashtagList";
import InteractedList from "./InteractedList";


function Results({ results }) {
  // const [input, setInput] = useState("");
  // console.log(results)

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        marginTop: "2%"
      }}
    >
      <img style={{ width: "50px", height: "50px" }} alt="logo" src={twitterLogo} />
      <Typography variant="h2" sx={{ my: 1, fontWeight: "500" }}>Me-Tweet Summary</Typography>
      {/* <Typography variant="p" sx={{mt:1,mb:4}}>A tool to automatically generate a report on a target Twitter user</Typography> */}

      <Box sx={{ display: "flex", flexDirection: "row", width: "1000", mb: 2, justifyContent: "center" }}>
        <InterestList interests={results.categories} />
        <HashTagList hashtags={results.hashtags} />
        <InteractedList interacted={results.interacted ? Object.keys(results.interacted) : []} />
      </Box>
    </Box>
  );
}

export default Results;
