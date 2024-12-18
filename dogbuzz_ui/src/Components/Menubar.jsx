import React, { useState, useEffect,useRef } from 'react';
import '../Styles/Menubar.css';
import HamburgerContent from './HamburgerContent';
import { NavLink } from 'react-router-dom';
const Menubar = ({ hamburgerSrc, title, profileSrc, username }) => {


  const [formattedDate, setFormattedDate] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false); // State to manage menu visibility


  const PopMenu = useRef();
 

  useEffect(() => {
    document.addEventListener('mousedown', mainActivity);
    return () => {
        document.removeEventListener('mousedown', mainActivity);
    };
}, []);


const mainActivity = (e) => {
  // Close menu if the click is outside of the menu and the hamburger icon
  if (
    PopMenu.current &&
    !PopMenu.current.contains(e.target) &&
    !e.target.classList.contains('ham_menu')
  ) {
    setIsMenuVisible(false);
  }
};

const toggleMenu = (e) => {
  e.stopPropagation(); // Prevent click from propagating to document listener
  setIsMenuVisible((prev) => !prev);
};



  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateParts = today.toLocaleDateString('en-US', options).split(' ');
      const formatted = `${dateParts[0]} ${dateParts[1]}-${dateParts[2]}${dateParts[3]}`;
      setFormattedDate(formatted);
    };

    updateDate();
  }, []);

  

  return (
    <>    <div className="menubar">
      <div className="menu-section">
        <img src={hamburgerSrc} alt="Menu" className="ham_menu" onClick={toggleMenu} aria-expanded={isMenuVisible} /> {/* Click to toggle menu */}
        <h2 className="title">{title}</h2>
        <div className="time_and_url">
          <h6 className="time-display">{formattedDate}</h6>
          <h6 className="solvit-text">SolvIt Solutions 4u || SOLERP |</h6>
        </div>

       
      </div>

      <div className="profile-section">
        <img src={profileSrc} alt="profile" />
        <h6>
          Welcome, <span className="username">{username}</span>
        </h6>
      </div>
    </div>
    {isMenuVisible && (
  <div className="hamburger-content" ref={PopMenu}>
    {HamburgerContent.map((val, idx) => (
      <li key={idx} className="li_content">
        <NavLink 
          to={val.link} 
          className={({ isActive }) => 
            isActive ? 'link_components active' : 'link_components'
          }
        >
          <div className="icon">{val.icon}</div>
          <h6>{val.title}</h6>
        </NavLink>
      </li>
    ))}
  </div>
)}

    </>

  );
};

export default Menubar;