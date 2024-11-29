import React from 'react';

function LikeButton({ postId, handleLikePost }) {
  return (
    <button onClick={() => handleLikePost(postId)}>Like</button>
  );
}

export default LikeButton;
