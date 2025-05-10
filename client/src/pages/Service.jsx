import React from 'react';
import { useAuth } from '../store/Auth';
import './Service.css';

const Service = () => {
  const { services } = useAuth();
  console.log("services", services);

  if (!Array.isArray(services)) {
    return <p>Loading services...</p>; 
  }

  return (
    <section className="services-section">
      <div className="services-container">
        <h1 className="services-heading">Our Services</h1>

        <div className="services-grid">
          {services.map((curElem, index) => {

            return(
            <div className="service-card" key={index}>
              <div className="card-img">
              <img src={curElem.image || "/images/design.png"} alt={curElem.service} />
              </div>
              <div className="card-content">
                <div className="card-header">
                  <p className="provider">{curElem.provider}</p>
                  <p className="price">{curElem.price}</p>
                </div>
                <h2 className="service-title">{curElem.service}</h2>
                <p className="service-description">{curElem.description}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;
