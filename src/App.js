import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn.jsx';
import Register from './components/Register/Register.jsx';
import Header from './components/Header/Header.jsx';
import Home from './components/Home/Home.jsx';
import Tasks from './components/Tasks/Tasks.jsx';
import DraggableCardList from './components/DraggableCardList/DraggableCardList.jsx'
import Analytics from './components/Analytics/Analytics.jsx'
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/Card List" element={<DraggableCardList/>}/>
          <Route path="/" element={<LogIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
