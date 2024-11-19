import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostItem.css';

function PostItem({ post }) {
  return (
    <div>
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
      <p>Upvotes: {post.upvotes}</p>
    </div>
  );
}

export default PostItem;
