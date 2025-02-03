import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar from './navbar';
import Skeleton from './skeleton';
import { useLocation, useNavigate } from 'react-router-dom';


const Packages = () => {
    const location = useLocation();
    const {state}=location;


    const [packages, setPackages] = useState([]);
    const token = sessionStorage.getItem('token');
    // const role = sessionStorage.getItem('role');
    const navigate = useNavigate();
    console.log(token);
    // debugger
console.log(state)
    useEffect(() => {
        console.log("object")
        
            axios.get('http://localhost:4000/packages', {headers: {
                token
            }})
            .then(result => {
                // debugger
                setPackages(result.data.data);
              
                      
                 console.log("result is ",result.data.data);
                // console.log("hello",packages[0].city);
            })
        
         
    },[]);

    const AddPackage = () => {
        navigate('/create-packages',{state});
    }

    return (
        <div className='container'>
            {/* <Navbar/> */}
            <h1>Home Page</h1>
           {/* {  role== 'User' ? (
                <div>
                    <button className='btn btn-primary'>Add Package</button>
                </div>  
            ) : (<div>
                 kuch nhi 
            </div>) */}
 {state.role==='manager' &&<button className='btn btn-primary' onClick={AddPackage}>Add Package</button>}
                <div className="package-container">
                    {packages.length > 0 ? (
                        packages.map(pkg => (
                            <div key={pkg.pkg_id} className='box'>
                                  <div >
                            <img 
                                src={"http://localhost:4000/"+pkg.image} 
                                alt={pkg.city} 
                                className='image'/>
                            </div>
                                <h2>{pkg.city}</h2>
                            </div>
                        )
                    )
                    )
                     :
                      (<>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                                      <Skeleton/>
                    </>
                        
                    )}
                </div>

               
            </div>
        );
    
    
};
export default Packages;