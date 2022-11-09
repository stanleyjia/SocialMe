import React, { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import NumberCard from "./components/NumberCard"

import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import twitterLogo from './resources/twitter-logo.png'
import Home from "./components/Home";


function App() {
  const [userId, setUserId] = useState("");

  return (
  <Home />
  );
}

export default App;
