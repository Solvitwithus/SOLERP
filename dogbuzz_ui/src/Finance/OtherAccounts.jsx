import React, { useState } from 'react';
import AccountsHeader from './AccountsHeader';


const OtherAccounts = () => {
    const [data, setData] = useState({
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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default OtherAccounts;

