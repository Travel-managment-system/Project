import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import 
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useNavigation } from 'react-router-dom';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const navigation = useNavigation();
const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/login', {
            email: email,
            password: password
        })
        .then(response => {
            
            if (response.data.status === 'success') {
             toast.success('Login successful!');
            console.log('Login successful:', response.data);
            // navigation.navigate('HomePage');
            sessionStorage.setItem('token', response.data.data.token);
            sessionStorage.setItem('role', response.data.data.role);
            navigate('/home');

            } else {
            // Handle login failure
            alert('Login failed:', response.data.message);
            // console.log(response.data.token)
            console.error('Login failed:', response.data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
       
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className='container'>

            <div>
               
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
                                    Dont have an account? <Link to="/register">Register</Link>
                                </div>
                                <button 
                                onClick={handleSubmit}
                                type="submit" className="btn btn-primary mt-3">
                                    Login
                                </button>
                              
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
       
    );
};

export default Login;

