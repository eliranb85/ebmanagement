import React, { useContext } from 'react';
import AuthContext from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <> 
      <div className="herosection">
        <div className="herotext">
          <h1>Home</h1>
          <p>{user ? user.firstname : ''} What do you want to do today?</p>
          <div className="btnerea">
            <button
              type="button"
              className="tasksbtn"
              onClick={() => handleNavigation('/tasks')}
            >
              Tasks
            </button>
            <button
              type="button"
              className="tasksbtn"
              onClick={() => handleNavigation('/seo')}
            >
              SEO
            </button>
            <button
              type="button"
              className="tasksbtn"
              onClick={() => handleNavigation('/analytics')}
            >
              Analytics
            </button>
            <button
              type="button"
              className="tasksbtn"
              onClick={() => handleNavigation('/info')}
            >
              Info
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
