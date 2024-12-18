import React, { useState } from 'react';
import AccountsHeader from './AccountsHeader';
import "./SalesAccount.css";

const SalesAccount = () => {
    const [data, setData] = useState({
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
        status: "active"
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({ ...data, [name]: type === "checkbox" ? checked : value });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        console.log(data);
        // Further processing can be done here, like sending data to an API
    };

    return (
        <div className='account-bg'>
            <AccountsHeader />
            <div className='acc-containers'>
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
                    <button type="submit">Submit</button>
                </form>
        </div>
            </div>
    );
};

export default SalesAccount;
