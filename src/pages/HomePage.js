import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostForm from './PostForm';
import './HomePage.css';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้ที่ล็อกอินจาก API
  useEffect(() => {
    console.log("useEffect is running");

    axios.get('/api/current_user')  // ปรับ URL ตาม API ที่ใช้
      .then((response) => {
        console.log('Response from API:', response.data);
        setUsername(response.data.name || response.data.email);  // ใช้ชื่อหรืออีเมลจาก API
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });

    // ดึงโพสต์จาก localStorage
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts) {
      setPosts(savedPosts);
    }
  }, []);

  const addPost = (content, username) => {
    const newPostData = {
      id: Date.now(),
      content,
      username,  // ใช้ชื่อผู้ใช้ที่ได้จาก API
      likes: 0,
      comments: [],
    };
    const updatedPosts = [...posts, newPostData];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const editPost = (postId, newContent) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, content: newContent } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleAddComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { 
          ...post, 
          comments: [...post.comments, { content: comment, username }]  // ใช้ชื่อจาก API ในคอมเมนต์
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setNewComment({ ...newComment, [postId]: '' });
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // ฟิลเตอร์โพสต์ตามคำค้นหา
  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1>WELCOME TO PTER</h1>

      {/* ช่องค้นหา */}
      <input
        className="search-bar"
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* แสดงชื่อผู้ใช้ */}
      <p><strong>{username ? username : 'Loading...'}</strong></p>

      <PostForm addPost={addPost} editPost={editPost} currentPost={editingPost} username={username} />

      <div>
        {filteredPosts.map((post) => (
          <div className="post-card" key={post.id}>
            {/* แสดงชื่อผู้ใช้ที่โพสต์ */}
            <p><strong>{post.username}</strong> :</p>
            <p>{post.content}</p>
            <button onClick={() => handleLikePost(post.id)}>Like</button>
            <span>Likes: {post.likes}</span>
            <button onClick={() => setEditingPost(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>

            <div>
              <h4>Comments</h4>
              {post.comments.map((comment, index) => (
                <p key={index}><strong>{comment.username}</strong>: {comment.content}</p>
              ))}
              <input
                className="comment-input"
                type="text"
                placeholder="Add a comment"
                value={newComment[post.id] || ''}
                onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newComment[post.id]?.trim()) {
                    handleAddComment(post.id, newComment[post.id]);
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

