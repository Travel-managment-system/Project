import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerVehicles.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ManagerVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
  const [newVehicleUniqueNo, setNewVehicleUniqueNo] = useState('');
  const [newVehicleType, setNewVehicleType] = useState('');
  const [newVehicleName, setNewVehicleName] = useState('');
  const [newVehicleCost, setNewVehicleCost] = useState('');
  const [editVehicleId, setEditVehicleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    // Fetch vehicles
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

    axios.delete(`http://localhost:4000/manager/vehicles/${vehicleId}`, { headers: { token } })
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

  const handleAddVehicle = () => {
    const token = sessionStorage.getItem('token');
    const newVehicle = {
      unique_no: newVehicleUniqueNo,
      type: newVehicleType,
      name: newVehicleName,
      cost: newVehicleCost
    };

    axios.post('http://localhost:4000/manager/vehicles', newVehicle, {
      headers: { token }
    })
      .then(response => {
        if (response.data.status === 'success') {
          setVehicles([...vehicles, response.data.data]);
          toast.success('Vehicle added successfully!');
          setShowAddVehicleForm(false);
          setNewVehicleUniqueNo('');
          setNewVehicleType('');
          setNewVehicleName('');
          setNewVehicleCost('');
        } else {
          toast.error('Failed to add vehicle: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error adding vehicle: ' + error.message));
  };

  const handleEditVehicle = () => {
    const token = sessionStorage.getItem('token');
    const updatedVehicle = {
      unique_no: newVehicleUniqueNo,
      type: newVehicleType,
      name: newVehicleName,
      cost: newVehicleCost
    };

    axios.put(`http://localhost:4000/manager/vehicles/${editVehicleId}`, updatedVehicle, {
      headers: { token }
    })
      .then(response => {
        if (response.data.status === 'success') {
          setVehicles(vehicles.map(vehicle => vehicle.vehicle_id === editVehicleId ? response.data.data : vehicle));
          toast.success('Vehicle updated successfully!');
          setShowAddVehicleForm(false);
          setNewVehicleUniqueNo('');
          setNewVehicleType('');
          setNewVehicleName('');
          setNewVehicleCost('');
          setEditVehicleId(null);
        } else {
          toast.error('Failed to update vehicle: ' + response.data.message);
        }
      })
      .catch(error => toast.error('Error updating vehicle: ' + error.message));
  };

  const handleEditButtonClick = (vehicle) => {
    setShowAddVehicleForm(true);
    setNewVehicleUniqueNo(vehicle.unique_no);
    setNewVehicleType(vehicle.type);
    setNewVehicleName(vehicle.name);
    setNewVehicleCost(vehicle.cost);
    setEditVehicleId(vehicle.vehicle_id);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.unique_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.cost.toString().includes(searchTerm)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-vehicles-container">
      <h2>Manage Vehicles</h2>
      <button className="home-btn" onClick={() => navigate('/')}>Home</button>
      <button className="add-vehicle-btn" onClick={() => setShowAddVehicleForm(!showAddVehicleForm)}>
        {showAddVehicleForm ? 'Cancel' : 'Add Vehicle'}
      </button>
      <input
        type="text"
        placeholder="Search Vehicles"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {showAddVehicleForm && (
        <div className="add-vehicle-form">
          <input
            type="text"
            placeholder="Unique No"
            value={newVehicleUniqueNo}
            onChange={(e) => setNewVehicleUniqueNo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Type"
            value={newVehicleType}
            onChange={(e) => setNewVehicleType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={newVehicleName}
            onChange={(e) => setNewVehicleName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cost"
            value={newVehicleCost}
            onChange={(e) => setNewVehicleCost(e.target.value)}
          />
          {editVehicleId ? (
            <button className="submit-btn" onClick={handleEditVehicle}>Update Vehicle</button>
          ) : (
            <button className="submit-btn" onClick={handleAddVehicle}>Add Vehicle</button>
          )}
        </div>
      )}
      <table className="vehicles-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Unique No</th>
            <th>Type</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map(vehicle => (
            <tr key={vehicle.vehicle_id}>
              <td>{vehicle.vehicle_id}</td>
              <td>{vehicle.unique_no}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.name}</td>
              <td>{vehicle.cost}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditButtonClick(vehicle)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteVehicle(vehicle.vehicle_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerVehicles;
