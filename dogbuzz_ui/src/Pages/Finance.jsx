import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Itemsandinventory.css"
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Dynamite from '../BreedModuleSection/Dynamite';
const Inventory = () => {

  const Leftinventorysetup = [
    { name: 'Accounts', path: '/finance/purchaseaccountsetup' },
    { name: 'Currency Setup', path: '/dynamite-breed-list' },
    { name: 'Sales Account', path: '/dynamite-breed-group-setup' },
    { name: 'Dynamite Breed Group List', path: '/dynamite-breed-group-list' },
    { name: 'Dynamite Breed Group Membership', path: '/dynamite-breed-group-membership' },
  ]
  return (
    <div className="inventoryanditems-container">
      <Helmet>
        <title>Inventory Management</title>
      </Helmet>
      <ReusableMenu />
      <div className="header-section">
        <h5 className="header-title">items and inventory Setup</h5>
      </div>
      <div className='setups_breed'>
        {/* Left setups */}
      <div className='setup_left_section'>
     {Leftinventorysetup.map((value,index)=>(
      <Link key={index} to={value.path} className='links'>
      <Dynamite Breedsetupname={value.name} />
    </Link>
  )
    )}
     </div>
     {/* Right Section */}
     <div className='setup_right_section'>
     {Leftinventorysetup.map((value,index)=>(
      <Link key={index} to={value.path} className='links'>
      <Dynamite Breedsetupname={value.name} />
    </Link>
  )
    )}
     </div>
     </div>
    </div>
  );
}

export default Inventory;
