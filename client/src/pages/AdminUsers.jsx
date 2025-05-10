import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import './AdminUsers.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const { authorizationToken,API } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUserdata = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
      console.log("Fetched users:", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User deleted successfully");
        getAllUserdata();
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllUserdata();
  }, []);

  return (
    <section className="admin-users-wrapper">
      <div className="admin-users-container">
        <h1 className="admin-users-title">Admin Users Data</h1>
        <div className="admin-users-table-container">
          <table className="admin-users-table" border="1" cellSpacing="0" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => (
                <tr key={index}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.phone}</td>
                  <td>
                    <Link to={`/admin/users/${curUser._id}/edit`} className="admin-users-edit-btn">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button className="admin-users-delete-btn" onClick={() => deleteUser(curUser._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminUsers;
