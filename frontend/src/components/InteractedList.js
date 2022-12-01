import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const InteractedList = ({ interacted }) => {
  if (!interacted || interacted.length === 0) {
    return (
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Could not find interacted
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
        Top interacted
      </Typography>
      {interacted.map((e, i) => (
        <ListItem>
          <Link
            href={`https://twitter.com/search?q=%23${e.substring(1)}`}
            target="_blank"
            rel="noopener"
          >
            <ListItemText primary={`${i + 1}. ${e}`} />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default InteractedList;
