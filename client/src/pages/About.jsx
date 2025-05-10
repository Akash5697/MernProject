import React, { useState, useEffect } from 'react';
import "../pages/About.css";
import Button from "../components/Button";
import Analytics from "../components/Analytics";
import { useAuth } from '../store/Auth';

const About = () => {
  const [name, setName] = useState("");
  const { user } = useAuth();


  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <section className="section-about">
        <div className="container grid grid-two-cols">
          <div className="about-content">
            <h2>About CodeCraft</h2>
            <p style={{ fontWeight: "bold" }}> {user ? `${capitalizeFirstLetter(user.username)} Welcome To our Website` : `To our Website`}</p>
            <p>
              At <strong>CodeCraft</strong>, we are passionate about crafting modern web solutions using the power of the MERN stack.
              With a team of dedicated developers and tech enthusiasts, our mission is to deliver scalable, secure, and user-friendly applications that help your business thrive.
            </p>
            <p>
              From dynamic blogs and content platforms to full-scale enterprise systems, we build products that are both beautiful and performant.
            </p>
            <p>
              We're not just developers—we're your tech partners. Let’s build something amazing together.
            </p>
            <div className='btn-container'>
              <Button />
            </div>
          </div>
          <div className="about-image">
            <img src="images/mern.jpeg" alt="About CodeCraft team illustration" />
          </div>
        </div>
        {/* Analytics Section */}
        <Analytics />
      </section>
    </>
  );
};

export default About;
