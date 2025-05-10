import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "../pages/Register.css"
import { useAuth } from '../store/Auth' 
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Register = () => {
  const [user, setUser] = useState({
    username :"",
    email : "",
    phone : "",
    password :""
  });

  const navigate = useNavigate();
  const {storeTokenINLS,API} = useAuth();

  const handelInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${API}/api/auth/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user)
      });

      console.log("Register Data Submitted:", response);


      const res_data = await response.json();
      console.log("response form server",res_data);
      if(response.ok){
        toast.success("Login Successful")
        //store the token in localhost
        storeTokenINLS(res_data.token);
        setUser({
          username :"", 
          email : "",
          phone : "",
          password :""
        });
        navigate("/");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }
    }
    catch(error){
      console.log("Register",error);
      toast.error("Something went wrong. Please try again.");
    }
  };
 

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src="/images/regpic.avif" 
                alt="img" 
                width="500" 
                height="500"/>
              </div>

              {/* let tackle registration form */}

              <div className="registration-form">
                <h1 className='main-heading mb-3'>registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input 
                    type="text"
                    name="username"
                    placeholder='username'
                    id='username'
                    required
                    autoComplete='off'
                    value={user.username}
                    onChange={handelInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input 
                    type="email"
                    name="email"
                    placeholder='email'
                    id='email'
                    required
                    autoComplete='off'
                    value={user.email}
                    onChange={handelInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input 
                    type="number"
                    name="phone"
                    placeholder='phone'
                    id='phone'
                    required
                    autoComplete='off'
                    value={user.phone}
                    onChange={handelInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input 
                    type="password"
                    name="password"
                    placeholder='password'
                    id='password'
                    required
                    autoComplete='off'
                    value={user.password}
                    onChange={handelInput}
                    />
                  </div>
                  <br />
                  <button type='submit' className='btn btn-submit'>Register Now</button>
                </form>
                <p className='form-peragraph'>Already have an account?<Link to ="/login">Login</Link></p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Register
