import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import "../pages/Login.css";
import { useAuth } from '../store/Auth'
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { storeTokenINLS,API } = useAuth();

  // Alert msg will accesing protected Routes (need to revision the code ones)
  //  Show alert if redirected from protected route
  const location = useLocation();
  
  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  //.........................................................

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  //  Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", user);
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });

      console.log("login Data Submitted:", response);
      const res_data = await response.json();

      if (response.ok) {
        console.log("response form server", res_data);
        storeTokenINLS(res_data.token);
        toast.success("Login Successful")

        // Clear form
        setUser({
          email: "",
          password: ""
        });

        // Redirect to home page
        navigate("/");
      } else {
        console.log("Invalid Credentials")
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)

      }
    }
    catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section>
      <main>
        <div className="section-login">
          <div className="container grid grid-two-cols">

            <div className="login-image">
              <img
                src="/images/logpic2.jpg"
                alt="login-img"
                width="500"
                height="500"
              />
            </div>

            <div className="login-form">
              <h1 className="main-heading mb-3">Login Form</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">Login</button>
              </form>
              <p className='form-peragraph'>Don't have an account?<Link to ="/register">Register</Link></p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login;
