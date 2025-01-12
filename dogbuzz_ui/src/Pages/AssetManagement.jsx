import React from 'react';
import ReusableMenu from '../Components/ReusableMenu';
import "../Styles/Assetmanagement.css"
import Dynamite from '../BreedModuleSection/Dynamite';
import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet"
const AssetManagement = () => {
 const LeftAssetsetup =[
  {path:"/assetmanagement/createcategory",name:"Asset Category Creation"},
  {path:"/assetmanagement/itemsetup",name:"Asset Type"},
  {path:"/Breeding/CreateBreed",name:"Asset Depreciation configuration"},

 
 ];
 const RightAssetsetup =[
  {path:"/Breeding/CreateBreed",name:"Ownership Model"},
  {path:"/Breeding/CreateBreed",name:"Actors Configuration"},
  {path:"/Breeding/CreateBreed",name:"Unit of Measure"},
  {path:"/assetmanagement/taxtype",name:"Tax Type"}
 ];

 const RightAssetReport =[
  {path:"/assetmanagement/assetsreport",name:"Asset Inventory Report"},
  {path:"/Breeding/CreateBreed",name:"Depreciation Report"},
  {path:"/Breeding/CreateBreed",name:"Maintainance History Report"},
  {path:"/Breeding/CreateBreed",name:"Incident Report"},
  {path:"/Breeding/CreateBreed",name:"Retired Assets Report"},
  {path:"/Breeding/CreateBreed",name:"Location-wise Asset Report"}
 ];

 const LeftAssetReport =[
  {path:"/Breeding/CreateBreed",name:"Asset Category Report"},
  {path:"/assetmanagement/itemsreport",name:"Item Report"},
  {path:"/Breeding/CreateBreed",name:"Category-Item Report"}
 
 ];

 const Operations =[
  {path:"/Breeding/CreateBreed",name:"Asset Registration"},
  {path:"/Breeding/CreateBreed",name:"Asset Allocation"},
  {path:"/Breeding/CreateBreed",name:"Asset Usage Tracking"},
  {path:"/Breeding/CreateBreed",name:"Asset Maintainance"},
  {path:"/Breeding/CreateBreed",name:"Asset Sale"},
  {path:"/Breeding/CreateBreed",name:"Incident Management"},
  {path:"/Breeding/CreateBreed",name:"Asset Location Transfer"}
 ];
  return (
    <div className="asset_management_container">
      <Helmet>
        <title>Asset Management</title>
      </Helmet>
    <ReusableMenu />
    <div className="header-section">
      <h5 className="header-title">Asset Setup</h5>
    </div>
    <div className='setups_breed'>
        {/* Left setups */}
      <div className='setup_left_section'>
     {LeftAssetsetup.map((value,index)=>(
      <Link key={index} to={value.path} className='links'>
      <Dynamite Breedsetupname={value.name} />
    </Link>
  )
    )}
     </div>
     {/* Right Section */}
     <div className='setup_right_section'>
     {RightAssetsetup.map((value,index)=>(
      <Link key={index} to={value.path} className='links'>
      <Dynamite Breedsetupname={value.name} />
    </Link>
  )
    )}
     </div>
     </div>

  

<div className="header-section">
<h5 className="header-title">Asset Management Reports</h5>
</div >

     <div className='setups_breed'>
        {/* Left setups */}
      <div className='setup_left_section'>
      {RightAssetReport.map((value,index)=>(
      <Link key={index} to={value.path} className='links'>
      <Dynamite Breedsetupname={value.name} />
    </Link>
  )
    )}
      </div>
        {/* Right Section */}
     <div className='setup_right_section'>
     {LeftAssetReport.map((value,index)=>(
      <Link key={index} to={value.path} className='links'>
      <Dynamite Breedsetupname={value.name} />
    </Link>
  )
    )}
   </div>
    </div>
      <div className="header-section">
        <h5 className="header-title">Operations</h5>
      </div >

      <div className='Report_module'>
      {Operations.map((value,index)=>(
      <Link key={index} to={value.path} className='links'>
      <Dynamite Breedsetupname={value.name} />
    </Link>
  )
    )}
      </div>
  </div>
  );
}

export default AssetManagement;
