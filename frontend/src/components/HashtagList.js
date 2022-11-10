import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const HashTagList = ({ hashtags }) => {
  if (!hashtags || hashtags.length === 0) {
    return (
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Could not find hashtags
      </Typography>
    );
  }
  return (
    <List
      sx={{ width: "400px", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Top Hashtags
      </Typography>
      {hashtags.map((e, i) => (
        <ListItem>
          <ListItemText primary={`${i + 1}. ${e}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default HashTagList;
