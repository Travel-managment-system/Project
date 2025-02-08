import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaMobileAlt, FaBirthdayCake, FaLock, FaUserEdit, FaSave, FaSignOutAlt, FaListAlt, FaHeart } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();

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

  const handleSave = async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
  
    const data = {
      user_id: userId,
      phone: profile.mobile_no,
      dob: profile.dob,
      marital_status: profile.marital_status,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      gender: profile.gender,
      aadhar_no: profile.aadhar_no,
      passport_no: profile.passport_no,
    };
  
    try {
      const response = await axios.put('http://localhost:4000/UpdateProfile', data, {
        headers: { token }
      });
      if (response.data.status === 'success') {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error('Failed to update profile: ' + response.data.message);
      }
    } catch (error) {
      toast.error('Error updating profile: ' + error.message);
    }
  };

  const handleDelete = async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    try {
      const response = await axios.put('http://localhost:4000/update-status', {
        user_id: userId,
        status: 'deactive'
      }, {
        headers: { token }
      });
      if (response.data.status === 'success') {
        toast.success('Profile deactivated successfully!');
        sessionStorage.clear();
        navigate('/login');
      } else {
        toast.error('Failed to deactivate profile: ' + response.data.message);
      }
    } catch (error) {
      toast.error('Error deactivating profile: ' + error.message);
    }
    setShowDeletePopup(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleViewWishlist = () => {
    navigate('/wishlist');
  };

  const handleViewBookings = () => {
    navigate('/bookings');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <button className="btn btn-secondary go-back-btn" onClick={() => navigate('/home')}>
          Go Back
        </button>
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
                  value={profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : ''}
                  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                />
              ) : (
                <p>{profile.dob}</p>
              )}
            </div>
            <div className="profile-field">
              <label>Gender:</label>
              {isEditing ? (
                <select
                  value={profile.gender}
                  onChange={(e) =>
                    setProfile({ ...profile, gender: e.target.value })
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{profile.gender}</p>
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
                  <option value="Other">Other</option>
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
              <button className="btn-delete" onClick={() => setShowDeletePopup(true)}>
                Delete Profile
              </button>
              <button className="btn-secondary" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
              <button className="btn-secondary" onClick={handleViewWishlist}>
                <FaHeart /> View Wishlist
              </button>
              <button className="btn-secondary" onClick={handleViewBookings}>
                <FaListAlt /> View Bookings
              </button>
            
            </div>
          </div>
        </div>
      ) : (
        <p>Profile not found.</p>
      )}

      {showDeletePopup && (
        <div className="delete-popup">
          <div className="delete-popup-content">
            <p>Are you sure you want to delete your account?</p>
            <button className="btn-confirm" onClick={handleDelete}>Yes</button>
            <button className="btn-cancel" onClick={() => setShowDeletePopup(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
