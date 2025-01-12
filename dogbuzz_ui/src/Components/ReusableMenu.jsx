import React, { useState, useEffect } from 'react';
import Menubar from '../Components/Menubar';
import Hamburger from '../Assets/HamburgerMenu.svg';
import DefaultProfile from '../Assets/download.jpeg';
import { useLocation } from 'react-router-dom'; 
import Cookie from 'js-cookie'


const ReusableMenu = () => {
    const location = useLocation();
    const [username, setUsername] = useState('Intruder!!!');

    useEffect(() => {
      const user = Cookie.get('username')
      setUsername(user || 'Intruder!!!');
    },[]);


    const getTitle = () => {
        switch (location.pathname) {
          case '/dashboard':
            return 'Dashboard';
          case '/sales':
            return 'Sales';
          case '/procurement':
            return 'Procurement';
          case '/breeding':
            return 'Breeding';
          case '/items-and-inventory-management':
            return 'Items and Inventory Management';
          case '/human-resources-management':
            return 'Human Resources Management';
          case '/finance':
            return 'Finance';
          case '/kennel-management':
            return 'Kennel Management';
          case '/health-hubb':
            return 'Health Hubb';
          case '/settings':
            return 'Settings';
          case '/task-schedule':
            return 'Task Schedule';
          case '/dimension':
            return 'Dimension';
          case '/asset-management':
            return 'Assets Management';
          
          default:
            return 'Dashboard';
            
        }
      };
  
  return (
    
       <div className="dashboard_container">
      <Menubar
        hamburgerSrc={Hamburger}
        title={getTitle()}
        profileSrc={DefaultProfile}
        username={username}
      />
    </div>
  );
}

export default ReusableMenu;
