import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../AuthContext';
import './LogIn.css';

export default function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSign = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const user = response.data.user;
      login(user);  // Update login state
      navigate('/home');  // Navigate to home or another route
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('No user found');
      } else {
        console.error('Error logging in:', error);
      }
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <>
      <form id="formcomp" onSubmit={handleSign}>
        <div className="loginField">
          <div className="userNameField">
            <label htmlFor="userName" className="userName">User Name</label>
            <div>
              <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                id="userName" 
                placeholder="Insert user name" 
              />
            </div>
          </div>
          <div className="passwordField">
            <label htmlFor="password" className="password">Password</label>
            <div>
              <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="UserPassword" 
                placeholder="Insert password" 
              />
            </div>
          </div>
          <div className="btnera">
            <button type="submit" className="loginbtn">Sign in</button>
            <button type="button" onClick={handleRegisterClick} className="registerbtn">Register</button>
          </div>
        </div>
        {message && <span id="msgerror">{message}</span>}
      </form>
      
    </>
  );
}
