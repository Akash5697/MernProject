import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';
import './AdminServices.css';

const AdminServices = () => {
  const { authorizationToken,API } = useAuth();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    provider: "",
    service: "",
    description: "",
    price: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);


  const fetchServices = async () => {
    try {
      const response = await fetch(`${API}/api/admin/services`, {
        headers: { Authorization: authorizationToken }
      });
      const data = await response.json();
      setServices(data);
    } catch (error) {
      toast.error("Failed to load services");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/api/admin/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: authorizationToken }
      });
      toast.success("Service deleted");
      fetchServices();
    } catch (error) {
      toast.error("Error deleting service");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing
      ? `${API}/api/admin/services/${editId}`
      : `${API}/api/admin/services`;
  
    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(form),
      });
  
      toast.success(isEditing ? "Service updated" : "Service created");
      setForm({ provider: "", service: "", description: "", price: "", image: "" });
      setIsEditing(false);
      setEditId(null);
      fetchServices();
    } catch (error) {
      toast.error("Operation failed");
    }
  };
  

  const handleEdit = (service) => {
    setForm(service);
    setEditId(service._id);
    setIsEditing(true);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section className="admin-services">
      <h2 className="admin-title">Manage Services</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />


        <input
          className="form-input"
          type="text"
          placeholder="Provider"
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Service"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <button className="form-button" type="submit">
          {isEditing ? "Update" : "Add"} Service
        </button>
      </form>

      <ul className="services-list">
        {services.map((srv) => (
          <li className="service-item" key={srv._id}>
            <div className="service-info">
              <strong>{srv.service}</strong> - ₹{srv.price}
            </div>
            <div className="service-actions">
              <button className="edit-btnn" onClick={() => handleEdit(srv)}>Edit</button>
              <button className="delete-btnn" onClick={() => handleDelete(srv._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AdminServices;
