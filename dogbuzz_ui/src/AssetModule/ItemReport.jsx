import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

const ItemReport = () => {
    const BASE_URL = process.env.REACT_APP_API_URL 
   
    
  const [itemData, setItemData] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch data from API
  const fetchItems = useCallback(async () => {
    
    try {
        // Clear previous success/error states
        setSuccess('');
        setError('');

        const response = await fetch(`${BASE_URL}/fetchItems`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (response.ok) {
            setItemData(data.data);
            console.log('Fetched item data:', data.data);
            setSuccess(data.success || 'Data fetched successfully!');
        } else {
            setError(data.error || 'Failed to load data!');
        }
    } catch (err) {
        console.error(err);
        setError('Failed to load data!');
    }
}, [BASE_URL]);

useEffect(() => {
    fetchItems();
}, [fetchItems]);
  useEffect(() => {
    if (error || success) {
        const timer = setTimeout(() => {
            setError('');
            setSuccess('');
        }, 9000);
        return () => clearTimeout(timer);
    }
}, [error, success]);
  return (
    <div>
      <span className="setups_acc_head">Item List</span>
      <hr />
      <div className="item-header-section">
        <NavLink to="/asset-management" className="account_setup" activeClassName="active">
          <h6 className="account-header-title">Asset Hub</h6>
        </NavLink>
        <NavLink to="/assetmanagement/itemsetup" className="account_setup" activeClassName="active">
          <h6 className="account-header-title">Add Item</h6>
        </NavLink>
        <NavLink to="/assetmanagement/createcategory" className="account_setup" activeClassName="active">
          <h6 className="account-header-title">Category-Item</h6>
        </NavLink>
      </div>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <table>
        <thead>
          <tr>
            <th>No:</th>
            <th>Code</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Tax Type</th>
            <th>Type</th>
            <th>Sale Exclusion</th>
            <th>Purchase Exclusion</th>
            <th>Unit of Measure</th>
            <th>Dimension</th>
            <th>Sales Acc</th>
            <th>Status</th>
            <th>Purchase Acc</th>
            <th>Creation Date</th>
            <th>Updated Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {itemData.length > 0 ? (
            itemData.map((val, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                
                <td>{val.code}</td>
                <td>{val.itemName}</td>
                <td>{val.description}</td>
                <td>{val.taxType}</td>
                <td>{val.type}</td>
                <td>{val.saleExclusion}</td>
                <td>{val.purchaseExclusion}</td>
                <td>{val.unitOfMeasure}</td>
                <td>{val.dimension}</td>
                <td>{val.salesAcc}</td>
                <td>{val.status}</td>
                <td>{val.purchaseAcc}</td>
                <td>{val.created_at}</td>
                <td>{val.updated_at}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="16">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemReport;
