import React, { useState, useEffect, useRef } from "react";
import "../Breedformstyles/Breedreport.css";
import Delete from "../Assets/DeleteIcon.svg";
import Edit from "../Assets/EditIcon.svg";

const BreedReport = () => {
  const reportRef = useRef();
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [numberofbreeds, setNumberofBreeds] = useState(0);
  const [searchByName, setSearchByName] = useState("");
  const [generalSearch, setGeneralSearch] = useState("");

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    fetchBreeds();

    const handleOutsideClick = (e) => {
      if (reportRef.current && !reportRef.current.contains(e.target)) {
        setSelectedBreed(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const filtered = breeds.filter((breed) => {
      const matchesName =
        breed.breedName.toLowerCase().includes(searchByName.toLowerCase());
      const matchesGeneral =
        generalSearch === "" ||
        Object.values(breed)
          .join(" ")
          .toLowerCase()
          .includes(generalSearch.toLowerCase());
      return matchesName && matchesGeneral;
    });
    setFilteredBreeds(filtered);
    setNumberofBreeds(filtered.length);
  }, [searchByName, generalSearch, breeds]);

  const fetchBreeds = async () => {
    try {
      const response = await fetch("http://localhost:5000/AddBreedForm");
      const data = await response.json();
      setBreeds(data);
      console.log(setBreeds);
      
      setFilteredBreeds(data);
      setNumberofBreeds(data.length);
    } catch (err) {
      console.error("Error fetching breeds:", err);
    }
  };

  const handleDeleteClick = async (breedId) => {
    if (window.confirm("Are you sure you want to delete this breed?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/DeleteBreedForm/${breedId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Breed deleted successfully!");
          fetchBreeds();
        } else {
          console.error("Failed to delete breed.");
        }
      } catch (err) {
        console.error("Error deleting breed:", err);
      }
    }
  };

  const handleEditClick = (breed) => {
    window.location.href = `/Breeding/CreateBreed?breedId=${breed.id}`;
    localStorage.setItem("editBreedData", JSON.stringify(breed));
  };

  const handleRowClick = (breed) => {
    setSelectedBreed(breed);
  };

  const handleBack = () => {
    window.location.href = "/Breeding";
  };

  const handleEven =(index) =>{
if(index % 2 === 0){
  return { backgroundColor: "#f1f1" }
}
else{
  return {
    backgroundColor: "#F2F2F2"
  }
}
  }

  return (
    <div className="breed_report">
      <h5 className="report_head">Breed Report</h5>
      <p className="numberofbreeds">
        You have <span className="no_of_breeds">{numberofbreeds}</span> breeds
        currently
      </p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Breed Name"
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="General Search"
          value={generalSearch}
          onChange={(e) => setGeneralSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredBreeds.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No:</th>
              <th>Name</th>
              <th>Code</th>
              <th>Origin</th>
              <th>Group</th>
              <th>Type</th>
              <th>Life<br />Expectancy</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Temperament</th>
              <th>Grooming<br />Needs</th>
              <th>Energy</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBreeds.map((breed,index) => (
               <tr
               key={breed.id}
               style={handleEven(index)}
             >
                <td onClick={() => handleRowClick(breed)} className="column_number">{breed.number} </td>
                <td>{breed.breedName}</td>
                <td>{breed.breedCode}</td>
                <td>{breed.breedOrigin}</td>
                <td>{breed.breedGroup}</td>
                <td>{breed.coatType}</td>
                <td>{breed.lifeExpectancy}</td>
                <td>{breed.averageWeight}</td>
                <td>{breed.averageHeight}</td>
                <td>{breed.temperament}</td>
                <td>{breed.groomingNeeds}</td>
                <td>{breed.energyLevel}</td>
                <td>
                  <div className="icons_section">
                    <img
                      src={Delete}
                      alt="Delete"
                      onClick={() => handleDeleteClick(breed.id)}
                      className="action_icons"
                      title="Delete Breed"
                    />
                    <img
                      src={Edit}
                      alt="Edit"
                      onClick={() => handleEditClick(breed)}
                      className="action_icons"
                      title="Edit Breed"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No breed data available. Try refreshing.</p>
      )}

{selectedBreed && (
        <div className="breed-details" ref={reportRef}>
          <h3>Breed Details</h3>
          <p><strong>Breed Name:</strong> {selectedBreed.breedName}</p>
          <p><strong>Breed Code:</strong> {selectedBreed.breedCode}</p>
          <p><strong>Breed Origin:</strong> {selectedBreed.breedOrigin}</p>
          <p><strong>Breed Group:</strong> {selectedBreed.breedGroup}</p>
          <p><strong>Coat Type:</strong> {selectedBreed.coatType}</p>
          <p><strong>Life Expectancy:</strong> {selectedBreed.lifeExpectancy}</p>
          <p><strong>Average Weight:</strong> {selectedBreed.averageWeight}</p>
          <p><strong>Average Height:</strong> {selectedBreed.averageHeight}</p>
          <p><strong>Temperament:</strong> {selectedBreed.temperament}</p>
          <p><strong>Grooming Needs:</strong> {selectedBreed.groomingNeeds}</p>
          <p><strong>Energy Level:</strong> {selectedBreed.energyLevel}</p>
        </div>
      )}

      <div className="button-container">
        <button onClick={fetchBreeds}>Refresh Breeds</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default BreedReport;
