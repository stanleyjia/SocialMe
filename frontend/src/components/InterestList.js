import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Typography } from "@mui/material";

const InterestList = ({ interests }) => {
  const [open, setOpen] = useState([]);

  const handleClick = (i) => {
    if (open.includes(i)) {
      setOpen(open.filter((e) => e !== i));
    } else {
      setOpen([...open, i]);
    }
  };

  useEffect(() => {
    console.log(open);
  }, [open]);

  if(!interests || interests.length === 0) {
    return (
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Could not find interests
      </Typography>
    )
  }

  return (
    <List
      sx={{ width: "700px", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Interests
      </Typography>
      {interests.map((e, i) => (
        <>
          <ListItemButton onClick={() => handleClick(i)}>
            <ListItemText primary={e.name.substring(1)} />
            {open.includes(i) ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open.includes(i)} timeout="auto" unmountOnExit>
            <ListSubheader component="div" id="nested-list-subheader">
              Related Tweets
            </ListSubheader>
            {e.tweets.map((tweet) => (
              <List component="div" disablePadding>
                <ListItemButton>
                  <ListItemText primary={tweet.text} />
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </>
      ))}
    </List>
  );
};

export default InterestList;
