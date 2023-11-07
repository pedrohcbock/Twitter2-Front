import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Feed from '../pages/Feed/Feed';
import UserProfile from '../pages/Profile/Profile';
import EditProfile from '../pages/EditProfile/EditProfile';
import CreatePost from '../pages/CreatePost/CreatePost';
import EditPost from '../pages/EditPost/EditPost';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/newpost" element={<CreatePost />} />
      <Route path="/editpost/:postId" element={<EditPost />} />
    </Routes>
  );
};

export default AppRoutes;
