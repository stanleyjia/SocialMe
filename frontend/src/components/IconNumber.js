import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const IconNumber = ({ icon, number, iconname }) => {
  return (
    <Box sx={{ ml: "1rem", mr: "1rem" }}>
      {/* <Tooltip title={`${iconname}: ${number}`}> */}
        {icon}
        <Typography sx={{ fontSize: "1rem" }}>{number}</Typography>
      {/* </Tooltip> */}
    </Box>
  );
};

export default IconNumber;
