import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
         localStorage.setItem("userId", data.userId);
        navigate('/converted');
      } else {
        setError(data.message || 'Login failed');
      }

    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="login-body2">
   
        <div className='login-page2'>
             <div className='login-page-content2'>
          <h1 className="homepage-title">Log In</h1>

       

          <form onSubmit={handleSubmit} className="login-form">
            <input 
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="enter-button" type="submit">
              Enter App
            </button>

            {error && <p className="error">{error}</p>}
             <p className='signup'> Don't have an account? <Link to="/signup" className= "signup_link">Sign up</Link> </p>  
      <p className='password'> Forgot your <Link to="/reset" className= "password_link">Password?</Link> </p> 
          </form>
      </div>
      
     </div>
    
    </div>
       
  );
}

export default LoginPage;