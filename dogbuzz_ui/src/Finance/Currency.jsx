import React, { useState, useEffect } from 'react';
import './currency.css';
import Delete from "../Assets/DeleteIcon.svg"
import Edit from "../Assets/EditIcon.svg"
import { Helmet } from 'react-helmet';
const Currency = () => {
  const initialState = {
    currencyName: "",
    currencyAbbreviation: "",
    currencySymbol: ""
  };

  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currencies, setCurrencies] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = data.id?"PUT":"POST";
      const url = data.id ? `http://localhost:5000/edit_currency/${data.id}` : "http://localhost:5000/add_currency"
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const currencyData = await response.json();
      if (response.ok) {
        setData(initialState);
        setSuccess(currencyData.message);
        setError("");
        fetchCurrency(); // Refresh the currency list after adding
      } else {
        setError(currencyData.error || "Error adding currency.");
        setSuccess("");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setSuccess("");
    }
  };

  const fetchCurrency = async () => {
    try {
      const response = await fetch("http://localhost:5000/fetch_currency", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      if (response.ok) {
        setCurrencies(data.data);
        setSuccess("");
        setError("");
      } else {
        setSuccess("");
        setError(data.error);
      }
    } catch (err) {
      setError("Error fetching currency, check your internet connection!");
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
      setSuccess('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [error, success]);


  const handleSmartBg = (index) => {
   
    if (index % 2 === 0) {
        return { backgroundColor: "#F3E3F3" };
    } else {
        return { backgroundColor: "#F2F2F2" };
    }
};


const handleEditClick =(id)=>{
const singlerow = currencies.find(acc => acc.id === id);
if ( singlerow){
  console.log(singlerow);
  setData({...singlerow})
}
}

const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/delete_currency/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const del = await response.json();
    if (response.ok) {
      setSuccess(del.message);
      setError("");
      fetchCurrency(); // Refresh the list after deletion
    } else {
      setError(del.error || "Error deleting currency.");
      setSuccess("");
    }
  } catch (error) {
    setError("Error deleting currency, check your internet connection!");
    console.error("Delete error:", error);
  }
};



  return (
    <div className="currency_wrapper">
      <Helmet>
        <title>Currency Setup</title>
      </Helmet>
      <div className='report_table'>
        <table className='currency_report_table'>
          <thead>
            <tr>
              <th>No:</th>
              <th>Currency Name</th>
              <th>Currency Abbreviation</th>
              <th>Currency Symbol</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {currencies.length > 0 ? currencies.map((curr, idx) => (
    <tr key={idx} style={handleSmartBg(idx)} className='purchaseacc_row'>
      <td>{idx + 1}.</td>
      <td>{curr.currencyName}</td>
      <td>{curr.currencyAbbreviation}</td>
      <td>{curr.currencySymbol}</td>
      <td>
        <div className="icons_section">
          <img
            src={Delete}
            alt="Delete"
            onClick={() => handleDelete(curr.id)}
            className="action_icons"
            title="Delete Account"
          />
          <img
            src={Edit}
            alt="Edit"
           onClick={() => handleEditClick(curr.id)}
            className="action_icons"
            title="Edit Account"
          />
        </div>
      </td>
    </tr>
  )): <p>No data available...</p>}
</tbody>
        </table>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
<div className='currency_container_finance'>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr className='account-table-rows'>
              <td className='account-table-rows-rightborder'>Currency Name</td>
              <td><input type="text" name='currencyName' value={data.currencyName} onChange={handleChange} required /></td>
            </tr>
            <tr className='account-table-rows'>
              <td className='account-table-rows-rightborder'>Currency Abbreviation</td>
              <td><input type="text" name='currencyAbbreviation' value={data.currencyAbbreviation} onChange={handleChange} required /></td>
            </tr>
            <tr className='account-table-rows'>
              <td className='account-table-rows-rightborder'>Currency Symbol</td>
              <td><input type="text" placeholder='&' name='currencySymbol' value={data.currencySymbol} onChange={handleChange} required /></td>
            </tr>
          </tbody>
        </table>
        <div className='actionbtn_container'>
        <button type="submit" className='submit_data'>{data.id ? "Update" : "Submit" }</button>
        <button type="button" className='cancel_data' onClick={() => setData(initialState)}>
    Clear
  </button>
  </div>
      </form>
      </div>
    </div>
  );
};

export default Currency;