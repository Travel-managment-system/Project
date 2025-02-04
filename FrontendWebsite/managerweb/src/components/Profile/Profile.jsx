import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    axios.get('http://localhost:4000/personal-details', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.data.status === 'success') {
        setProfile(response.data.data[0]);
        setLoading(false);
        toast.success('Profile fetched successfully!');
      } else {
        toast.error('Failed to fetch profile: ' + response.data.message);
      }
    })
    .catch(error => {
      toast.error('Error: ' + error.message);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h3>User Profile</h3>
      {profile ? (
        <div className="card">
          <div className="card-body">
            <p><strong>First Name:</strong> {profile.first_name}</p>
            <p><strong>Last Name:</strong> {profile.last_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Mobile No:</strong> {profile.mobile_no}</p>
            <p><strong>Date of Birth:</strong> {profile.dob}</p>
            <p><strong>Aadhar No:</strong> {profile.aadhar_no}</p>
            <p><strong>Passport No:</strong> {profile.passport_no}</p>
            <p><strong>Marital Status:</strong> {profile.marital_status}</p>
          </div>
        </div>
      ) : (
        <p>Profile not found.</p>
      )}
    </div>
  );
};

export default Profile;
