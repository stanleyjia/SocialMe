import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import IconNumber from "./IconNumber";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";

const InterestList = ({ interests }) => {
  const [open, setOpen] = useState([]);

  const handleClick = (i) => {
    if (open.includes(i)) {
      setOpen(open.filter((e) => e !== i));
    } else {
      setOpen([...open, i]);
    }
  };

  const sentimentIcon = (score) => {
    if (score > 0.3) {
      return (
        <SentimentSatisfiedAltOutlinedIcon color={'success'} sx={{ fontSize: '4rem'}} />
      );
    } else if (score < -0.3) {
      return (
        <SentimentDissatisfiedOutlinedIcon color={'error'} sx={{ fontSize: '4rem'}} />
      );
    } else {
      return <SentimentNeutralOutlinedIcon color={'info'} sx={{ fontSize: '4rem'}} />;
    }
  };

  useEffect(() => {
    console.log(open);
  }, [open]);

  if (!interests || interests.length === 0) {
    return (
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Could not find interests
      </Typography>
    );
  }

  return (
    <List
      sx={{ width: "500px", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        User's Main Interests
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
                <ListItemButton
                >
                  <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
                    <ListItemText primary={tweet.text} />
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexFlow: "row nowrap",
                        justifyContent: "flex-start",
                        mt: "1rem",
                      }}
                    >
                      <IconNumber
                        icon={<RepeatOutlinedIcon />}
                        number={tweet["public_metrics"]["retweet_count"]}
                        iconname={"Retweets"}
                      />
                      <IconNumber
                        icon={<FavoriteBorderOutlinedIcon />}
                        number={tweet["public_metrics"]["like_count"]}
                        iconname={"Likes"}
                      />
                      <IconNumber
                        icon={<ChatOutlinedIcon />}
                        number={tweet["public_metrics"]["reply_count"]}
                        iconname={"Replies"}
                      />
                      <IconNumber
                        icon={<FormatQuoteOutlinedIcon />}
                        number={tweet["public_metrics"]["quote_count"]}
                        iconname={"Quote"}
                      />
                    </Box>
                  </Box>
                  <ListItemIcon>
                    {sentimentIcon(tweet.sentiment.score)}
                  </ListItemIcon>
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
