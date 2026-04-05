import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
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

  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [userRes, photosRes] = await Promise.all([
          axios.get(`https://vm5rty-8080.csb.app/user/${userId}`),
          axios.get(`https://vm5rty-8080.csb.app/photosOfUser/${userId}`),
        ]);

        setUser(userRes.data);
        setPhotos(photosRes.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu ảnh:", err);

        if (err.response && err.response.status === 404) {
          setUser(null);
        } else {
          setError("Không lấy được dữ liệu ảnh của người dùng");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  if (loading) {
    return (
      <div className="user-photos-container">
        <Typography variant="body1">Loading...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-photos-container">
        <Typography variant="h5" className="user-photos-title">
          Error
        </Typography>
        <Typography variant="body1">{error}</Typography>
      </div>
    );
  }

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
