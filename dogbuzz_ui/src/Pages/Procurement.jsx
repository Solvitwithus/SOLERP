import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Procurement.css";
import { Helmet } from 'react-helmet';
const Procurement = () => {
  return (
    <div className="procurement-container">
      <Helmet>
        <title>Procurement</title>
      </Helmet>
    <ReusableMenu />
    <div className="header-section">
      <h5 className="header-title">Procurement Setup</h5>
    </div>
  </div>
  );
};

export default Procurement;
