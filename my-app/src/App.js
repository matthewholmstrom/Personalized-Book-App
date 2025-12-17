import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Converted from "./pages/Converted";
import  Wishlist from "./pages/WishList";
import  LocationsPage from "./pages/LocationsPage";
import  Signup from "./pages/Signup";
import  RecommendationsPage from "./pages/RecommendationsPage";
import  PassReset from "./pages/PasswordReset";

function HomePage() {
  const navigate = useNavigate();

  const handleEnterApp = () => {
    navigate('/login');
  };

  return (
    <div className ="homepage-body2">
    <div className="homepage2">
       <div className="homepage-content">
      <h1 className="homepage-title">My Library App</h1>
      <button className="enter-button" onClick={handleEnterApp}>
        Enter App
      </button>
      </div>
    </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/converted" element={<Converted />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/locations" element={<LocationsPage />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/recommendations" element={<RecommendationsPage />} />
         <Route path="/reset" element={<PassReset />} />
      </Routes>
    </Router>
  );
}

export default App;