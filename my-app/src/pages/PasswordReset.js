import React from 'react';
import { useNavigate } from 'react-router-dom';



export default function PassReset() {
  const navigate = useNavigate();

  const handleEnterApp = () => {
    navigate('/');
  };

  return (
    <div className ="homepage-body3">
    <div className="homepage3">
       <div className="homepage-content3">
      <h1 className="homepage-title">Reset Your Password </h1> 
      <p className='password-message'> Email us at admin@personalizedbookappforme.net to reset your password.</p>
      <button className="enter-button2" onClick={handleEnterApp}>
        Home
      </button>
      </div>
    </div>
    </div>
  );
}