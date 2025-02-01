import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import 

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const token = sessionStorage.getItem('token');
    console.log(token);


    useEffect(() => {
        console.log("object")
        
            axios.get('http://localhost:4000/vehicles', {headers: {
                token
            }})
            .then(result => {
                debugger
                setVehicles(result.data.data);
              
                      
                 console.log("result is ",result.data.data);
                // console.log("hello",packages[0].city);
            })
        
         
    },[]);
    return (
        <div>
            <h1>vehicles</h1>
            <div >
                <div className="package-container">
                    {vehicles.length > 0 ? (
                        vehicles.map(pkg => (
                            <div key={pkg.unique_no} className='box'>
                                <h2>{pkg.name}</h2>
                                <h6>Type:{pkg.type}</h6>
                            </div>
                        ))
                    ) : (
                        <p>No vehicles available</p>
                    )}
                </div>

               
            </div>
        </div>
    );
    
    
};
export default Vehicles;
