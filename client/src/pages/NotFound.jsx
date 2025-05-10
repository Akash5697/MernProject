import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p className="message">Oops! The page you're looking for doesn't exist.</p>
      
      <div className="buttons">
        <button className="btn" onClick={() => window.location.href = '/'}>Go Home</button>
        <button className="btn outline" onClick={() => window.location.href = '/contact'}>Report Issue</button>
      </div>

      <div className="contact-info">
        <p>Need help? Contact us:</p>
        <p>Email: support@example.com</p>
        <p>Phone: +1 123 456 7890</p>
      </div>
    </div>
  );
};

export default NotFound;
