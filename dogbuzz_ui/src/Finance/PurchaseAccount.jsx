import React, { useState,useEffect} from 'react';
import AccountsHeader from './AccountsHeader';
import Delete from "../Assets/DeleteIcon.svg"
import Edit from "../Assets/EditIcon.svg"

const PurchaseAccount = () => {
    const [data, setData] = useState({
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
    });

const [purchaseAccounts, setPurchaseAccounts] = useState([]);
const fetchPurchaseAccounts = async () => {
    try {
        const response = await fetch("http://localhost:5000/FetchPurchaseAccount", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        
        setPurchaseAccounts(data); // Fallback to an empty array if no data
        console.log("Acc:",setPurchaseAccounts);
        
    } catch (error) {
        console.error("Failed to fetch purchase accounts:", error);
        alert("Could not fetch purchase accounts. Please check your server.");
    }
};


    useEffect(() => {
        fetchPurchaseAccounts();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };



// const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await fetch("http://localhost:5000/AddPurchaseAccount", {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             if (response.status === 409) {
//                 alert("An account with this name already exists. Please use a different name.");
//             } else {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//         } else {
//             alert("Purchase Account added successfully!");
//             fetchPurchaseAccounts(); // Refresh the accounts list
//         }
//     } catch (error) {
//         console.error("Error adding purchase account:", error);
//         alert("Could not add purchase account. Please check your server.");
//     }
// };



const handleAdd = async (e) => {
    e.preventDefault();
    const method = data.id ? 'PUT' : 'POST';
    const url = data.id ? `http://localhost:5000/UpdatePurchaseAccount/${data.id}` : 'http://localhost:5000/AddPurchaseAccount';

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
            alert("Purchase Account updated successfully!");
            fetchPurchaseAccounts(); // Refresh the accounts list
            setData({
                id: null,
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
            }); // Clear form after submit
        }
    } catch (error) {
        console.error("Error adding/updating purchase account:", error);
        alert("Could not add/update purchase account. Please check your server.");
    }
};


    const handleDeleteClick = async(id)=>{
        // Further processing can be done here, like sending data to an API
        const response = await fetch(`http://localhost:5000/DeletePurchaseAccount/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Purchase Account deleted successfully');
        fetchPurchaseAccounts(); // Re-fetch data after deletion
    }


    const handleEditClick = (id) => {
        const account = purchaseAccounts.find(acc => acc.id === id);
        if (account) {
            setData({ ...account });
        }
    };

    return (
        <div className='account-bg'>
            <AccountsHeader />
            <div className='acc-containers'>
            <table>
    <thead>
        <tr>
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
    {purchaseAccounts?.length > 0 ? (
        purchaseAccounts.map((purchaseAccount, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
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
                                      title="Delete Breed"
                                    />
                                    <img
                                      src={Edit}
                                      alt="Edit"
                                    onClick={() => handleEditClick(purchaseAccount.id)}
                                      className="action_icons"
                                      title="Edit Breed"
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
</tbody>

</table>

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
                                        <option value="KES">KES</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="JPY">JPY</option>
                                        <option value="AUD">AUD</option>
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
                    {/* <button type="submit">Submit</button> */}
                    <button type="submit">{data.id ? 'Update Account' : 'Add Account'}</button>
                </form>
            </div>
        </div>
    );
};

export default PurchaseAccount;



