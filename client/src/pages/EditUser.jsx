import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import './EditUser.css';
import { toast } from 'react-toastify';


const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken, API } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: ''
  });

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${API}/api/admin/users/${id}`, {
        headers: {
          Authorization: authorizationToken
        }
      });
      const data = await res.json();
      setFormData({
        username: data.username || '',
        email: data.email || '',
        phone: data.phone || ''
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/admin/users/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success('User updated successfully');
        navigate('/admin/users');
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <section className="edit-user-section">
      <div className="container">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit} className="edit-user-form">
          <label>
            Name:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="update-btn">Update User</button>
        </form>
      </div>
    </section>
  );
};

export default EditUser;
