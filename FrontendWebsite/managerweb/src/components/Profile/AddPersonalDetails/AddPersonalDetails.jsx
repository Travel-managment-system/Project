import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddPersonalDetails.css';
import { FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddPersonalDetails = () => {
  const [details, setDetails] = useState({
    mobile_no: '',
    dob: '',
    gender: '',
    marital_status: '',
    aadhar_no: '',
    passport_no: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };



  const handleSave = async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
  
    const data = {
      user_id: userId,
      mobile_no: details.mobile_no,
      dob: details.dob,
      gender: details.gender,
      marital_status: details.marital_status,
      aadhar_no: details.aadhar_no,
      passport_no: details.passport_no
    };
  
    try {
      const response = await axios.post('http://localhost:4000/AddPersonalDetails', data, {
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });
      if (response.data.status === 'success') {
        toast.success('Personal details added successfully!');
        navigate('/profile');
      } else {
        toast.error('Failed to add personal details: ' + response.data.message);
      }
    } catch (error) {
      toast.error('Error adding personal details: ' + error.message);
    }
  };
  

  return (
    <div className="add-personal-details-container">
      <h2>Add Personal Details</h2>
      <div className="form-group">
        <label>Mobile No:</label>
        <input
          type="text"
          name="mobile_no"
          value={details.mobile_no}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={details.dob}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select
          name="gender"
          value={details.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Marital Status:</label>
        <select
          name="marital_status"
          value={details.marital_status}
          onChange={handleChange}
        >
          <option value="">Select Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Aadhar No:</label>
        <input
          type="text"
          name="aadhar_no"
          value={details.aadhar_no}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Passport No:</label>
        <input
          type="text"
          name="passport_no"
          value={details.passport_no}
          onChange={handleChange}
        />
      </div>
      <button className="btn-save" onClick={handleSave}>
        <FaSave /> Save
      </button>
    </div>
  );
};

export default AddPersonalDetails;
