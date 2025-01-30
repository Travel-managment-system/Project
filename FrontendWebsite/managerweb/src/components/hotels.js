import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const token = sessionStorage.getItem('token');
    console.log(token);


    useEffect(() => {
        console.log("object")
        
            axios.get('http://localhost:4000/manager/hotels', {headers: {
                token
            }})
            .then(result => {
                debugger
                setHotels(result.data.data);
              
                      
                 console.log("result is ",result.data.data);
                // console.log("hello",hotels[0].city);
            })
        
         
    },[]);
    return (
        <div className='container'>
            
            <h1>hotels</h1>
            
                <div className="package-container">
                    {hotels.length > 0 ? (
                        hotels.map(pkg => (
                            <div key={pkg.hotel_id} className='box'>
                                  <div >
                            <img 
                                src={"http://localhost:4000/"+pkg.image} 
                                alt={pkg.city} 
                                className='image'/>
                            </div>
                                <h2>{pkg.cost}</h2>
                                <p>{pkg.reviews}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hotels available</p>
                    )}
                </div>

               
            </div>
        );
    
    
};
export default Hotels;