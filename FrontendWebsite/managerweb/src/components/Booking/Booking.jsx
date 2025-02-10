import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Booking = () => {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingDate] = useState(new Date());
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(0);

  const userId = sessionStorage.getItem('userId');
  const hotelId = sessionStorage.getItem('hotelId');
  const placeId = sessionStorage.getItem('placeId');
  const cityId = sessionStorage.getItem('cityId');
  const [hotelDetails, setHotelDetails] = useState({});
  const [placeDetails, setPlaceDetails] = useState({});
  const [cityName, setCityName] = useState(sessionStorage.getItem('cityName'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    // Fetch hotel details
    axios.get(`http://localhost:4000/hotel/${hotelId}`, { headers: { token } })
      .then(response => {
        setHotelDetails(response.data.data[0]);
      })
      .catch(error => console.error('Error fetching hotel details:', error));

    // Fetch place details
    axios.get(`http://localhost:4000/places/${placeId}`, { headers: { token } })
      .then(response => {
        setPlaceDetails(response.data.data);
        setCityName(response.data.data.city_name);
      })
      .catch(error => console.error('Error fetching place details:', error));

    // Fetch vehicles
    axios.get(`http://localhost:4000/vehicles`, { headers: { token } })
      .then(response => {
        setVehicles(response.data.data);
      })
      .catch(error => console.error('Error fetching vehicles:', error));
  }, [hotelId, placeId]);

  useEffect(() => {
    // Calculate total amount based on fetched costs
    const calculateTotalAmount = () => {
      let total=0;
      const hotelCost = hotelDetails.cost || 0;
      const vehicleCost = selectedVehicle ? Number(selectedVehicle.cost) : 0;
     total = (hotelCost + vehicleCost) * peopleCount;
    console.log( total+vehicleCost)
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [hotelDetails, selectedVehicle, peopleCount]);

  const formatDateForMySQL = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleConfirmBooking = () => {
    const token = sessionStorage.getItem('token');

    const bookingData = {
      user_id: userId,
      hotel_id: hotelId,
      place_id: placeId,
      city_id: cityId,
      vehicle_id: selectedVehicle ? selectedVehicle.vehicle_id : null,
      booking_date: formatDateForMySQL(new Date()),
      departure_date: formatDateForMySQL(departureDate),
      return_date: formatDateForMySQL(returnDate),
      people_count: peopleCount,
      total_amount: totalAmount
    };

    if (bookingData.departure_date === null || bookingData.return_date === null || bookingData.city_id === null 
      || bookingData.hotel_id === null || bookingData.place_id === null || bookingData.user_id === null) {
      toast.warning('All fields are required');
    } else {
      toast.success('Booking confirmed successfully!');
  
      axios.post('http://localhost:4000/bookings', bookingData, { headers: { token } })
        .then(response => {
          console.log(response);
          console.log(response.data);
          if (response.data.status === 'success') {
            // Reset or clear any relevant data
          } else {
            toast.error('Failed to confirm booking: ' + response.data.message);
          }
        })
        .catch(error => toast.error('Error confirming booking: ' + error.message));
    navigate('/home')
      }
    console.log("object booking end code");
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleViewTravelHistory = () => {
    navigate('/travel-history'); // Navigate to the travel history page
  };

  const incrementPeopleCount = () => {
    setPeopleCount(peopleCount + 1);
  };

  const decrementPeopleCount = () => {
    if (peopleCount > 1) {
      setPeopleCount(peopleCount - 1);
    }
  };

  return (
    <div className="booking-container">
      <h2>New Booking</h2>
      <div className="details-container">
        <div className="detail-item">
          <label>Hotel: </label>
          <span>{hotelDetails.name} (Cost: {hotelDetails.cost})</span>
        </div>
        <div className="detail-item">
          <label>Place: </label>
          <span>{placeDetails.name}</span>
        </div>
        <div className="detail-item">
          <label>City: </label>
          <span>{cityName}</span>
        </div>
      </div>
      <div className="form-group">
        <label>Departure Date</label>
        <DatePicker selected={departureDate} onChange={date => setDepartureDate(date)} />
      </div>
      <div className="form-group">
        <label>Return Date</label>
        <DatePicker selected={returnDate} onChange={date => setReturnDate(date)} />
      </div>
      <div className="form-group">
        <label>Vehicle</label>
        <select value={selectedVehicle ? selectedVehicle.vehicle_id : ''} onChange={e => setSelectedVehicle(vehicles.find(v => v.vehicle_id === parseInt(e.target.value)))}>
          <option value="">Select Vehicle</option>
          {vehicles.map(vehicle => (
            <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
              {vehicle.name} (Cost: {vehicle.cost})
            </option>
          ))}
        </select>
      </div>
      <div className="people-count-group">
        <label>People Count</label>
        <div className="people-count-controls">
          <button className="count-btn" onClick={decrementPeopleCount}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <div className="people-count-circle">
            {peopleCount}
          </div>
          <button className="count-btn" onClick={incrementPeopleCount}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <div className="form-group">
        <label>Total Amount</label>
        <p>{totalAmount}</p>
      </div>
      <button className="confirm-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
      <button className="go-back-btn" onClick={handleGoBack}>Go Back</button>
      <button className="travel-history-btn" onClick={handleViewTravelHistory}>Travel History</button>
    </div>
  );
};

export default Booking;
