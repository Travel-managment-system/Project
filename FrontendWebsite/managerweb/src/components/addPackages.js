// import { Toast } from "bootstrap";
// import { registerManager } from "";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPackage } from "../services/manager";

function AddPackages() {
    const location = useLocation();
    const {state} = location
console.log(state.role)
if(state.role!=='manager'){
     navigate('/ErrorPage')
}
    const navigate = useNavigate();
        const [city, setCity] = useState('');
        const [description, setDescription] = useState('');
        const [image, setImage] = useState('');
        const token = sessionStorage.getItem('token');
//     const Onsubmit = async () => {
// //    if (password !== confirmPassword) {
// if(city==='' || description==='' || image===''){
//         toast.error('All fields are required');     }

//         // debugger
//         else{
//         //     console.log("hello")
//         const result = await createPackage();
//         // debugger
//         console.log(result);
//         if (result.status === 'success') {
//             toast.success('package added successfully!');
//             navigate('/');
//         } else {
//             toast.error('Registration failed:', result.message);
//         console.log(result.message);
//         }    
//     }
        
//     }
const Onsubmit = async (e) => {
    e.preventDefault();
    if (!city || !description || !image) {
        toast.error('All fields are required');
        return;
    }
    const formData = new FormData();
    formData.append('city', city);
    formData.append('description', description);
    formData.append('image', image);

    const result = await createPackage(formData, token);
    if (result.status === 'success') {
        toast.success('Package added successfully!');
        navigate('/');
    } else {
        toast.error('Registration failed:', result.message);
        console.log(result.message);
    }
};



    return ( <>

<div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3>Add Package</h3>
                        </div>
                        <div className="card-body">
                            
                        <div className="form-group">
                                    <label htmlFor="firstName">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="f_name"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName"> Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="l_name"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="text"> image</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="img"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        required
                                    />
                                </div>
                                <button 
                                    onClick={Onsubmit}
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

export default AddPackages;