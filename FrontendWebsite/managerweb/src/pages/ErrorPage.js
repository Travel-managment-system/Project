import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // Import the CSS file for styling

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="error-page-container">
      <div className="error-page-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <button onClick={handleGoBack} className="btn btn-primary">
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
