import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Sales.css"
import {Helmet} from 'react-helmet'
const Sales = () => {
  return (
    <div className="sales-container">
      <Helmet>
        <title>Sales</title>
      </Helmet>
      
    <ReusableMenu />
    <div className="header-section">
      <h5 className="header-title">Sales Setup</h5>
    </div>
  </div>
  );
}

export default Sales;
