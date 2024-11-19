import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import HomeFeed from './components/HomeFeed';
import PostDetail from './components/PostDetail';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, { ...newPost, id: Date.now(), upvotes: 0, comments: [] }]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeFeed posts={posts} />} />
        <Route path="/create" element={<CreatePost addPost={addPost} />} />
        <Route path="/post/:id" element={<PostDetail posts={posts} updatePost={updatePost} deletePost={deletePost} />} />
      </Routes>
    </Router>
  );
}

export default App;
