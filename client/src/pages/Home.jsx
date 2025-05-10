import React from 'react';
import "../pages/Home.css";
import Analytics from "../components/Analytics";
import Button from "../components/Button"

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-content">
          <p>Empowering Developers with Real-World Projects</p>
            <h1>Welcome to CodeCraft </h1>
            <p>
              Dive into the world of full-stack development with hands-on MERN Stack tutorials, best practices, and real-world project insights. Whether you're a beginner or scaling your skills, CodeCraft Blog is your go-to resource for modern web development.
              
            </p>
            <Button/>
          </div>

          {/* Hero Image */}
          <div className="hero-image">
            <img
              src="/images/pic01.jpg"
              alt="team coding"
              className="responsive-img"
            />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <Analytics />

      {/* Call to Action Section */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* CTA Image */}
          <div className="hero-image">
            <img
              src="/images/pic2.avif"
              alt="design collaboration"
              className="responsive-img"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how CodeCraft can help your business thrive in
              the digital age.
            </p>
            <Button/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
