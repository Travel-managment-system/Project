import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaMobileAlt, FaBirthdayCake, FaLock, FaUserEdit, FaSave } from 'react-icons/fa'; // Importing icons
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    axios
      .get('http://localhost:4000/profile', {
        headers: { token },
        params: { user_id: userId },
      })
      .then((response) => {
        if (response.data.status === 'success') {
          setProfile(response.data.data[0]);
          setLoading(false);
        } else {
          console.log(response.data.message);
          toast.error('Failed to fetch profile: ' + response.data.message);
        }
      })
      .catch((error) => {
        toast.error('Error: ' + error.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Implement save functionality here
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h3>User Profile</h3>
      {profile ? (
        <div className="card">
          <div className="card-body">
            <div className="profile-field">
              <FaUser className="icon" />
              <label>First Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.first_name}
                  onChange={(e) =>
                    setProfile({ ...profile, first_name: e.target.value })
                  }
                />
              ) : (
                <p>{profile.first_name}</p>
              )}
            </div>
            <div className="profile-field">
              <FaUser className="icon" />
              <label>Last Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.last_name}
                  onChange={(e) =>
                    setProfile({ ...profile, last_name: e.target.value })
                  }
                />
              ) : (
                <p>{profile.last_name}</p>
              )}
            </div>
            <div className="profile-field">
              <FaEnvelope className="icon" />
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>
            <div className="profile-field">
              <FaMobileAlt className="icon" />
              <label>Mobile No:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.mobile_no}
                  onChange={(e) =>
                    setProfile({ ...profile, mobile_no: e.target.value })
                  }
                />
              ) : (
                <p>{profile.mobile_no}</p>
              )}
            </div>
            <div className="profile-field">
              <FaBirthdayCake className="icon" />
              <label>Date of Birth:</label>
              {isEditing ? (
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                />
              ) : (
                <p>{profile.dob}</p>
              )}
            </div>
            <div className="profile-field">
              <FaLock className="icon" />
              <label>Aadhar No:</label>
              <p>{profile.aadhar_no}</p>
            </div>
            <div className="profile-field">
              <FaLock className="icon" />
              <label>Passport No:</label>
              <p>{profile.passport_no}</p>
            </div>
            <div className="profile-field">
              <label>Marital Status:</label>
              {isEditing ? (
                <select
                  value={profile.marital_status}
                  onChange={(e) =>
                    setProfile({ ...profile, marital_status: e.target.value })
                  }
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              ) : (
                <p>{profile.marital_status}</p>
              )}
            </div>
            <div className="profile-buttons">
              {isEditing ? (
                <button className="btn-save" onClick={handleSave}>
                  <FaSave /> Save
                </button>
              ) : (
                <button className="btn-edit" onClick={handleEdit}>
                  <FaUserEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Profile not found.</p>
      )}
    </div>
  );
};

export default Profile;
