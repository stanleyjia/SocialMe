import React, { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import NumberCard from "./components/NumberCard"

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";



function App() {
  const [userId, setUserId] = useState("");

  return (
    <Box
      className="App"
      sx={{ 
        display: "flex", 
        flexFlow: "column nowrap", 
        alignItems: "center",
        marginTop: "4rem" 
      }}
    >
      <Typography variant="h2" sx={{margin: "2rem"}}>Me-Tweet</Typography>
      <Searchbar setUserId={setUserId} />
      <NumberCard number={20} caption={"Most Liked"} />
    </Box>
  );
}

export default App;
