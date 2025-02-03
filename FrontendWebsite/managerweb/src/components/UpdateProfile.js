import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    phone: '',
    dob: '',
    aadhar_no: '',
    passport_no: '',
    marital_status: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:4000/profile', profile, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      console.log('Profile updated successfully', response.data);
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="container">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={profile.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={profile.dob} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="aadhar_no">Aadhaar Number:</label>
          <input type="text" id="aadhar_no" name="aadhar_no" value={profile.aadhar_no} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="passport_no">Passport Number:</label>
          <input type="text" id="passport_no" name="passport_no" value={profile.passport_no} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="marital_status">Marital Status:</label>
          <select id="marital_status" name="marital_status" value={profile.marital_status} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
