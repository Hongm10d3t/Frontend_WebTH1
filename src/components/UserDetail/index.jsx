import React, { useEffect, useState } from "react";
import { Typography, Divider, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "./styles.css";

function UserDetail() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `https://vm5rty-8080.csb.app/user/${userId}`
        );

        setUser(res.data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết user:", err);

        if (err.response && err.response.status === 404) {
          setUser(null);
        } else {
          setError("Không lấy được thông tin người dùng");
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="user-detail-container">
        <Typography variant="body1">Loading...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-detail-container">
        <Typography variant="h5" className="user-detail-title">
          Error
        </Typography>
        <Typography variant="body1">{error}</Typography>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-detail-container">
        <Typography variant="h5" className="user-detail-title">
          User not found
        </Typography>
        <Typography variant="body1">
          Không tìm thấy người dùng với id: {userId}
        </Typography>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <Typography variant="h4" className="user-detail-title">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="subtitle1" className="user-detail-subtitle">
          User Detail
        </Typography>
      </div>

      <Divider className="user-detail-divider" />

      <div className="user-detail-card">
        <div className="detail-row">
          <span className="detail-label">First name:</span>
          <span className="detail-value">{user.first_name}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Last name:</span>
          <span className="detail-value">{user.last_name}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{user.location}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Occupation:</span>
          <span className="detail-value">{user.occupation}</span>
        </div>

        <div className="detail-row description-row">
          <span className="detail-label">Description:</span>
          <span className="detail-value">{user.description}</span>
        </div>
      </div>

      <div className="user-detail-actions">
        <Button variant="contained" component={Link} to={`/photos/${user._id}`}>
          View Photos
        </Button>
      </div>
    </div>
  );
}

export default UserDetail;
