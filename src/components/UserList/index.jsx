import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

// em dùng axios gọi api đầy đủ từ backend không thông qua file fecthModelData ạ
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axios.get("https://vm5rty-8080.csb.app/user/list");
        console.log("DATA USER:", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách user:", err);
        setError("Không lấy được danh sách user");
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <Typography variant="body1">User List</Typography>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem button component={Link} to={`/users/${item._id}`}>
              <ListItemText primary={`${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
