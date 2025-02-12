import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Flights = () => {
    const [Flights, setFlights] = useState([]);
    const token = sessionStorage.getItem('token');
    console.log(token);


    useEffect(() => {
        console.log("object")
        
            axios.get('https://project-ivory-eta.vercel.app/typeAirplane', {headers: {
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
            
            
                <div className="package-container">
                    {Flights.length > 0 ? (
                        Flights.map(flight => (
                            <div key={flight.vehicle_id} className='box'>
                                <h2>{flight.name}</h2>
                                <h6>cost:{flight.cost}</h6>
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