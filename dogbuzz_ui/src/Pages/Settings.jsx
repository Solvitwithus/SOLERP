import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Settings.css"
import { Helmet } from 'react-helmet';
const Settings = () => {
  return (
    <div className="settings-container ">
      <Helmet>
        <title>Settings</title>
      </Helmet>
     
    <ReusableMenu />
    <div className="header-section">
      <h5 className="header-title">Setup Setup</h5>
    </div>
  </div>
  );
}

export default Settings;
