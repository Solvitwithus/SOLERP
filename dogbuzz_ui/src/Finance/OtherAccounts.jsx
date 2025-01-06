import React, { useState,useEffect,useRef} from 'react';
import AccountsHeader from './AccountsHeader';
import Delete from "../Assets/DeleteIcon.svg"
import Edit from "../Assets/EditIcon.svg"
import "./otheraccounts.css"
const OtherAccounts = () => {

    const initialState = {
        accountName: "",
        accountDescription: "",
        bankName: "",
        accountNumber: "",
        bankAddress: "",
        currency: "",
        expenseCategory: "",
        authorizedSignatories: "",
        paymentFrequency: "",
        associatedDepartment: "",
        status: "active"
    }
    const modal = useRef()
    const [success, setSuccess] = useState();
    const [error, setError] = useState("");
    const [data, setData] = useState(initialState);
    const [renderedData, setRenderedData] = useState([]);
    const [rowprintpopup, setRowprintpopup] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 18;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };


    



    const handleAdd = async (e) => {
        e.preventDefault();
    
        try {
            // Determine the method and URL
            const isEditing = Boolean(data.id);
            const method = isEditing ? "PUT" : "POST";
            const url = isEditing 
                ? `http://localhost:5000/OtherAccountsEdit/${data.id}`
                : "http://localhost:5000/OtherAccountsAdd";
    
            // Make the API call
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
    
            const resBackend = await response.json();
    
            // Handle response
            if (response.ok) {
                setSuccess(resBackend.message || (isEditing ? "Account updated successfully" : "Account created successfully"));
                setData(initialState);
                FetchOtherAccounts();
            } else {
                setError(resBackend.error || (isEditing ? "Error updating account" : "Error creating account"));
            }
        } catch (err) {
            setError("An error occurred. Please check your internet connection or try again later.");
        }
    };
    
setTimeout(()=>{
setError('')
setSuccess('')
},2000)


const FetchOtherAccounts =async()=>{
    try{
 const response = await fetch("http://localhost:5000/FetchOtherAccounts",{

    method:"GET",
    headers: { "Content-Type": "application/json" },
})
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    else{
        const json = await response.json();
        setRenderedData(json.data)
       
        
    }
   


}

catch{
    setError("Error fetching data check your connection")
}
}
useEffect(()=>{
FetchOtherAccounts()
fetchCurrency()
const handleClickOutside = (e) =>{
    if (modal.current &&!modal.current.contains(e.target)) {
        
        setRowprintpopup(false); 
        setSelectedAccount(null);
    }
}

document.addEventListener('mousedown', handleClickOutside)
return ()=>{
    document.removeEventListener('mousedown', handleClickOutside)
}
},[])



