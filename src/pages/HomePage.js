// import React, { useContext, useState } from 'react';
// import { UserContext } from '../UserContext';
// import { useNavigate } from 'react-router-dom';

// function HomePage() {
//   const { user, logout } = useContext(UserContext);
//   const [posts, setPosts] = useState([]); // สถานะสำหรับโพสต์
//   const [newPost, setNewPost] = useState(''); // สถานะสำหรับข้อความโพสต์ใหม่
//   const [newComment, setNewComment] = useState(''); // สถานะสำหรับคอมเมนต์ใหม่
//   const navigate = useNavigate();

//   // ฟังก์ชัน logout
//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   // ฟังก์ชันเพิ่มโพสต์ใหม่
//   const handleAddPost = () => {
//     if (newPost) {
//       const newPostData = {
//         id: posts.length + 1,
//         content: newPost,
//         author: user.name,
//         likes: 0,
//         comments: [],
//       };
//       setPosts([...posts, newPostData]); // เพิ่มโพสต์ใหม่ในสถานะ
//       setNewPost(''); // รีเซ็ตฟิลด์ข้อความ
//     }
//   };

//   // ฟังก์ชันเพิ่มคอมเมนต์
//   const handleAddComment = (postId) => {
//     if (newComment) {
//       const updatedPosts = posts.map(post => {
//         if (post.id === postId) {
//           post.comments.push({ author: user.name, content: newComment });
//         }
//         return post;
//       });
//       setPosts(updatedPosts); // อัปเดตโพสต์
//       setNewComment(''); // รีเซ็ตฟิลด์คอมเมนต์
//     }
//   };

//   // ฟังก์ชันเพิ่มไลค์
//   const handleLikePost = (postId) => {
//     const updatedPosts = posts.map(post => {
//       if (post.id === postId) {
//         post.likes += 1; // เพิ่มไลค์
//       }
//       return post;
//     });
//     setPosts(updatedPosts);
//   };

//   return (
//     <div>
//       <h1>Welcome, {user ? user.name : 'Guest'}!</h1>
//       {user ? (
//         <>
//           <button onClick={handleLogout}>Logout</button>
//           {/* ฟอร์มสำหรับโพสต์ใหม่ */}
//           <div>
//             <textarea
//               value={newPost}
//               onChange={(e) => setNewPost(e.target.value)}
//               placeholder="What's on your mind?"
//             />
//             <button onClick={handleAddPost}>Post</button>
//           </div>
//           {/* แสดงโพสต์ */}
//           {posts.map((post) => (
//             <div key={post.id} style={{ border: '1px solid #ddd', marginBottom: '10px', padding: '10px' }}>
//               <h4>{post.author}</h4>
//               <p>{post.content}</p>
//               <button onClick={() => handleLikePost(post.id)}>Like {post.likes}</button>
//               <div>
//                 <textarea
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Add a comment"
//                 />
//                 <button onClick={() => handleAddComment(post.id)}>Comment</button>
//               </div>
//               {/* แสดงคอมเมนต์ */}
//               <div>
//                 {post.comments.map((comment, index) => (
//                   <div key={index}>
//                     <strong>{comment.author}:</strong> {comment.content}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </>
//       ) : (
//         <p>Please log in to continue</p>
//       )}
//     </div>
//   );
// }

// export default HomePage;

import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { user, logout } = useContext(UserContext);
  const [posts, setPosts] = useState([]); // สถานะสำหรับโพสต์
  const [newPost, setNewPost] = useState(''); // สถานะสำหรับข้อความโพสต์ใหม่
  const [newComments, setNewComments] = useState({}); // แก้ไขเพื่อเก็บคอมเมนต์แยกตามโพสต์
  const navigate = useNavigate();

  console.log('User:', user);  // ตรวจสอบว่า user มีข้อมูลหรือไม่
  console.log('Posts:', posts);  // ตรวจสอบว่า posts มีข้อมูลหรือไม่

  // ฟังก์ชัน logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ฟังก์ชันเพิ่มโพสต์ใหม่
  const handleAddPost = () => {
    if (newPost) {
      const newPostData = {
        id: posts.length + 1,
        content: newPost,
        author: user.name,
        likes: 0,
        comments: [],
      };
      setPosts([...posts, newPostData]); // เพิ่มโพสต์ใหม่ในสถานะ
      setNewPost(''); // รีเซ็ตฟิลด์ข้อความ
    }
  };

  // ฟังก์ชันเพิ่มคอมเมนต์
  const handleAddComment = (postId) => {
    const comment = newComments[postId];
    if (comment) {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          post.comments.push({ author: user.name, content: comment });
        }
        return post;
      });
      setPosts(updatedPosts); // อัปเดตโพสต์
      setNewComments({ ...newComments, [postId]: '' }); // รีเซ็ตฟิลด์คอมเมนต์ของโพสต์นี้
    }
  };

  // ฟังก์ชันเพิ่มไลค์
  const handleLikePost = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        post.likes += 1; // เพิ่มไลค์
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // ฟังก์ชันอัพเดตคอมเมนต์ที่กรอก
  const handleCommentChange = (postId, value) => {
    setNewComments({ ...newComments, [postId]: value });
  };

  return (
    <div>
      <h1>Welcome, {user ? user.name : 'Guest'}!</h1>
      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          {/* ฟอร์มสำหรับโพสต์ใหม่ */}
          <div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
            />
            <button onClick={handleAddPost}>Post</button>
          </div>
          {/* แสดงโพสต์ */}
          {posts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ddd', marginBottom: '10px', padding: '10px' }}>
              <h4>{post.author}</h4>
              <p>{post.content}</p>
              <button onClick={() => handleLikePost(post.id)}>Like {post.likes}</button>
              <div>
                <textarea
                  value={newComments[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  placeholder="Add a comment"
                />
                <button onClick={() => handleAddComment(post.id)}>Comment</button>
              </div>
              {/* แสดงคอมเมนต์ */}
              <div>
                {post.comments.map((comment, index) => (
                  <div key={index}>
                    <strong>{comment.author}:</strong> {comment.content}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>Please log in to continue</p>
      )}
    </div>
  );
}

export default HomePage;















