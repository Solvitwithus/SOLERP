
import React, { useState,useEffect,useRef } from "react";
import AccountsHeader from "./AccountsHeader";
import "./SalesAccount.css";
import Delete from "../Assets/DeleteIcon.svg"
import Edit from "../Assets/EditIcon.svg"
const SalesAccount = () => {
    const modal = useRef()
    const initialState = {
        accountName: "",
        accountDescription: "",
        bankName: "",
        accountNumber: "",
        bankAddress: "",
        currency: "",
        transactionLimits: "",
        salesTaxApplicable: false,
        linkedCustomer: "",
        defaultPaymentMethod: "",
        associatedBusinessUnit: "",
        accountManager: "",
        status: "active",
    };
    const [ismodalOpen, setIsodalOpen] = useState(false);
    const [salesrowdata, setsalesrowdata] = useState(null);
    const [data, setData] = useState(initialState);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [salesAccount, setSalesAccount] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const rowsPerPage = 10;
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({ ...data, [name]: type === "checkbox" ? checked : value });
    };

    const fetchSalesAccounts = async()=>{
        try {
            const response = await fetch("http://localhost:5000/GetAllSalesAccounts",{
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const salesAccounts = await response.json();
            setSalesAccount(salesAccounts.data);
           console.log(salesAccounts.data);
           
            
        } catch (err) {
            console.error(err);
        }
    }

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

    useEffect(()=>{
        fetchSalesAccounts();
        fetchCurrency()

        const handleClickOutSide = (e) =>{
            if(modal.current && !modal.current.contains(e.target)){
                setIsodalOpen(false)
                setsalesrowdata(null)
            }
        
        }
        document.addEventListener('mousedown',handleClickOutSide)
        return ()=>{
            document.removeEventListener('mousedown',handleClickOutSide)
        }
    },[])

    // Handle form submission
    // const handleAdd = async (e) => {
    //     e.preventDefault();
    //     setError("");
    //     setSuccess("");
    //     setLoading(true);

    //     try {
    //         const mukami = salesAccount.id
    //  const method = mukami ? "GET":"POST";
    //  const url = mukami ? `http://localhost:5000/EditSalesAccount/${mukami}`: "http://localhost:5000/AddSalesAccount"
    //         const response = await fetch(url, {
    //             method: method,
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(data),
    //         });

    //         if (!response.ok) {
    //             const resData = await response.json();
    //             throw new Error(resData.error || "An error occurred");
    //         }

    //         setSuccess("Sales Account added successfully!");
    //         setData(initialState);
    //         fetchSalesAccounts();

    //     } catch (err) {
    //         setError(err.message);
    //     } finally {
    //         setLoading(false);
    //     }

    //     // Clear messages after 2 seconds
    //     setTimeout(() => {
    //         setError("");
    //         setSuccess("");
    //     }, 2000);
    // };



    const handleAdd = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
    
        try {
            const method = data.id ? "PUT" : "POST";
            const url = data.id ? `http://localhost:5000/EditSalesAccount/${data.id}` : "http://localhost:5000/AddSalesAccount"
    
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                const resData = await response.json();
                throw new Error(resData.error || "An error occurred");
            }
    
            setSuccess(data.id ? "Sales Account updated successfully!" : "Sales Account added successfully!");
            setData(initialState);
            fetchSalesAccounts();
    
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    
        setTimeout(() => {
            setError("");
            setSuccess("");
        }, 2000);
    };
    

    // const handleDeleteClick = async(id)=>{
    //     console.log("Delete item with id: " + id);
    //     const response = await fetch(`http://localhost:5000/DeleteSalesAccount/${id}`,{
    //         method: "DELETE",
    //         headers: { "Content-Type": "application/json" },
    
    //     })
    //     if (!response.ok) {
    //         const resData = await response.json();
    //         throw new Error(resData.error || "An error occurred");
    //     }
    //     fetchSalesAccounts();
        
    // }


    const handleDeleteClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/DeleteSalesAccount/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
    
            if (!response.ok) {
                const resData = await response.json();
                throw new Error(resData.error || "Failed to delete the sales account.");
            }
    
            fetchSalesAccounts();
        } catch (err) {
            setError(err.message);
        }
    };
    

    const handleEditClick = (id) => {
        const accToEdit = salesAccount.find((acc) => acc.id === id);
        if (accToEdit) {
            setData({ ...accToEdit });
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



          // Pagination Logic
          const indexOfLastRow = currentPage * rowsPerPage;
          const indexOfFirstRow = indexOfLastRow - rowsPerPage;
          const currentRows = salesAccount.slice(indexOfFirstRow, indexOfLastRow);
      
          const handleNext = () => {
              if (currentPage * rowsPerPage < salesAccount.length) {
                  setCurrentPage(currentPage + 1);
              }
          };
      
          const handlePrev = () => {
              if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
              }
          };

          const handleindividualRowDisplay =(passeddata)=>{
            setIsodalOpen(ismodalOpen)
            setsalesrowdata(passeddata)
          }
const handlePrint =()=>{
    const printableRow = document.getElementById('salesaccount-row').innerHTML
    const originalbody = document.body.innerHTML
    document.body.innerHTML = printableRow
    window.print()
    document.body.innerHTML = originalbody
    window.location.reload()
}

const handleCancelPrint = ()=>{
    setIsodalOpen(!ismodalOpen)
    setsalesrowdata(null)
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
                            <th>Transaction Limits</th>
                            <th>Sales Tax Applicable</th>
                            <th>Linked Customer</th>
                            <th>Default Payment Method</th>
                            <th>Associated Business Unit</th>
                           
                            <th>Status</th>
                            <th>Account Manager</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {currentRows.length > 0?currentRows.map((account,index)=>(
                            <tr key={index} style={handleSmartBg(index)} className='purchaseacc_row'>
                            <td className="clickable-cell" onClick={()=>handleindividualRowDisplay(account)}>{index+1}</td>
                            <td>{account.accountName}</td>
                            <td>{account.accountDescription}</td>
                            <td>{account.bankName}</td>
                            <td>{account.accountNumber}</td>
                            <td>{account.bankAddress}</td>
                            <td>{account.currency}</td>
                            <td>{account.transactionLimits}</td>
                            <td>{account.salesTaxApplicable? 'Yes':'No'}</td>
                            <td>{account.linkedCustomer}</td>
                            <td>{account.defaultPaymentMethod}</td>
                            <td>{account.associatedBusinessUnit?"True":"False"}</td>
                            <td>{account.accountManager}</td>
                            <td>{account.status}</td>
                            <td>
                                                                    <div className="icons_section">
                                                                        <img
                                                                            src={Delete}
                                                                            alt="Delete"
                                                                            onClick={() => handleDeleteClick(account.id)}
                                                                            className="action_icons"
                                                                            title="Delete Account"
                                                                        />
                                                                        <img
                                                                            src={Edit}
                                                                            alt="Edit"
                                                                            onClick={() => handleEditClick(account.id)}
                                                                            className="action_icons"
                                                                            title="Edit Account"
                                                                        />
                                                                    </div>
                                                                </td>
                        </tr>)):<p>No current data</p>}
                        <tr>
                            <td colSpan="20">
                                <button type='button' onClick={handlePrev} className='pagenavbutton'>
                                    Prev
                                </button>
                                <button type='button' onClick={handleNext} className='pagenavbutton'>
                                    Next
                                </button>
                                <span className='page_displayer'>
                                    Page <span className='currentpage'>{currentPage}</span> of <span className='max_pages'>{Math.ceil(salesAccount.length / rowsPerPage)}</span>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {salesrowdata && (<div id="salesaccount-row" ref={modal}>
                    <table className="modal-table">
                    <p className='order-title'>Bank Order #{salesrowdata.id}</p>
                    <tbody>
                                    <tr>
                                        <td><strong>Account Name:</strong></td>
                                        <td>{salesrowdata.accountName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Account Description:</strong></td>
                                        <td>{salesrowdata.accountDescription}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bank Name:</strong></td>
                                        <td>{salesrowdata.bankName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Account Number:</strong></td>
                                        <td>{salesrowdata.accountNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bank Address:</strong></td>
                                        <td>{salesrowdata.bankAddress}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Currency:</strong></td>
                                        <td>{salesrowdata.currency}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Transaction Limits:</strong></td>
                                        <td>{salesrowdata.transactionLimits}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Sales Tax Applicable:</strong></td>
                                        <td>{salesrowdata.salesTaxApplicable ? "True" : "False"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Linked Customer:</strong></td>
                                        <td>{salesrowdata.linkedCustomer}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Status:</strong></td>
                                        <td>{salesrowdata.status}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Default Payment Method:</strong></td>
                                        <td>{salesrowdata.defaultPaymentMethod}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Associated Business Unit:</strong></td>
                                        <td>{salesrowdata.associatedBusinessUnit}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Account Manager:</strong></td>
                                        <td>{salesrowdata.accountManager}</td>
                                    </tr>
                                </tbody>
                    </table>
                    <span className='btn-sec'>
                            <button type='button' onClick={handlePrint} className='print-button'>Print</button>
                            <button type='button' onClick={handleCancelPrint} className='pagenavbutton'>Cancel</button>
                            </span>
                </div>)}
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
                                        placeholder='Description (e.g. Asset Sales, Inventory Sales)' 
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
                                <td className='account-table-rows-rightborder'>Transaction Limits</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Min-Max (e.g., 1000-10000)' 
                                        name="transactionLimits" 
                                        onChange={handleChange} 
                                        value={data.transactionLimits} 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Sales Tax Applicable</td>
                                <td>
                                    <input 
                                        type='checkbox' 
                                        name="salesTaxApplicable" 
                                        onChange={handleChange} 
                                        checked={data.salesTaxApplicable} 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Linked Customer</td>
                                <td>
                                    <input 
                                        type='text' 
                                        placeholder='Customer Name/ID' 
                                        name="linkedCustomer" 
                                        onChange={handleChange} 
                                        value={data.linkedCustomer} 
                                    />
                                </td>
                            </tr>
                            <tr className='account-table-rows'>
                                <td className='account-table-rows-rightborder'>Default Payment Method</td>
                                <td>
                                    <select 
                                        name="defaultPaymentMethod" 
                                        onChange={handleChange} 
                                        value={data.defaultPaymentMethod}
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="Cash">Cash</option>
                                        <option value="M-Pesa">M-Pesa</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cheque">Cheque</option>
                                    </select>
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
                    {/* <button type="submit">Submit</button> */}

                    <button type="submit" disabled={loading} className='submit_table_data'>
    {loading ? "Processing..." : data.id ? "Update" : "Submit"}
</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
        </div>
            </div>
    );
};

export default SalesAccount;
