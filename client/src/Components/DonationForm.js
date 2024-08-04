import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../main.css';

const DonationForm = () => {
  const [quantity, setQuantity] = useState('');
  const [specialRequestQuantity, setSpecialRequestQuantity] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [inventoryStatus, setInventoryStatus] = useState(null);
  const [reminderMethod, setReminderMethod] = useState('call');
  const [donationDate, setDonationDate] = useState('');
  const [email, setEmail] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReminderOptions, setShowReminderOptions] = useState(false);

  useEffect(() => {
     axios.get('http://localhost:5000/admin')
      .then(response => {
        const category = response.data.category;
        if (category) {
          setSpecialRequests(`We currently only accept ${category}.`);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the special requests!', error);
      });
  }, []);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSpecialRequestQuantityChange = (event) => {
    setSpecialRequestQuantity(event.target.value);
  };

  const handleDateChange = (event) => {
    setDonationDate(event.target.value);
  };

  const handleReminderChange = (event) => {
    setReminderMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/inventory', {
      quantity: quantity,
      specialRequestQuantity: specialRequestQuantity,
      specialRequests: specialRequests
    })
    .then(response => {
      const isAvailable = response.data.isAvailable;

      if (isAvailable) {
        setInventoryStatus(null);
        setShowDatePicker(true);
        setShowReminderOptions(false);
      } else {
        setInventoryStatus('Currently, the inventory is full. We will send you a reminder when the inventory becomes free again.');
        setShowDatePicker(false);
        setShowReminderOptions(true);
      }
    })
    .catch(error => {
      console.error('There was an error processing your donation!', error);
    });
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleConfirmDate = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/appointments', {
      donationDate: donationDate,
      email:email
    })
    .then(response => {
      alert('Donation date confirmed successfully!');
      setQuantity('');
      setSpecialRequestQuantity('');
      setDonationDate('');
      setShowDatePicker(false);
      setShowReminderOptions(false);
      setInventoryStatus(null);
    })
    .catch(error => {
      console.error('There was an error confirming the donation date!', error);
    });
  };

  const handleReminderSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost5000/reminder', {
      reminderMethod: reminderMethod
    })
    .then(response => {
      alert(`response.data ${reminderMethod}`);
      setQuantity('');
      setSpecialRequestQuantity('');
      setReminderMethod('call');
      setShowReminderOptions(false);
      setInventoryStatus(null);
    })
    .catch(error => {
      console.error('There was an error submitting the reminder preference!', error);
    });
  };

  return (
    <div className="donation-form">
      <h1>I want to donate...</h1>
      
      {specialRequests && (
        <div className="special-requests">
          <h2>Special Requests from the NGO</h2>
          <p>{specialRequests}</p>
        </div>
      )}

      <div className="warning-message">
        <p>We kindly request you to not donate innerwear or torn clothes.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="donation-section">
          <p>I want to donate approximately</p>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
            placeholder=""
          />
          <p>clothes</p>
        </div>

        {specialRequests && (
          <div className="special-request-section">
            <p>I want to donate approximately</p>
            <input
              type="number"
              value={specialRequestQuantity}
              onChange={handleSpecialRequestQuantityChange}
              className="quantity-input"
              placeholder=""
            />
            <p>{specialRequests.replace('We currently only accept ', '').replace('.', '')}</p>
          </div>
        )}

        <button type="submit" className="donate-button">
          Donate
        </button>
      </form>

      {inventoryStatus && (
        <div className="inventory-status">
          <p>{inventoryStatus}</p>
          
          {showReminderOptions && (
            <form onSubmit={handleReminderSubmit} className="reminder-form">
              <p>How would you like to receive the reminder?</p>
              <select
                value={reminderMethod}
                onChange={handleReminderChange}
                className="reminder-select"
              >
                <option value="call">Call</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
              <button type="submit" className="reminder-button">
                Submit Reminder Preference
              </button>
            </form>
          )}
        </div>
      )}

      {showDatePicker && (
        <form onSubmit={handleConfirmDate} className="date-form">
          <p>Select a donation date</p>
          <input
            type="date"
            value={donationDate}
            onChange={handleDateChange}
            className="date-input"
          />
          <p>Please enter your email id for a reminder</p>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="email-input"
        />
          <button type="submit" className="confirm-button">
            Confirm Donation Date
          </button>
        </form>
      )}
    </div>
  );
};

export default DonationForm;