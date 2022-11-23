import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import twitterLogo from ".././resources/twitter-logo.png";
import CircularProgress from "@mui/material/CircularProgress";

function Loading(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        marginTop: "10%",
      }}
    >
      <Typography variant="h4" sx={{ my: 1, fontWeight: "500" }}>
        Processing Twitter Account...
      </Typography>

      <CircularProgress size={"5rem"} />
      <img
        style={{ width: "50px", height: "50px" }}
        alt="logo"
        src={twitterLogo}
      />
    </Box>
  );
}

export default Loading;
