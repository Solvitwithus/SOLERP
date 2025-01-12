import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import search from "../Assets/searchicon.svg"
import "./Itemsetup.css"
const ItemSetupHeader = () => {
  return (
    <div>
         <Helmet>
            <title>Item Setup</title>
        </Helmet>
        <span className='setups_acc_head'>Items</span>
                <hr/>
                <div className='item-setup-acchead'>
                    <span id="it-cd">Selected Item Code</span>
                    <input type='text' className='item-code' readOnly placeholder='Item001'/>
                    <select >
                        <option value="">Category</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                    </select>
                    <img src={search} alt='search-icon' className="search-action_icon"/>
                </div>
                <div className="item-header-section">
                <NavLink 
          to="/asset-management" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Asset Hub</h6>
        </NavLink>
                <NavLink 
          to="/assetmanagement/itemsetup" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Item Setup</h6>
        </NavLink>
        <NavLink 
          to="/assetmanagement/createcategory" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Category Report Line</h6>
        </NavLink>
        <NavLink 
          to="/assetmanagement/createcategory" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Add Category</h6>
        </NavLink>
        <NavLink 
          to="/assetmanagement/createcategory" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Sales Pricing</h6>
        </NavLink>
        <NavLink 
          to="/assetmanagement/createcategory" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Purchase Pricing</h6>
        </NavLink>
        <NavLink 
          to="/assetmanagement/itemsreport" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Item Report Line</h6>
        </NavLink>
        <NavLink 
          to="/assetmanagement/createcategory" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Status</h6>
        </NavLink>
        </div>
        <div className='therectangle'></div>
        <br/>
        <hr/>
    </div>
  );
}

export default ItemSetupHeader;
