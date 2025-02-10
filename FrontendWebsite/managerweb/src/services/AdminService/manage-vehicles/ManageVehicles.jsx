import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageVehicles.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    axios.get('http://localhost:4000/vehicles', { headers: { token } })
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setVehicles(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          toast.error('Failed to fetch vehicles');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vehicles:', error);
        setLoading(false);
      });
  }, []);

  const handleDeleteVehicle = (vehicleId) => {
    const token = sessionStorage.getItem('token');

    axios.delete(`http://localhost:4000/admin/vehicles/${vehicleId}`, { headers: { token } })
      .then(response => {
        if (response.data.status === 'success') {
          setVehicles(vehicles.filter(vehicle => vehicle.vehicle_id !== vehicleId));
          toast.success('Vehicle deleted successfully!');
        } else {
          toast.error('Failed to delete vehicle: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error deleting vehicle: ' + error.message));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-vehicles-container">
      <h2>Manage Vehicles</h2>
      <table className="vehicles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.vehicle_id}>
              <td>{vehicle.vehicle_id}</td>
              <td>{vehicle.name}</td>
              <td>{vehicle.cost}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteVehicle(vehicle.vehicle_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVehicles;
