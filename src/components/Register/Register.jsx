import React, { useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../AuthContext';
import axios from 'axios';
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  const [termsok, setTermsok] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username,
        password,
        firstname,
        lastname,
        role,
        termsok,
      };
      const response = await axios.post('http://localhost:5000/api/users', newUser);
      console.log('User created:', response.data);
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
      <form id="signformcomp" onSubmit={handleSubmit}>
        <div className='signformera'>
        <div className="firstNameField">
          <label htmlFor="firstName" className="firstName">First Name</label>
          <div>
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control" id="firstName" placeholder="Insert First name" />
          </div>
        </div>
        <div className="lastNameField">
          <label htmlFor="lastName" className="lastName">Last Name</label>
          <div>
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control" id="lastName" placeholder="Insert last name" />
          </div>
        </div>
        <div className="userNameField">
          <label htmlFor="userName" className="userName">User Name</label>
          <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="userName" placeholder="Insert user name" />
          </div>
        </div>
        <div className="passwordField">
          <label htmlFor="password" className="password">Password</label>
          <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="UserPassword" placeholder="Insert password" />
          </div>
        </div>
        <fieldset className="checkboxerea">
          <legend className="sectiontitle">Role</legend>
          <div className="checboxcheck">
            <div className="formcheck">
              <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="Admin" checked={role === 'Admin'} onChange={() => setRole('Admin')} />
              <label className="form-check-label" htmlFor="gridRadios1">Admin</label>
            </div>
            <div className="formcheck">
              <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="User" checked={role === 'User'} onChange={() => setRole('User')} />
              <label className="form-check-label" htmlFor="gridRadios2">User</label>
            </div>
          </div>
        </fieldset>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value={termsok} id="gridCheck1" checked={termsok} onChange={() => setTermsok(!termsok)} />
              <label className="form-check-label" htmlFor="gridCheck1">ok with terms and conditions</label>
            </div>
          </div>
        </div>
        <div className="btnera">
          <button type="submit" className="signbtn">Sign Up</button>
        </div>
        </div>
      </form>
    </>
  );
}
