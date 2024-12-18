import React, { useState, useEffect } from "react";
import "../Breedformstyles/AddBreedForm.css";

const AddBreedForm = () => {
  const [formData, setFormData] = useState({
    breedName: "",
    breedCode: "",
    breedOrigin: "",
    breedGroup: "",
    coatType: "Short",
    lifeExpectancy: "",
    averageWeight: "",
    averageHeight: "",
    temperament: "",
    groomingNeeds: "",
    energyLevel: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Check for existing edit data in localStorage
    const editData = localStorage.getItem("editBreedData");
    if (editData) {
      setFormData(JSON.parse(editData));
      localStorage.removeItem("editBreedData"); // Clear after loading
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const url = formData.id
      ? `http://localhost:5000/EditBreedForm/${formData.id}`
      : "http://localhost:5000/AddBreedForm";

    const method = formData.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setFormData({
          breedName: "",
          breedCode: "",
          breedOrigin: "",
          breedGroup: "",
          coatType: "Short",
          lifeExpectancy: "",
          averageWeight: "",
          averageHeight: "",
          temperament: "",
          groomingNeeds: "",
          energyLevel: "",
        });
      } else {
        setError(result.message || "Failed to save breed.");
      }
    } catch (err) {
      setError("An error occurred while saving the breed. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      breedName: "",
      breedCode: "",
      breedOrigin: "",
      breedGroup: "",
      coatType: "Short",
      lifeExpectancy: "",
      averageWeight: "",
      averageHeight: "",
      temperament: "",
      groomingNeeds: "",
      energyLevel: "",
    });
    setError("");
    setSuccess("");
    window.location.href = "/Breeding";
  };

  return (
    <div className="form-container">
      <h2>{formData.id ? "Edit Breed" : "Add New Breed"}</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="breedName">Breed Name</label>
          <input
            type="text"
            id="breedName"
            name="breedName"
            value={formData.breedName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="breedCode">Breed Code</label>
          <input
            type="text"
            id="breedCode"
            name="breedCode"
            value={formData.breedCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="breedOrigin">Breed Origin</label>
          <input
            type="text"
            id="breedOrigin"
            name="breedOrigin"
            value={formData.breedOrigin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="breedGroup">Breed Group</label>
          <input
            type="text"
            id="breedGroup"
            name="breedGroup"
            value={formData.breedGroup}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coatType">Coat Type</label>
          <select
            id="coatType"
            name="coatType"
            value={formData.coatType}
            onChange={handleChange}
            required
          >
            <option value="Short">Short</option>
            <option value="Long">Long</option>
            <option value="Curly">Curly</option>
            <option value="Hairless">Hairless</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="lifeExpectancy">Life Expectancy</label>
          <input
            type="text"
            id="lifeExpectancy"
            name="lifeExpectancy"
            value={formData.lifeExpectancy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="averageWeight">Average Weight</label>
          <input
            type="text"
            id="averageWeight"
            name="averageWeight"
            value={formData.averageWeight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="averageHeight">Average Height</label>
          <input
            type="text"
            id="averageHeight"
            name="averageHeight"
            value={formData.averageHeight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="temperament">Temperament</label>
          <input
            type="text"
            id="temperament"
            name="temperament"
            value={formData.temperament}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="groomingNeeds">Grooming Needs</label>
          <input
            type="text"
            id="groomingNeeds"
            name="groomingNeeds"
            value={formData.groomingNeeds}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="energyLevel">Energy Level</label>
          <input
            type="text"
            id="energyLevel"
            name="energyLevel"
            value={formData.energyLevel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            {formData.id ? "Update Breed" : "Submit"}
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBreedForm;
