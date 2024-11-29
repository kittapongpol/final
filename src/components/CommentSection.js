import React from 'react';

function CommentSection({ postId, comments, handleAddComment, newComment, setNewComment }) {
  return (
    <div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={() => handleAddComment(postId)}>Comment</button>

      {/* แสดงคอมเมนต์ */}
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <strong>{comment.author}:</strong> {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
