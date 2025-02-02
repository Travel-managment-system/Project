import React, { useState } from 'react';

const WeatherComponent = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '428c9373bd5582835a5b832ed587785c'; // Replace with your actual API key

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const data = await response.json();

      console.log(Math.floor(data.main.temp-273.15))
      console.log(data)
      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeather(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-component">
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
