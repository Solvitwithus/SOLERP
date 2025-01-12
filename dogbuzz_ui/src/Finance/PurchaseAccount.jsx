import React, { useState,useEffect,useRef,useCallback} from 'react';
import AccountsHeader from './AccountsHeader';
import Delete from "../Assets/DeleteIcon.svg"
import Edit from "../Assets/EditIcon.svg"

import "./Purchaseaccounts.css"
const PurchaseAccount = () => {
    const BASE_URL = process.env.REACT_APP_API_URL 
    
   const initialState = {
        accountName: "",
        accountDescription: "",
        bankName: "",
        accountNumber: "",
        bankAddress: "",
        currency: "",
        paymentTerms: "",
        preferredVendors: "",
        procurementLimits: "",
        associatedBusinessUnit: "",
        accountManager: "",
        status: "active",
        reimbursementEligibility: false,
    }
    const [data, setData] = useState(initialState);
const modal = useRef()
const [success, setSuccess] = useState("");
const [error, setError] = useState("");
const [popup, setPopup] = useState(false);
const [rowdata, setRowdata] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
const [purchaseAccounts, setPurchaseAccounts] = useState([]);
const fetchPurchaseAccounts = useCallback(async () => {
    try {
        const response = await fetch(`${BASE_URL}/FetchPurchaseAccount`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      
        
        setPurchaseAccounts(data);
    
        
    } catch (error) {
        console.error("Failed to fetch purchase accounts:", error);
        alert("Could not fetch purchase accounts. Please check your server.");
    }
},[BASE_URL]);

useEffect(()=>{
    fetchPurchaseAccounts();
},[fetchPurchaseAccounts])


    useEffect(() => {
        

        const handleClickOutside = (e) =>{
            if(modal.current&&!modal.current.contains(e.target)){
                    setRowdata(null)
                    setPopup(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
            return()=>{
                document.removeEventListener('mousedown', handleClickOutside)
            }
        
    }, []);

  useEffect(() => {
    if(success || error){
    const timer = setTimeout(() => {
      setError('');
      setSuccess('');
    }, 4000);
    return () => clearTimeout(timer);
}
  }, [error, success]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };






const handleAdd = async (e) => {
    e.preventDefault();
    const method = data.id ? 'PUT' : 'POST';
    const url = data.id ? `${BASE_URL}/UpdatePurchaseAccount/${data.id}` : `${BASE_URL}/AddPurchaseAccount`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 409) {
                alert("An account with this name already exists. Please use a different name.");
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } else {
            
            
            setData(initialState); 
            fetchPurchaseAccounts();
        }
    } catch (error) {
        console.error("Error adding/updating purchase account:", error);
        alert("Could not add/update purchase account. Please check your server.");
    }
};


    const handleDeleteClick = async(id)=>{
       
        const response = await fetch(`${BASE_URL}/DeletePurchaseAccount/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        fetchPurchaseAccounts(); // Re-fetch data after deletion
    }


    const handleEditClick = (id) => {
        const account = purchaseAccounts.find(acc => acc.id === id);
        if (account) {
            setData({ ...account });
        }
    };
    const [currencies, setCurrencies] = useState([]);
    const fetchCurrency = useCallback(async () => {
        try {
          const response = await fetch(`${BASE_URL}/fetch_currency`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });
    
          const data = await response.json();
          if (response.ok) {
            setCurrencies(data.data);
            setSuccess(data.message);
            setError("");
          } else {
            setSuccess("");
            setError(data.error);
          }
        } catch (err) {
          setError("Error fetching currency, check your internet connection!");
        }
      },[BASE_URL]);
      useEffect(() => {
        fetchCurrency();
    },[fetchCurrency])
      // Pagination Logic
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const currentRows = purchaseAccounts.slice(indexOfFirstRow, indexOfLastRow);
  
      const handleNext = () => {
          if (currentPage * rowsPerPage < purchaseAccounts.length) {
              setCurrentPage(currentPage + 1);
          }
      };
  
      const handlePrev = () => {
          if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
          }
      };


    const handleSmartBg = (index) => {
        if (index % 2 === 0) {
            return { backgroundColor: "#f1f1" }
        }
        else{
          return {
            backgroundColor: "#F2F2F2"
          }}
    };


    const handlepopup =(passeddata)=>{
        setPopup(!popup)
        setRowdata(passeddata)
    }
const handlePrint =()=>{
    const printSec = document.getElementById('purchase-row').innerHTML
    const originalBody =document.body.innerHTML

    document.body.innerHTML = printSec
    window.print()
    document.body.innerHTML = originalBody
    window.location.reload();
}

const handleCancelPrint =()=>{
    setRowdata(null)
    setPopup(popup)
}
    return (
        <div className='account-bg'>
    
            <AccountsHeader />
            <div className='acc-containers'>
            <table>
    <thead>
        <tr className='purchaseacc_tableheads_report'>
            <th>No:</th>
            <th>Account Name</th>
            <th>Account Description</th>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>Bank Address</th>
            <th>Currency</th>
            <th>Payment Terms</th>
            <th>Preferred Vendors</th>
            <th>Procurement Limits</th>
            <th>Associated Business Unit</th>
            <th>Account Manager</th>
            <th>Status</th>
            <th>Reimbursement Eligibility</th>
            <th>Action</th>
        </tr>
    </thead>


    <tbody>
                        {currentRows.length > 0 ? (
                            currentRows.map((purchaseAccount, index) => (
                                <tr key={index} style={handleSmartBg(index)} className='purchaseacc_row'>
                                    <td className="clickable-cell" onClick={()=>handlepopup(purchaseAccount)}>{index + 1}</td>
                                    <td>{purchaseAccount.accountName}</td>
                                    <td>{purchaseAccount.accountDescription}</td>
                                    <td>{purchaseAccount.bankName}</td>
                                    <td>{purchaseAccount.accountNumber}</td>
                                    <td>{purchaseAccount.bankAddress}</td>
                                    <td>{purchaseAccount.currency}</td>
                                    <td>{purchaseAccount.paymentTerms}</td>
                                    <td>{purchaseAccount.preferredVendors}</td>
                                    <td>{purchaseAccount.procurementLimits}</td>
                                    <td>{purchaseAccount.associatedBusinessUnit}</td>
                                    <td>{purchaseAccount.accountManager}</td>
                                    <td>{purchaseAccount.status}</td>
                                    <td>{purchaseAccount.reimbursementEligibility ? "Yes" : "No"}</td>
                                    <td>
                                        <div className="icons_section">
                                            <img
                                                src={Delete}
                                                alt="Delete"
                                                onClick={() => handleDeleteClick(purchaseAccount.id)}
                                                className="action_icons"
                                                title="Delete Account"
                                            />
                                            <img
                                                src={Edit}
                                                alt="Edit"
                                                onClick={() => handleEditClick(purchaseAccount.id)}
                                                className="action_icons"
                                                title="Edit Account"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="14">No purchase accounts found.</td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan="20">
                                <button type='button' onClick={handlePrev} className='pagenavbutton'>
                                    Prev
                                </button>
                                <button type='button' onClick={handleNext} className='pagenavbutton'>
                                    Next
                                </button>
                                <span className='page_displayer'>
                                    Page <span className='currentpage'>{currentPage}</span> of <span className='max_pages'>{Math.ceil(purchaseAccounts.length / rowsPerPage)}</span>
                                </span>
                            </td>
                        </tr>
                    </tbody>



</table>
{rowdata && (<div id="purchase-row" ref={modal}>
    <table className="modal-table">
    <p className='order-title'>Bank Order #{rowdata.id}</p>
    <tbody>
                                    <tr>
                                        <td><strong>Account Name:</strong></td>
                                        <td>{rowdata.accountName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Account Description:</strong></td>
                                        <td>{rowdata.accountDescription}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bank Name:</strong></td>
                                        <td>{rowdata.bankName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Account Number:</strong></td>
                                        <td>{rowdata.accountNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bank Address:</strong></td>
                                        <td>{rowdata.bankAddress}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Currency:</strong></td>
                                        <td>{rowdata.currency}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Payment Terms:</strong></td>
                                        <td>{rowdata.paymentTerms}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Preferred Supplier:</strong></td>
                                        <td>{rowdata.preferredVendors}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Procurement Limits:</strong></td>
                                        <td>{rowdata.procurementLimits}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Associated Business Unit:</strong></td>
                                        <td>{rowdata.associatedBusinessUnit}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Account Manager:</strong></td>
                                        <td>{rowdata.accountManager}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Status:</strong></td>
                                        <td>{rowdata.status}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Reimbursement Eligibility:</strong></td>
                                        <td>{rowdata.reimbursementEligibility?"Eligible":"Not Eligible"}</td>
                                    </tr>
                                </tbody>
    </table>
    <span className='btn-sec'>
                            <button type='button' onClick={handlePrint} className='print-button'>Print</button>
                            <button type='button' onClick={handleCancelPrint} className='pagenavbutton'>Cancel</button>
                            </span>
</div>)}
{error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}


                <form onSubmit={handleAdd}>
                    <table className='account-table-input'>
                        <tbody>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Account Name</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Account Name' 
                                        name='accountName' 
                                        onChange={handleChange} 
                                        value={data.accountName} 
                                        required 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Account Description</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Description (e.g. Procurement, Raw Materials)' 
                                        name="accountDescription" 
                                        onChange={handleChange} 
                                        value={data.accountDescription} 
                                        required 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Bank Name</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Bank Name' 
                                        name="bankName" 
                                        onChange={handleChange} 
                                        value={data.bankName} 
                                        required 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Account Number</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Account Number' 
                                        name="accountNumber" 
                                        onChange={handleChange} 
                                        value={data.accountNumber} 
                                        required 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Bank Address</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Bank Address' 
                                        name="bankAddress" 
                                        onChange={handleChange} 
                                        value={data.bankAddress} 
                                        required 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Currency</td>
                                <td>
                                    <select 
                                        name="currency" 
                                        onChange={handleChange} 
                                        value={data.currency} 
                                        required
                                    >
                                        <option value="">Select Currency</option>
                                        {currencies.map((curr,idx)=>(
                                            <option key={idx} value={curr.currencyAbbreviation}>{curr.currencyName}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Payment Terms</td>
                                <td>
                                    <select 
                                        name="paymentTerms" 
                                        onChange={handleChange} 
                                        value={data.paymentTerms}
                                    >
                                        <option value="">Select Payment Terms</option>
                                        <option value="Prepayment">Prepayment</option>
                                        <option value="Post-payment">Post-payment</option>
                                        <option value="As Agreed">As Agreed</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Preferred Vendors</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Vendor Name/ID' 
                                        name="preferredVendors" 
                                        onChange={handleChange} 
                                        value={data.preferredVendors} 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Procurement Limits</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Min-Max (e.g., 5000-50000)' 
                                        name="procurementLimits" 
                                        onChange={handleChange} 
                                        value={data.procurementLimits} 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Associated Business Unit</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Department/Branch' 
                                        name="associatedBusinessUnit" 
                                        onChange={handleChange} 
                                        value={data.associatedBusinessUnit} 
                                    />
                                </td>
                            </tr>
                     <tr className='account-table-rows'>
<td className='account-table-rows-rightborder'>Reimbursement Eligibility</td>
<td>
    <input 
        type='checkbox' 
        name="reimbursementEligibility" 
        onChange={handleChange} 
        checked={data.reimbursementEligibility} 
    /> Eligible for Reimbursement
</td>
</tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Account Manager</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Manager Name' 
                                        name="accountManager" 
                                        onChange={handleChange} 
                                        value={data.accountManager} 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Status</td>
                                <td>
                                    <select 
                                        name="status" 
                                        onChange={handleChange} 
                                        value={data.status} 
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button type="submit" className='submit_table_data'>{data.id ? 'Update Account' : 'Add Account'}</button>
                </form>
            </div>
        </div>
    );
};

export default PurchaseAccount;



