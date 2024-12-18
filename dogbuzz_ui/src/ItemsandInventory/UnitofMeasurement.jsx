


import React, { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './unitofMeasurement.css';
import Delete from "../Assets/DeleteIcon.svg"
import Edit from "../Assets/EditIcon.svg"
const UnitofMeasurement = () => {
  const [unit, setUnit] = useState({
    name: '',
    abbreviation: '',
    decimalPlace: '',
    unitType: '',
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [measure, setmeasure] = useState([]);

  const [editingMeasureId, setEditingMeasureId] = useState(null);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUnit({ ...unit, [name]: value });
  };

  const fetchmeasures = async () => {
    try {
      const response = await fetch("http://localhost:5000/Addunitofmeasure", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorMessage = `HTTP error! status: ${response.status}`;
        setErrorMessage(errorMessage);
      
        return;
      }
  
      const data = await response.json();
      
      
      if (data.unit_of_measures && Array.isArray(data.unit_of_measures)) {
        setmeasure(data.unit_of_measures); // Extract the array and set state
      
      } else {
        setErrorMessage("Invalid data format received.");
        
      }
    } catch (error) {
      setErrorMessage("Failed to fetch measures.");
      
    }
  };
  

  useEffect(()=>{
    fetchmeasures()
  },[]);

//   const handleUnitSetup = async (e) => {
//     e.preventDefault();
//     console.log(unit);
//     setUnit({ name: '', abbreviation: '', decimalPlace: '', unitType: '', description: '' });

//     const response = await fetch("http://localhost:5000/Addunitofmeasure", {
//         method: 'POST',
//         body: JSON.stringify(unit),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     } else {
//         alert('Unit of Measure added successfully!');
//         fetchmeasures();
//     }
// };

const handleUnitSetup = async (e) => {
  e.preventDefault();

  const endpoint = editingMeasureId
      ? `http://localhost:5000/EditMeasure/${editingMeasureId}`
      : "http://localhost:5000/Addunitofmeasure";

  const method = editingMeasureId ? 'PUT' : 'POST';

  try {
      const response = await fetch(endpoint, {
          method,
          body: JSON.stringify(unit),
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert(editingMeasureId ? 'Unit of Measure updated successfully!' : 'Unit of Measure added successfully!');
      setUnit({ name: '', abbreviation: '', decimalPlace: '', unitType: '', description: '' });
      setEditingMeasureId(null); // Reset editing ID
      setErrorMessage(''); // Clear errors
      fetchmeasures(); // Refresh measures
  } catch (error) {
      console.error("Error saving unit of measure:", error);
      setErrorMessage("Failed to save unit of measure.");
  }
};




const handleMeasureDeletion = async (id) => {
  try {
      const response = await fetch(`http://localhost:5000/DeleteMeasure/${id}`, {
          method: 'DELETE'
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
          alert('Unit of Measure deleted successfully!');

          // Reset the form if the deleted measure is the one being edited
          if (editingMeasureId === id) {
              setUnit({ name: '', abbreviation: '', decimalPlace: '', unitType: '', description: '' });
              setEditingMeasureId(null);
          }

          fetchmeasures(); // Refresh the list of measures
      }
  } catch (error) {
      console.error("Error deleting unit of measure:", error);
      setErrorMessage("Failed to delete unit of measure.");
  }
};



const handleMeasureEdit =(item)=>{
  setUnit(item)
  setEditingMeasureId(item.id);
}





  return (
    <>
      <Helmet>
        <title>Unit of Measurement</title>
      </Helmet>
      <h4 className="unit-form-header">Unit of Measure</h4>
      <hr />
      <div>
        <table>
          <thead>
            <tr>
              <th>No:</th>
              <th>Name</th>
              <th>Abbreviation</th>
              <th>Decimal Place</th>
              <th>Unit Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(measure) && measure.length > 0 ? (
    measure.map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.abbreviation}</td>
        <td>{item.decimalPlace}</td>
        <td>{item.unitType}</td>
        <td>{item.description}</td>
        <td>
        <div className="icons_section">
                                        <img
                                            src={Delete}
                                            alt="Delete"
                                            onClick={() => handleMeasureDeletion(item.id)}
                                            className="action_icons_delete"
                                            title="Delete Tax"
                                        />
                                        <img
                                            src={Edit}
                                            alt="Edit"
                                            onClick={() => handleMeasureEdit(item)}
                                            className="action_icons"
                                            title="Edit Tax"
                                        />
                                    </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No units of measure found.</td>
    </tr>
  )}
          </tbody>
        </table>
      </div>
      <div className="unitformsetupcontainer">
        <form className="unit-form" onSubmit={handleUnitSetup}>
          <div className="form-grid">
            <label htmlFor="UnitName" className="form-label">Unit Name:</label>
            <input
              type="text"
              name="name"
              value={unit.name}
              onChange={handleInput}
              className="form-input"
              required
            />

            <label htmlFor="UnitAbbreviation" className="form-label">Unit Abbreviation:</label>
            <input
              type="text"
              name="abbreviation"
              value={unit.abbreviation}
              onChange={handleInput}
              className="form-input"
              required
            />

            <label htmlFor="DecimalPlace" className="form-label">Decimal Place:</label>
            <select
              name="decimalPlace"
              value={unit.decimalPlace}
              onChange={handleInput}
              className="form-select"
              required
            >
              <option value="">Select Decimal Place</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <label htmlFor="UnitType" className="form-label">Unit Type:</label>
            <input
              type="text"
              name="unitType"
              value={unit.unitType}
              onChange={handleInput}
              className="form-input"
              placeholder="Length, Weight, Volume, Area, Time"
              required
            />

            <label htmlFor="Description" className="form-label">Description:</label>
            <textarea
              name="description"
              value={unit.description}
              onChange={handleInput}
              className="form-textarea"
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="form-submit-btn">Submit</button>
            <button
              type="reset"
              className="form-back-btn"
              onClick={() => setUnit({ name: '', abbreviation: '', decimalPlace: '', unitType: '', description: '' })}
            >
              Reset
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
       
      </div>
    </>
  );
};

export default UnitofMeasurement;
