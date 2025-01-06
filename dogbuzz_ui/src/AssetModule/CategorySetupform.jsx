import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CategorySetupform.css";
import { Helmet } from 'react-helmet';
const CategorySetupform = () => {
  const navigate = useNavigate();
  const [taxTypes, setTaxTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unit,setunit] = useState([]);
  const [purchase, setPurchase] = useState([]);
 const [category, setCategory] = useState({
  categoryName: "",
  categoryDescription: "",
  categoryTaxType: "",
  categoryUnitOfMeasure:"",
  ExcludefromSale:false,
  ExcludefromPurchase:false,
  salesAccount:"",
  assetAccount:"",
  workArea:""

 });
const [salesaccounts, setSalesaccounts] = useState([]);
const fetchSalesAccounts = async()=>{
  try {
      const response = await fetch("http://localhost:5000/GetAllSalesAccounts",{
          method: "GET",
          headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
          throw new Error("Something went wrong!");
      }
      const salesAccounts = await response.json();
      setSalesaccounts(salesAccounts.data);
     console.log(salesAccounts.data);
     
      
  } catch (err) {
      console.error(err);
  }
}
 




  useEffect(() => {
    const fetchTaxTypes = async () => {
      try {
        const response = await fetch('http://localhost:5000/AddTax');
        const data = await response.json();

        if (data.success) {
          setTaxTypes(data.data); 
        } else {
          setError("Failed to fetch tax types");
        }
      } catch (err) {
        setError("Error fetching tax types");
      } finally {
        setLoading(false);
      }
    };

    fetchTaxTypes();


    const fetchUnitofMeasure = async () => {
      try {
          const response = await fetch('http://localhost:5000/Addunitofmeasure'); // Corrected URL
          const data = await response.json();
          console.log(data);
          
          if (response.ok) { // Check for a successful response
              setunit(data.unit_of_measures);
          } else {
              setError("Failed to fetch unit of measure");
          }
      } catch (err) {
          setError("Error fetching unit of measure");
      }
  };
    fetchUnitofMeasure();


    const fetchPurchaseAccounts = async () => {
      setLoading(true); // Assuming setLoading is a state to show loading status
      try {
          const response = await fetch("http://localhost:5000/FetchPurchaseAccount", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const json = await response.json();
          setPurchase(json);
          console.log("Accounts:", json); // Log the actual data
  
      } catch (error) {
          console.error('Error:', error);
          setError('Failed to fetch purchase accounts');
      } finally {
          setLoading(false);
      }
  };
  
 
  fetchPurchaseAccounts();

  fetchSalesAccounts()
  }, []);

const handleCategoryChange =(e)=>{
  const { name, value, type, checked } = e.target;
  
  // If the input is a checkbox, use the checked property to set the state
  if (type === 'checkbox') {
    setCategory({ ...category, [name]: checked });
  } else {
    setCategory({ ...category, [name]: value });
  }
}


  const handleCategorySubmission = async (event) => {
    event.preventDefault();
    console.log(category);
    
  }

  return (
    <div className="categoryformsetupcontainer">
      <Helmet>
        <title>
          Category Setup Form
        </title>
      </Helmet>
      <h4 className="category-form-header">Category Setup</h4>
      {loading && <p>Loading tax types...</p>}
      {error && <p className="error-message">{error}</p>}
      <form className="category-form" onSubmit={handleCategorySubmission}>
        <label htmlFor="categoryName" className="form-label">Category Name:</label>
        <input type="text" id="categoryName" value={category.categoryName} name="categoryName" className="form-input" onChange={handleCategoryChange} required />

        <label htmlFor="categoryDescription" className="form-label">Category Description:</label>
        <textarea id="categoryDescription" onChange={handleCategoryChange} value={category.categoryDescription} name="categoryDescription" className="form-textarea" rows="4" cols="50"/>

        <label htmlFor="categoryTaxType" className="form-label">Category Tax Type:</label>
        <select id="categoryTaxType" onChange={handleCategoryChange} name="categoryTaxType" className="form-select" required>
          <option value={category.categoryTaxType}>Select Tax Type</option>
          {taxTypes.map(item => (
            <option key={item._id} value={item._id}>{item.taxType}</option>
          ))}
        </select>

        <label htmlFor="categoryUnitOfMeasure" className="form-label">Unit of Measure:</label>
        <select id="categoryUnitOfMeasure" onChange={handleCategoryChange} value={category.categoryUnitOfMeasure} name="categoryUnitOfMeasure" className="form-select" required>
          <option value="">Select Unit of Measure</option>
          {unit.map((val,idx)=>(
            <option key={idx} value={val._id}>{val.name}</option>
          ))}
      
        </select>

        <div className="form-checkbox">
          <input type="checkbox" onChange={handleCategoryChange} checked={category.ExcludefromSale} id="excludeFromSale" className="form-checkbox-input" name="ExcludefromSale" />
          <label htmlFor="excludeFromSale" className="form-checkbox-label">Exclude from Sale</label>
        </div>

        <div className="form-checkbox">
          <input type="checkbox" onChange={handleCategoryChange} checked={category.ExcludefromPurchase} id="excludeFromSale" className="form-checkbox-input" name="ExcludefromPurchase" />
          <label htmlFor="excludeFromSale" className="form-checkbox-label">Exclude from Purchase</label>
        </div>

        <label htmlFor="salesAccount" className="form-label">Miscell Account:</label>
        <select id="salesAccount" onChange={handleCategoryChange} value={category.salesAccount} name="salesAccount" className="form-select" >
          <option value="">Select Sales Account</option>
          {salesaccounts.map((val,idx)=>(
            <option key={idx} value={val.id}>{val.accountName}</option>
          ))}
        </select>



        <label htmlFor="assetAccount" className="form-label">Purchase Account:</label>
        <select id="assetAccount" onChange={handleCategoryChange} value={category.assetAccount} name="assetAccount" className="form-select" >
          <option value="">Select Purchase Account</option>
        {purchase.map((val,idx)=>(
          <option key={idx} value={val.id}>{val.accountName}</option>
        ))}
        </select>

        

        <label htmlFor="workArea" className="form-label">Work Area:</label>
        <select id="workArea" onChange={handleCategoryChange} value={category.workArea} name="workArea" className="form-select" required>
          <option value="">Select Work Area</option>
          <option value="Short">Short</option>
            <option value="Long">Long</option>
            <option value="Curly">Curly</option>
        </select>

        <div className="form-buttons">
          <button type="submit" className="form-submit-btn">Submit</button>
          <button type="button" className="form-back-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default CategorySetupform;