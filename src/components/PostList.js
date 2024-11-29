import React from 'react';
import PostForm from '../pages/PostForm'; // แก้ไขพาธให้ถูกต้อง

function PostList({ posts, handleLikePost, handleAddComment }) {
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.content}</p>
          <p>By: {post.author}</p>
          <button onClick={() => handleLikePost(post.id)}>Like ({post.likes})</button>
          <div>
            {post.comments.map((comment, index) => (
              <p key={index}>{comment.author}: {comment.content}</p>
            ))}
          </div>
          <PostForm addComment={(comment) => handleAddComment(post.id, comment)} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
