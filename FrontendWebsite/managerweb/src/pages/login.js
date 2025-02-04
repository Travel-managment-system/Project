import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/login', {
      email,
      password
    })
    .then(response => {
      if (response.data.status === 'success') {
        toast.success('Login successful!');
        const role = response.data.data.role;
        const userId = response.data.data.userId; // Get userId from the response
        sessionStorage.setItem('token', response.data.data.token);
        sessionStorage.setItem('userId', userId);
        navigate('/home', { state: { role } });
      } else {
        toast.error('Login failed: ' + response.data.message);
      }
    })
    .catch(error => {
      toast.error('Error: ' + error.message);
    });
  };

  return (
    <div className='container'>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  Don't have an account? <Link to="/register">Register</Link>
                </div>
                <button 
                  onClick={handleSubmit}
                  type="submit" 
                  className="btn btn-primary mt-3">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
