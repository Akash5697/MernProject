import React from 'react'
import { useAuth } from '../../store/Auth';
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { FaUser,FaRegListAlt,FaHome  } from "react-icons/fa";
import { GrContact } from "react-icons/gr";

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const AdminLayout = () => {
  const { user,isLoading } = useAuth();

//...................................
//this block of code help if you are not admin redirect no home
//...................................
if(isLoading){
  return <h1>Loading...</h1>;
}

  if(!user.isAdmin){
 return <Navigate to='/'/>;
  }
//...................................
//...................................

  return (
    <>
     <header>
      <div className="container">
        <div className="admin-topbar">
      <p className="welcome-text">Welcome, <strong>{capitalizeFirstLetter(user?.username)}</strong></p>
    </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/users"><FaUser style={{ color: "#333", fontSize: "15px", marginRight: "5px" }}/>users</NavLink>
            </li>
            <li>
            <NavLink to="/admin/contacts"><GrContact style={{ color: "#333", fontSize: "15px", marginRight: "5px" }}/>contacts</NavLink>
            </li>
            <li>
            <NavLink to="/admin/services"><FaRegListAlt style={{ color: "#333", fontSize: "15px", marginRight: "5px" }}/>services</NavLink>
            </li>
            <li>
            <NavLink to="/"><FaHome style={{ color: "#333", fontSize: "15px", marginRight: "5px" }}/>home</NavLink>
            </li>
          </ul>
        </nav>
      </div>
     </header>
     <Outlet/>
    </>
  )
}

export default AdminLayout
