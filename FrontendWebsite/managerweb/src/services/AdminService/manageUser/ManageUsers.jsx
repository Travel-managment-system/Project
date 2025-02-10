import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    axios.get('http://localhost:4000/admin/users', { headers: { token } })
      .then(response => {
        // Check if response data is an array
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          // Handle unexpected response structure
          console.error('Unexpected response structure:', response.data);
          toast.error('Failed to fetch users');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    const token = sessionStorage.getItem('token');

    axios.delete(`http://localhost:4000/admin/users/${userId}`, { headers: { token } })
      .then(response => {
        if (response.data.status === 'success') {
          setUsers(users.filter(user => user.user_id !== userId));
          toast.success('User deleted successfully!');
        } else {
          toast.error('Failed to delete user: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error deleting user: ' + error.message));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
  };

  const handleSaveEdit = () => {
    const token = sessionStorage.getItem('token');

    axios.put(`http://localhost:4000/admin/users/${editingUser.user_id}`, formData, { headers: { token } })
      .then(response => {
        if (response.data.status === 'success') {
          setUsers(users.map(user => user.user_id === editingUser.user_id ? { ...user, ...formData } : user));
          toast.success('User updated successfully!');
          setEditingUser(null);
          setFormData({
            first_name: '',
            last_name: '',
            email: ''
          });
        } else {
          toast.error('Failed to update user: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error updating user: ' + error.message));
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: ''
    });
  };

  const handleChangeStatus = (user) => {
    const token = sessionStorage.getItem('token');
    const newStatus = user.status === 'active' ? 'deactive' : 'active';
    const user_id=user.user_id
    console.log(user_id)

    axios.put(`http://localhost:4000/admin/user/status`, { status: newStatus ,user_id:user_id}, { headers: { token } })
      .then(response => {
        if (response.data.status === 'success') {
          setUsers(users.map(u => u.user_id === user.user_id ? { ...u, status: newStatus } : u));
          toast.success(`User status changed to ${newStatus}!`);
        } else {
          toast.error('Failed to change user status: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error changing user status: ' + error.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      
      {editingUser && (
        <div className="edit-user-form">
          <h3>Edit User</h3>
          <form>
            <label>First Name</label>
            <input
              type="text"
              value={formData.first_name}
              onChange={e => setFormData({ ...formData, first_name: e.target.value })}
            />
            <label>Last Name</label>
            <input
              type="text"
              value={formData.last_name}
              onChange={e => setFormData({ ...formData, last_name: e.target.value })}
            />
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <div className="form-actions">
              <button type="button" onClick={handleSaveEdit}>Save</button>
              <button type="button" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
                <button className="status-btn" onClick={() => handleChangeStatus(user)}>
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ManageUsers;
