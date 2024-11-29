import React, { useState, useEffect } from 'react';
import './PostForm.css'; // CSS ที่เราปรับไว้ก่อนหน้า

function PostForm({ addPost, editPost, currentPost, username, handleAddComment }) {
  const [newPost, setNewPost] = useState('');
  const [author, setAuthor] = useState(''); // เพิ่ม state สำหรับชื่อผู้ใช้
  const [newComment, setNewComment] = useState(''); // เพิ่ม state สำหรับคอมเมนต์

  useEffect(() => {
    if (currentPost) {
      setNewPost(currentPost.content);
      setAuthor(currentPost.author || ''); // ตั้งค่าชื่อถ้ามีในโพสต์ปัจจุบัน
    }
  }, [currentPost]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() && author.trim()) {
      if (currentPost) {
        editPost(currentPost.id, newPost, author); // ส่ง author ไปพร้อมเนื้อหาโพสต์
      } else {
        addPost(newPost, author); // ส่ง author ไปตอนเพิ่มโพสต์
      }
      setNewPost('');
      setAuthor('');
    }
  };

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    if (newComment.trim()) {
      handleAddComment(postId, newComment, username); // ส่งคอมเมนต์พร้อมชื่อผู้ใช้
      setNewComment(''); // ล้างช่อง input หลังจากส่งคอมเมนต์
    }
  };

  return (
    <form className="post-form" onSubmit={handlePostSubmit}>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        required
      />
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="What's on your mind?"
        required
      />
      <button type="submit">{currentPost ? 'Update Post' : 'Post'}</button>

      {/* ช่องสำหรับเพิ่มคอมเมนต์ */}
      {currentPost && (
        <form onSubmit={(e) => handleCommentSubmit(currentPost.id, e)}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Add Comment</button>
        </form>
      )}
    </form>
  );
}

export default PostForm;
