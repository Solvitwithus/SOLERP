import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Taskschedule.css"
import { Helmet } from 'react-helmet';
const TaskSchedulling = () => {
  return (
    <div className="taskschedule-container">
      <Helmet>
      <title>Task Schedule</title>
      </Helmet>
     
    <ReusableMenu />
    <div className="header-section">
      <h5 className="header-title">Schedule task Setup</h5>
    </div>
  </div>
  
  );
}

export default TaskSchedulling;
