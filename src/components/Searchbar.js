import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

const Searchbar = ({ setUserId }) => {
  const [currUser, setCurrUser] = useState('');

  useEffect(() => {
    //TODO: ADD FETCH
    setUserId()
  }, [currUser, setUserId])

  return (
    <TextField
      id="outlined-basic"
      label="Enter Twitter @"
      variant="outlined"
      onChange={setCurrUser}
    />
  );
};

export default Searchbar;
