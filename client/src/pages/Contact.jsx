import React, { useState } from 'react'
import "../pages/Contact.css";
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';

const defaultContectform = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {

  const [contact, setContact] = useState(defaultContectform);
  const [userData, setUserData] = useState("true");

  const { user, API } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(contact),
      });

      if (response.ok) {
          setContact(defaultContectform);
          const data = await response.json();
          console.log(data);
          toast.success("message send successfully");
      }

    } catch (error) {
      toast.error("message not send");
      console.log(error);

    }


  };
  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contactimp.jpg" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.18261586156345!2d88.40256955705088!3d22.61939318639592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f86b093e7a3%3A0x82c0c1bf1d6b810e!2sSadhana%20Apartment!5e0!3m2!1sen!2sin!4v1746432347566!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
      </section>
    </>
  )
}

export default Contact
