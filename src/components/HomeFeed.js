import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostItem from './PostItem';
import '../styles/HomeFeed.css';

function HomeFeed({ posts }) {
  const [sortType, setSortType] = useState('createdAt');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    return sortType === 'createdAt'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : b.upvotes - a.upvotes;
  });

  return (
    <div className="home-feed-container">
      <Link to="/create" className="create-button">Create New Post</Link>
      <input
        type="text"
        className="search-input"
        placeholder="Search posts by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select onChange={(e) => setSortType(e.target.value)} className="sort-select">
        <option value="createdAt">Sort by Time Created</option>
        <option value="upvotes">Sort by Upvotes</option>
      </select>
      <div className="post-list">
        {sortedPosts.length ? (
          sortedPosts.map(post => (
            <PostItem key={post.id} post={post} />
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}

export default HomeFeed;
