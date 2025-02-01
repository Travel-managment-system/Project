import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Flights = () => {
    const [Flights, setFlights] = useState([]);
    const token = sessionStorage.getItem('token');
    console.log(token);


    useEffect(() => {
        console.log("object")
        
            axios.get('http://localhost:4000/vehicles/typeAirplane', {headers: {
                token
            }})
            .then(result => {
                debugger
                setFlights(result.data.data);
              
                      
                 console.log("result is ",result.data.data);
                // console.log("hello",hotels[0].city);
            })
        
         
    },[]);
    return (
        <div className='container'>
            
            <h1>hotels</h1>
            
                <div className="package-container">
                    {Flights.length > 0 ? (
                        Flights.map(flight => (
                            <div key={flight.vehicle_id} className='box'>
                                  <div >
                            <img 
                                src={"http://localhost:4000/"+flight.image} 
                                alt={flight.name} 
                                className='image'/>
                            </div>
                              
                            </div>
                        ))
                    ) : (
                        <p>No flights available</p>
                    )}
                </div>

               
            </div>
        );
    
    
};
export default Flights;