const handleSmartBg = (index) => {
    if (index % 2 === 0) {
        return { backgroundColor: "#f1f1" }
    }
    else{
      return {
        backgroundColor: "#F2F2F2"
      }}
};

    const [currencies, setCurrencies] = useState([]);
    const fetchCurrency = async () => {
        try {
          const response = await fetch("http://localhost:5000/fetch_currency", {
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
      };

const handleDelete = async (id) => {
    if (!id) {
        setError("Invalid account ID provided for deletion.");
        return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete the account with ID ${id}?`);
    if (!confirmDelete) return;

    try {
        const response = await fetch(`http://localhost:5000/DeleteOtherAccounts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        if (response.ok) {
            setSuccess(result.message || `Account with ID ${id} deleted successfully.`);
            FetchOtherAccounts(); // Refresh the data after successful deletion
        } else {
            setError(result.error || `Failed to delete the account with ID ${id}.`);
        }
    } catch (err) {
        setError("Failed to delete the account. Please check your internet connection or contact support.");
        console.error("Delete Error:", err);
    }

   
};

const handleEditClick =(id)=>{
const editable = renderedData.find(acc => acc.id === id);
if(editable){
    setData({...editable})
}
}


          // Pagination Logic
          const indexOfLastRow = currentPage * rowsPerPage;
          const indexOfFirstRow = indexOfLastRow - rowsPerPage;
          const currentRows = renderedData.slice(indexOfFirstRow, indexOfLastRow);
      
          const handleNext = () => {
              if (currentPage * rowsPerPage < renderedData.length) {
                  setCurrentPage(currentPage + 1);
              }
          };
      
          const handlePrev = () => {
              if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
              }
          };

          const handlePrint = () => {
            const printContent = document.getElementById('miscellaneous-row').innerHTML;
            const originalContent = document.body.innerHTML;
        
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
        
            window.location.reload();
        };


        const handleRowDisplay = (passeddata)=>{
            setRowprintpopup(!rowprintpopup)
            setSelectedAccount(passeddata)
        }

        const handleCancelPrint =()=>{
            setRowprintpopup(rowprintpopup)
            setSelectedAccount(null)
        }
    return (
        <div className='account-bg'>
            <AccountsHeader />
            <div className='acc-containers'>
                <table id="overal-miscell-acc-printout">
                        <thead>
                        <tr className='purchaseacc_tableheads_report'>
                                <th>No:</th>
                                <th>Account Name</th>
                                <th>Account Description</th>
                                <th>Bank Name</th>
                                <th>Account Number:</th>
                                <th>Bank Address</th>
                                <th>Currency</th>
                                <th>Expense Category</th>
                                <th>Authorized Signatories</th>
                                <th>Payment Frequency</th>
                                <th>Status</th>
                                <th>Associated Department</th>
                                
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                {currentRows.length > 0?currentRows.map((item, index) => (
                                    <tr key={index} style={handleSmartBg(index)} className='purchaseacc_row'>
                                        <td className="clickable-cell" onClick={()=>handleRowDisplay(item)}>{index+1}</td>
                                        <td>{item.accountName}</td>
                                        <td>{item.accountDescription}</td>
                                        <td>{item.bankName}</td>
                                        <td>{item.accountNumber}</td>
                                        <td>{item.bankAddress}</td>
                                        <td>{item.currency}</td>
                                        <td>{item.expenseCategory}</td>
                                        <td>{item.authorizedSignatories}</td>
                                        <td>{item.paymentFrequency}</td>
                                        <td>{item.status}</td>
                                        <td>{item.associatedDepartment}</td>
                                        <td>
                                            <div className="icons_section">
                                            <img
                                                src={Delete}
                                                alt="Delete"
                                               onClick={()=>handleDelete(item.id)}
                                                className="action_icons"
                                                title="Delete Account"
                                                />
                                                <img
                                                src={Edit}
                                                alt="Edit"
                                                onClick={() => handleEditClick(item.id)}
                                                className="action_icons"
                                                title="Edit Account"
                                                />
                                                </div>
                                        </td>
                                    </tr>

                                )):<p>No current data....</p>}
                              <tr>
                            <td colSpan="20">
                                <button type='button' onClick={handlePrev} className='pagenavbutton'>
                                    Prev
                                </button>
                                <button type='button' onClick={handleNext} className='pagenavbutton'>
                                    Next
                                </button>
                                <span className='page_displayer'>
                                    Page <span className='currentpage'>{currentPage}</span> of <span className='max_pages'>{Math.ceil(renderedData.length / rowsPerPage)}</span>
                                </span>
                              
                                
                            </td>
                        </tr>
                        </tbody>
                </table>

                {selectedAccount && (<div id="miscellaneous-row">
                    <table className="modal-table" ref={modal}>
                        <p className='order-title'>Bank Order #{selectedAccount.id}</p>
                                <tbody>
                                    <tr>
                                        <td><strong>Account Name:</strong></td>
                                        <td>{selectedAccount.accountName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Account Description:</strong></td>
                                        <td>{selectedAccount.accountDescription}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bank Name:</strong></td>
                                        <td>{selectedAccount.bankName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Account Number:</strong></td>
                                        <td>{selectedAccount.accountNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bank Address:</strong></td>
                                        <td>{selectedAccount.bankAddress}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Currency:</strong></td>
                                        <td>{selectedAccount.currency}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Expense Category:</strong></td>
                                        <td>{selectedAccount.expenseCategory}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Authorized Signatories:</strong></td>
                                        <td>{selectedAccount.authorizedSignatories}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Payment Frequency:</strong></td>
                                        <td>{selectedAccount.paymentFrequency}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Status:</strong></td>
                                        <td>{selectedAccount.status}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Associated Department:</strong></td>
                                        <td>{selectedAccount.associatedDepartment}</td>
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
                                        placeholder='Description (e.g. Petty Cash, Miscellaneous)' 
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
                                <td className='account-table-rows-rightborder'>Expense Category</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Expense Category (e.g., Salaries, Utilities)' 
                                        name="expenseCategory" 
                                        onChange={handleChange} 
                                        value={data.expenseCategory} 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Authorized Signatories</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Authorized Signatories' 
                                        name="authorizedSignatories" 
                                        onChange={handleChange} 
                                        value={data.authorizedSignatories} 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Payment Frequency</td>
                                <td>
                                    <select 
                                        name="paymentFrequency" 
                                        onChange={handleChange} 
                                        value={data.paymentFrequency} 
                                    >
                                        <option value="">Select Frequency</option>
                                        <option value="One-time">One-time</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Annually">Annually</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Associated Department</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Department/Branch' 
                                        name="associatedDepartment" 
                                        onChange={handleChange} 
                                        value={data.associatedDepartment} 
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
                    
                    <button type="submit" className='submit_table_data'>{data.id?"Update":"Submit"}</button>
                </form>

            </div>
        </div>
    );
};

export default OtherAccounts;

