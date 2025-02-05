import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import the CSS file
import NavBar2 from '../../components/Navbar/NavBar2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/login', { email, password })
      .then((response) => {
        if (response.data.status === 'success') {
          toast.success('Login successful!');
          const role = response.data.data.role;
          const userId = response.data.data.userId;
          sessionStorage.setItem('token', response.data.data.token);
          sessionStorage.setItem('userId', userId);
          navigate('/home', { state: { role } });
        } else {
          toast.error('Login failed: ' + response.data.message);
        }
      })
      .catch((error) => {
        toast.error('Error: ' + error.message);
      });
  };

  return (<>

  <div className='body-login'>
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-form">
        <h2>Welcome Back</h2>
        <p>Please log in to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
          <div className="register-link">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
    
</div>
</>
  );
};

export default Login;
