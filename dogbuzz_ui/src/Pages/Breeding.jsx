import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Breeding.css"
import Dynamite from '../BreedModuleSection/Dynamite';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Breeding = () => {
  return (
    <div className="breeding-container">
      <Helmet>
        <title>Breeding</title>
      </Helmet>
      <ReusableMenu />
      <div className="header-section">
        <h5 className="header-title">Breed Setup</h5>
      </div >
      {/* Set up */}
      <div className='setups_breed'>
        {/* Left setups */}
      <div className='setup_left_section'>
      <Link to={"/breeding/breadebreed"} className='links'>
<Dynamite Breedsetupname="Breed Creation"/>
     </Link>
     <Link to={"/breeding/breadebreed"} className='links'>
     <Dynamite Breedsetupname="Dog Creation"/>
     </Link>
     <Link to={"/breeding/breadebreed"} className='links'>
     <Dynamite Breedsetupname="Kennel Creation"/>
     </Link>
     </div>
     {/* Right Section */}
     <div className='setup_right_section'>
     <Link to={"/breeding/breadebreed"} className='links'>
     <Dynamite Breedsetupname="Breed Creation"/>
     </Link>
     <Link to={"/breeding/breadebreed"} className='links'>
     <Dynamite Breedsetupname="Dog Creation"/>
     </Link>
     <Link to={"/breeding/breadebreed"} className='links'>
     <Dynamite Breedsetupname="Kennel Creation"/>
     </Link>
     </div>
     </div>

     <div className="header-section">
        <h5 className="header-title">Breeding Reports</h5>
      </div >
      <div className='Report_module'>
      <Link to={"/breeding/breedreport"} className='links'>
     <Dynamite Breedsetupname="Breed Report"/>
     </Link>
     <Link to={"/breeding/breedreport"} className='links'>
     <Dynamite Breedsetupname="Litter Report"/>
     </Link>
      </div>

      <div className="header-section">
        <h5 className="header-title">Breed cycle</h5>
      </div >
    </div>
  );
}

export default Breeding;
