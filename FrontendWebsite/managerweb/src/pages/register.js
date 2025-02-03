// import { Toast } from "bootstrap";
// import { registerManager } from "";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../services/user";

function Register() {
    const navigate = useNavigate();
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
 const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   
    const handleRegister = async () => {
//    if (password !== confirmPassword) {
// console.log(firstName,lastName,email,password)

if(firstName==='' || lastName==='' || email==='' || password==='' || confirmPassword===''){
        toast.error('All fields are required');     }
        else if(password !== confirmPassword){
            toast.warn('Password does not match');
        }
        // debugger
        else{
            console.log(email)
        const result = await register(firstName, lastName, email, password);
        debugger
        console.log(result);
        if (result.status === 'success') {
            toast.success('Registration successful!');
            navigate('/');
        } else {
            toast.error('Registration failed:', result.message);
        console.log(result.message);
        console.log(result)
        }    
    }
        
    }
    return ( <>

<div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            
                        <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="f_name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="l_name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="email">email address</label>
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
                                <div className="form-group">
                                    <label htmlFor="confirm password">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="C_password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                               
                                <div>Already have an account? <Link to="/">Login</Link></div>
                      
                                <button 
                                    onClick={handleRegister}
                                    type="submit" className="btn btn-primary mt-3">
                                    Register
                                </button>
  
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </> );
}

export default Register;