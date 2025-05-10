import React from 'react'
import './Noaccess.css'
const Noaccess = () => {
    return (
        <div className="access-denied-container">
        <h1 className="access-denied-title">🚫 Access Denied</h1>
        <p className="access-denied-message">
          You do not have permission to access the Admin Panel.
        </p>
  
        <div className="access-note-section">
          <h3>📝 Note:</h3>
          <p><strong>Purpose:</strong> Accessing the Admin Panel</p>
          <p>
            <strong>Requirement:</strong> To access the Admin Panel, please log in using an account with administrative privileges. Access is restricted for standard users.
          </p>
        </div>
  
        <div className="access-steps-section">
          <h4>🔐 Admin Access Instructions</h4>
          <ol>
            <li>Log out of your current session.</li>
            <li>Log in using the admin credentials provided below:</li>
          </ol>
          <div className="credentials-box">
            <p><strong>Email:</strong> akashgoswami@gmail.com</p>
            <p><strong>Password:</strong> akash12345</p>
          </div>
          <p style={{}}>
            ⚠️ This account has admin privileges required to access the Admin Panel.
          </p>
          <p className="admin-note">
           ❌ Please refrain from deleting admin details <strong>"Akash Goswami"</strong> from users in the database using admin privileges, as it may negatively impact the overall experience and functionality of the admin panel in the project.
          </p>
        </div>
      </div>
    );
}

export default Noaccess
