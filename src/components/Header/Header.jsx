import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../AuthContext';
import './Header.css';

function Header() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <span id="welcomemsg">Welcome, {user ? user.firstname : ''}</span>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/Card List">Card List</Link>
          </li>
          <li>
            <button id="logoutbtn" onClick={handleLogout} className="logoutbtn">Log Out</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
