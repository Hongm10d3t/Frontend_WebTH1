import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

function UserList() {
  const users = models.userListModel();

  return (
    <div>
      {/* <Typography variant="body1"> This is the user list, which takes up 3/12 of the window. You might choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "} and <a href="https://mui.com/components/dividers/">Dividers</a> to display your users like so: </Typography> */}
      <Typography variant="body1">
        This is the user list
      </Typography>

      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem
              button
              component={Link}
              to={`/users/${item._id}`}
            >
              <ListItemText
                primary={`${item.first_name} ${item.last_name}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;