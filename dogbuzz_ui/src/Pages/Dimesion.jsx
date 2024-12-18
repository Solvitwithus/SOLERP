import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Dimension.css"
import { Helmet } from 'react-helmet';
const Dimesion = () => {
  return (
    <div className="dimension-container">
      <Helmet>
        <title>Dimension</title>
      </Helmet>
      <ReusableMenu />
      <div className="header-section">
        <h5 className="header-title">Dimension Setup</h5>
      </div>
    </div>
  );
}

export default Dimesion;
