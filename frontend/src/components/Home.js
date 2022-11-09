import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import NumberCard from "./NumberCard"

import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import twitterLogo from '.././resources/twitter-logo.png'



function Home() {
  const [userId, setUserId] = useState("");

  return (
    <Box
      className="App"
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        marginTop: "10%"
      }}
    >
      <img style={{width:"50px", height:"50px"}} alt="logo" src={twitterLogo} />
      <Typography variant="h2" sx={{my:1, fontWeight:"500"}}>Me-Tweet</Typography>
      <Typography variant="p" sx={{mt:1,mb:4}}>A tool to automatically generate a report on a target Twitter user</Typography>

      <Box sx={{display:"flex", flexDirection:"row", mb:2}}>
        <Searchbar setUserId={setUserId} />
        <Button size="medium" variant="contained" sx={{ml:1}}>Submit</Button>
      </Box>
    </Box>
  );
}

export default Home;