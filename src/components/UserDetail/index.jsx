import React from "react";
import { Typography, Divider, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";

import "./styles.css";


function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

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
        <Button
          variant="contained"
          component={Link}
          to={`/photos/${user._id}`}
        >
          View Photos
        </Button>
      </div>
    </div>
  );
}

export default UserDetail;