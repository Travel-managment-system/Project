import React, { useEffect, useState } from 'react';
import './Weather.css'
const WeatherComponent = () => {
  const cityName = sessionStorage.getItem('cityName');
  const city=cityName
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
//smoke , light rain , light intensity drizzle, few clouds,
//haze, clear sky, moderate rain,overcast clouds, rain snow cloud

  const apiKey = '428c9373bd5582835a5b832ed587785c'; // Replace with your actual API key

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const data = await response.json();
  
      if (response.ok) {

        setWeather(data);
        debugger
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

 useEffect (() => {
  if (city) {
    fetchWeather();
    }
    }, [city]);
  return (
    <div className="weather-component">
    
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>Temperature: {Math.floor(weather.main.temp-273.14)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <div>{weather.icon}</div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
