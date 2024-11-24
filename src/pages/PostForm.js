import React, { useState } from 'react';

function PostForm({ onAddPost }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      onAddPost(content); // เรียกใช้ฟังก์ชัน onAddPost ที่ถูกส่งเข้ามา
      setContent(''); // รีเซ็ตฟอร์ม
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows="4"
        cols="50"
      />
      <br />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
