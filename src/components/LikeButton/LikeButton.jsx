import React, { useState } from 'react';
import api from "../../api/api";
import './LikeButton.css';

const LikeButton = ({ postId, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      if (!liked) {
        await api.post('/like/${postId}');
      } else {
        await api.post('/unlike/${postId}');
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Erro ao interagir com o post:', error);
    }
  };

  return (
    <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
      <i className="fa fa-thumbs-up" aria-hidden="true"></i> {liked ? 'Descurtir' : 'Curtir'}
    </button>
  );
};

export default LikeButton;
