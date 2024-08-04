import React, { useState } from "react";
import "./App.css"; // Ensure to import the CSS file
import "bootstrap/dist/css/bootstrap.min.css";

const FormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [inputCapacity, setInputCapacity] = useState("");
  const [checked, setChecked] = useState(false);
  const [isSpecialRequirement, setIsSpecialRequirement] = useState(false);

  const handleSpecialRequirementChange = (value) => {
    setIsSpecialRequirement(value === "yes");
    if (value === "no") {
      setCategory("");
      setQuantity("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("City:", city);
    console.log("Category:", category);
    console.log("Quantity:", quantity);
    console.log("Capacity:", capacity);
    console.log("Input Capacity:", inputCapacity);
    console.log("Checked:", checked);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <select
          id="city"
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select a city</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Asansol">Asansol</option>
          <option value="Siliguri">Siliguri</option>
          <option value="Durgapur">Durgapur</option>
          <option value="Bardhaman">Bardhaman</option>
          <option value="Malda">Malda</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Special Requirement</label>
        <div>
          <input
            type="radio"
            id="specialRequirementYes"
            name="specialRequirement"
            value="yes"
            onChange={(e) => handleSpecialRequirementChange(e.target.value)}
          />
          <label htmlFor="specialRequirementYes">Yes</label>
          <input
            type="radio"
            id="specialRequirementNo"
            name="specialRequirement"
            value="no"
            onChange={(e) => handleSpecialRequirementChange(e.target.value)}
          />
          <label htmlFor="specialRequirementNo">No</label>
        </div>
      </div>
      {isSpecialRequirement && (
        <>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category of Special Requirement
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity of Special Requirement
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="mb-3">
        <label htmlFor="inputCapacity" className="form-label">
          Input capacity
        </label>
        <input
          type="text"
          className="form-control"
          id="inputCapacity"
          value={inputCapacity}
          onChange={(e) => setInputCapacity(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="capacity" className="form-label">
          Max Capacity
        </label>
        <input
          type="range"
          className="form-range"
          id="capacity"
          max="500"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <span>{capacity}</span>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

const App = () => {
  return (
    <div className="App">
      <div className="main-content">
        <div className="intro">
          <h1>Admin Panel For Inventory Management</h1>
          <p>Welcome to our Inventory Management System</p>
        </div>
        <div className="main-form">
          <FormComponent />
        </div>
      </div>
    </div>
  );
};

export default App;