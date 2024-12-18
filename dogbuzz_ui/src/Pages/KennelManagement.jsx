import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Kennel.css"
import { Helmet } from 'react-helmet';
const KennelManagement = () => {
  return (
    <div className="kennel-container">
      <Helmet>
        <title>Kennel Management</title>
      </Helmet>
    <ReusableMenu />
    <div className="header-section">
      <h5 className="header-title">Kennel Setup</h5>
    </div>
  </div>
  );
}

export default KennelManagement;
