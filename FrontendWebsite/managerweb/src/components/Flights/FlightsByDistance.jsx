import React, { useState } from 'react';
import axios from 'axios';
import './FlightComponent.css'; // Import the CSS file

const FlightComponent = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [error, setError] = useState(null);

  const baseCostPerKm = 10; // Example base cost per kilometer

  const calculateFare = (distance) => {
    return distance * baseCostPerKm;
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.get('http://localhost:4000/distance', {
        params: { source, destination },
      });
      const dist = response.data.distance;
      setDistance(dist);
      const fare = calculateFare(dist);
      console.log(fare)
      setFare(fare);
      setError(null);
    } catch (err) {
      setError('Failed to calculate fare');
      setDistance(null);
      setFare(null);
    }
  };

  return (
    <div className="flight-component">
      <h2>Calculate Flight Fare</h2>
      <div className="input-group">
        <label>Source:</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Enter source"
        />
      </div>
      <div className="input-group">
        <label>Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
        />
      </div>
      <button className="calculate-btn" onClick={handleCalculate}>
        Calculate Fare
      </button>
      {error && <p className="error">{error}</p>}
      {distance && (
        <div className="result">
          <p>Distance: {distance} km</p>
          <p>Fare: ${fare}</p>
        </div>
      )}
    </div>
  );
};

export default FlightComponent;
