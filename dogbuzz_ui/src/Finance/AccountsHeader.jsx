import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import "./Accounts.css";

const AccountsHeader = () => {
  return (
    <div>
      <Helmet>
        <title>Accounts Setup</title>
      </Helmet>

      Account Setups
      <hr/>
      <div className="account-header-section">
        <NavLink 
          to="/finance/purchaseaccountsetup" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Purchase</h6>
        </NavLink>
        <NavLink 
          to="/finance/saleaccountsetup" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Sales</h6>
        </NavLink>
        <NavLink 
          to="/finance/otheraccountssetup" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Miscellaneous</h6>
        </NavLink>
        
      </div>
      <div className='rectangle'></div>
    </div>
  );
}

export default AccountsHeader;