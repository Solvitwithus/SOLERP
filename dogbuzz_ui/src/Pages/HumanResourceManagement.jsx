import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/HumanResourceManagement.css"
import { Helmet } from 'react-helmet';
const HumanResourceManagement = () => {
  return (
    <div className="humanresourcemanagement-container">
      <Helmet>
        <title>HRM</title>
      </Helmet>
    <ReusableMenu />
    <div className="header-section">
      <h5 className="header-title">HRM Setup</h5>
    </div>
  </div>
  );
}

export default HumanResourceManagement;
