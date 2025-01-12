// import React from 'react';
// import "../Styles/Powerfooter.css"
// const Powerfooter = () => {
//   return (
//     <div className='footer-container'>
      
//       <a href="https://solvitsolutions4u.netlify.app/" className='version-no' target='blank'>Version: </a>
//       <p >SOLERP Solutions 4u</p>
//       <button type='submit'>Contact support</button>
//     </div>
//   );
// }

// export default Powerfooter;



import React from 'react';
import "../Styles/Powerfooter.css";

const Powerfooter = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <a 
          href="https://solvitsolutions4u.netlify.app/" 
          className="version-link" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Version: 1.0
        </a>
        <p className="footer-title">SOLERP Solutions 4u</p>
        <button type="button" className="support-button">
          Contact Support
        </button>
      </div>
    </footer>
  );
};

export default Powerfooter;
