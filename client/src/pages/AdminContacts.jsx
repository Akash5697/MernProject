import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import { toast } from 'react-toastify';
import './AdminContacts.css';

const AdminContacts = () => {
  const { authorizationToken,API } = useAuth();
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContacts(data);
      } else {
        toast.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }; 

  const deleteContactById = async(id)=>{
    try {
      const response =await fetch(`${API}/api/admin/contact/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if(response.ok){
        fetchContacts();
        toast.success('Deleted Successfully');
      }
      else{
        toast.error('Not Deleted'); 
      }
      
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <section className="admin-contacts-section">
      <div className="container">
        <h2>Admin Contacts</h2>
        <div className="admin-contacts">
          <table border="1" cellSpacing="0" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.username}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button className='delete-btn' onClick={() => deleteContactById(contact._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan="4">No contact data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminContacts;
