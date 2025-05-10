import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../store/Auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const { isLoggedIn, isAdmin } = useAuth();


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Close the menu when a link is clicked
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="container1">
        <div className="logo-brand">
          <NavLink to="/">CodeCraft</NavLink>
        </div>

        <div
          className={`hamburger ${isOpen ? 'hide' : ''}`}
          onClick={toggleMenu}
          ref={hamburgerRef}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <nav ref={menuRef} className={`nav-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
            <li><NavLink to="/service" onClick={closeMenu}>Service</NavLink></li>

            {
              isAdmin?
              <li><NavLink to="/admin" onClick={closeMenu}>Admin</NavLink></li> :
              <li><NavLink to="/no-access" onClick={closeMenu}>Admin</NavLink></li> 
            }

            {isLoggedIn ?
              <li><NavLink to="/logout" onClick={closeMenu}>Logout</NavLink></li> :
              <>
                <li><NavLink to="/register" onClick={closeMenu}>Register</NavLink></li>
                <li><NavLink to="/login" onClick={closeMenu}>Login</NavLink></li>
              </>
            }


          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
