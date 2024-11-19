import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PostDetail.css';

function PostDetail({ posts, updatePost, deletePost }) {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [comment, setComment] = useState('');

  const handleUpvote = () => {
    updatePost({ ...post, upvotes: post.upvotes + 1 });
  };

  const handleComment = () => {
    if (comment.trim()) {
      const updatedComments = [...post.comments, comment];
      updatePost({ ...post, comments: updatedComments });
      setComment('');
    }
  };

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/');
  };

  const handleSave = () => {
    if (title.trim() === '') return;
    updatePost({ ...post, title, content, imageUrl });
    setIsEditing(false);
  };

  return (
    post ? (
      <div className="post-detail">
        {isEditing ? (
          <div className="edit-container">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content (optional)"
            />
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL (optional)"
            />
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
            <p>Upvotes: {post.upvotes}</p>
            <button onClick={handleUpvote}>Upvote</button>
            <button onClick={() => setIsEditing(true)} className="edit-button">Edit Post</button>
            <button onClick={handleDelete} className="delete-button">Delete Post</button>
            <h3>Comments</h3>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={handleComment}>Comment</button>
            <ul>
              {post.comments.map((c, index) => <li key={index}>{c}</li>)}
            </ul>
          </>
        )}
      </div>
    ) : <p>Post not found</p>
  );
}

export default PostDetail;
