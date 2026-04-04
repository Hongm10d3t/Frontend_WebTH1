import React from "react";
import { Typography, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

const images = require.context("../../images", false, /\.(png|jpe?g|svg)$/);

function getImageSrc(fileName) {
  try {
    return images(`./${fileName}`);
  } catch (error) {
    return "";
  }
}

function UserPhotos() {
  const { userId } = useParams();

  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (!user) {
    return (
      <div className="user-photos-container">
        <Typography variant="h5" className="user-photos-title">
          User not found
        </Typography>
        <Typography variant="body1">
          Không tìm thấy user với id: {userId}
        </Typography>
      </div>
    );
  }

  return (
    <div className="user-photos-container">
      <Typography variant="h4" className="user-photos-title">
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.length === 0 ? (
        <Typography variant="body1">Người dùng này chưa có ảnh nào.</Typography>
      ) : (
        photos.map((photo) => (
          <div className="photo-card" key={photo._id}>
            <img
              className="photo-image"
              src={getImageSrc(photo.file_name)}
              alt={photo.file_name}
            />

            <Typography variant="body2" className="photo-date">
              Posted: {formatDate(photo.date_time)}
            </Typography>

            <Divider className="photo-divider" />

            <Typography variant="h6" className="comment-title">
              Comments
            </Typography>

            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <div className="comment-item" key={comment._id}>
                  <Typography variant="body2" className="comment-date">
                    {formatDate(comment.date_time)}
                  </Typography>

                  <Typography variant="body1" className="comment-user">
                    <Link
                      to={`/users/${comment.user._id}`}
                      className="comment-user-link"
                    >
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                  </Typography>

                  <Typography variant="body1" className="comment-text">
                    {comment.comment}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2" className="no-comment">
                No comments yet.
              </Typography>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UserPhotos;