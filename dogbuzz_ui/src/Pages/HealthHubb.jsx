import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Healthhubb.css"
import { Helmet } from 'react-helmet';
const HealthHubb = () => {
  return (
    <div className="healthbubb-container">
      <Helmet>
        <title>Health Hubb</title>
      </Helmet>
    <ReusableMenu />
    <div className="header-section">
      <h5 className="header-title">Healthhubb Setup</h5>
    </div>
  </div>
  );
}

export default HealthHubb;
