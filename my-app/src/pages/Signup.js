import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ username: "", password: "", first_name: "", last_name: ""});
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.setItem("userId", data.userId); // <-- store the userId
        navigate('/converted');
      } else {
        setError(data.message || 'Login failed');
      }

    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="login-body">
   
        <div className='login-page'>
             <div className='login-page-content'>
          <h1 className="homepage-title">Sign Up</h1>

       

          <form onSubmit={handleSubmit} className="login-form">
            <input 
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange= {(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
              required
            />

            <input 
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
              required
            />

            <button className="enter-button" type="submit">
              Sign up
            </button>

          
                {error && <p className="error">{error}</p>}
            <p className='signup'> Already have an account? <Link to="/login" className= "signup_link">Log in</Link> </p> 
            
          

          </form>
      </div>
      
     </div>
    
    </div>
       
  );
}

export default SignupPage;