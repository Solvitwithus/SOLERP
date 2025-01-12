import React, { useState,useEffect } from 'react';
import "./Itemsetup.css";
import ItemSetupHeader from './ItemSetupHeader';
import Powerfooter from '../Components/Powerfooter';

const Itemsetup = () => {
    const initialState ={
        itemCode: '',
        itemName: '',
        itemDescription: '',
        category: '',
        taxType: '',
        itemType: '',
        excludeFromSale: false,
        excludeFromPurchase: false,
        image: null,
        dimension:'',
        salesAccount:'',
        purchaseAccount:'',
        otherAccount:'', 
        status:'',
        unitofmeasure:''
    }
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'itemName' && { itemCode: `${value}-${Math.floor(1000 + Math.random() * 9000)}` }),
        }));
    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/AddItem", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const feedback = await response.json();
    
            if (response.ok) {
                setSuccess(feedback.message); // Set success message
            } else {
                setError(feedback.error || "Failed to add item."); // Set error message
            }
        } catch (error) {
            console.error("Submission error:", error);
            setError("An error occurred while submitting the form. Please check your internet connection.");
        }
    
        // Reset form data after submission
        setFormData(initialState);
    };


    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 9000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);
    
    return (
        <div className='section-container-zone'>
            <ItemSetupHeader />
            <br/>
            <form onSubmit={handleSubmission}>
            <div className='input-section'>
                
                <table>
                <thead>
    <tr>
        <th colSpan="2" className="headertxt">General Settings</th>
    </tr>
</thead>
                    <tbody>
                        <tr className='rowborder'>
                            <td className='table-labls'>
                                Item Code
                                </td>
                                <td className='table-labl'>
                                <input
                                    type='text'
                                    className='itm-code-input'
                                    name='itemCode'
                                    value={formData.itemCode}
                                    readOnly
                                />
                                </td>
                           
                        </tr>
                        <tr className='rowborder'>
                            <td className='table-labls'>
                                Item Name</td>
                                <td className='table-labl'>
                                <input
                                    type='text'
                                    name='itemName'
                                    value={formData.itemName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className='rowborder'>
                            <td className='table-labls'>
                                Item Description</td>
                                <td className='table-labl'>
                                <textarea
                                className='text-area-input-holder'
                                    name='itemDescription'
                                    value={formData.itemDescription}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr className='rowborder'>
                            <td className='table-labls'>
                                Category</td>
                                <td className='table-labl'>
                                <select
                                    name='category'
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=''>Select Category</option>
                                    <option value='Category1'>Category1</option>
                                    <option value='Category2'>Category2</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='rowborder'>
                            <td className='table-labls'>
                                Tax Type</td>
                                <td className='table-labl'>
                                <select
                                    name='taxType'
                                    value={formData.taxType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=''>Select Tax Type</option>
                                    <option value='TaxType1'>TaxType1</option>
                                    <option value='TaxType2'>TaxType2</option>
                                </select>
                            </td>
                        </tr>


                        <tr className='rowborder'>
                            <td className='table-labls'>
                                Unit of Measure</td>
                                <td className='table-labl'>
                                <select
                                    name='unitofmeasure'
                                    value={formData.unitofmeasure}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=''>Select unit of Measure</option>
                                    <option value='TaxType1'>TaxType1</option>
                                    <option value='TaxType2'>TaxType2</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='rowborder'>
                            <td className='table-labls'>
                                Item Type</td>
                                <td className='table-labl'>
                              
                                 <select
                                    name='itemType'
                                    value={formData.itemType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=''>Select Item Type</option>
                                    <option value='TaxType1'>manufactured</option>
                                    <option value='TaxType2'>purchased</option>
                                </select>
                            </td>
                        </tr>
                        <tr className='rowborder'>
                            <td className='table-labls'>
                                Exclude from Sale</td>
                                <td className='table-labl'>
                                <input
                                    type='checkbox'
                                    name='excludeFromSale'
                                    checked={formData.excludeFromSale}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr className='rowborder'>
                            <td className='table-labls'>
                               Exclude from Purchase</td>
                               <td className='table-labl'>
                                <input
                                    type='checkbox'
                                    name='excludeFromPurchase'
                                    checked={formData.excludeFromPurchase}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                <thead>
    <tr>
        <th colSpan="2" className="headertxt">miscellaneous Settings</th>
    </tr>
</thead>
                    <tbody>
                    <tr className='rowborder'>
                            <td className='table-labls'>
                                Dimension</td>
                                <td className='table-labl'>
                                <select
                                    name='dimension'
                                    value={formData.dimension}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=''>Select Work Area</option>
                                    <option value='Category1'>Kiambu </option>
                                    <option value='Category2'>Nairobi</option>
                                </select>
                            </td>
                           
                        </tr>
                        <tr>
        <th colSpan="2" className="headertxt">accounts</th>
    </tr> <tr className='rowborder'>
                            <td className='table-labls'>
                                Sales Accounts</td>
                                <td className='table-labl'>
                                <select
                                    name='salesAccount'
                                    value={formData.salesAccount}
                                    onChange={handleInputChange}
                                >
                                    <option value=''>Select Sales Account</option>
                                    <option value='Category1'>Category1</option>
                                    <option value='Category2'>Category2</option>
                                </select>
                            </td>
                                   
                        </tr>

                        <tr className='rowborder'>
                            <td className='table-labls'>
                                Other Accounts</td>
                                <td className='table-labl'>
                                <select
                                    name='otherAccount'
                                    value={formData.otherAccount}
                                    onChange={handleInputChange}
                                >
                                    <option value=''>Select other account</option>
                                    <option value='Category1'>Category1</option>
                                    <option value='Category2'>Category2</option>
                                </select>
                            </td>
                           
                        </tr>
                        <tr className='rowborder'>
                            <td className='table-labls'>
                               Purchase Accounts</td>
                                <td className='table-labl'>
                                <select
                                    name='purchaseAccount'
                                    value={formData.purchaseAccount}
                                    onChange={handleInputChange}
                                >
                                    <option value=''>Select Purchase Account</option>
                                    <option value='Category1'>Category1</option>
                                    <option value='Category2'>Category2</option>
                                </select>
                            </td>
                           
                        </tr>
                        <tr>
        <th colSpan="2" className="headertxt">Files</th>
    </tr>
    <tr className='rowborder'>
    <td className='table-labls'>Choose Image</td>
    <td className='table-labl'>
        <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setFormData((prevState) => ({
                            ...prevState,
                            image: reader.result, // Store the image data URL in the state
                        }));
                    };
                    reader.readAsDataURL(file);
                }
            }}
        />
    </td>
</tr>
<tr className='rowborder'>
    <td className='table-labls'>Image Display</td>
    <td className='table-labl'>
        {formData.image ? (
            <img
                src={formData.image}
                alt="Selected"
                style={{ width: '40px', height: '40px', objectFit: 'cover', border: '1px solid #ccc' }}
            />
        ) : (
            <span>No image selected</span>
        )}
    </td>
</tr>
<tr>
        <th colSpan="2" className="headertxt">Status</th>
    </tr>
<tr className='rowborder'>
                            <td className='table-labls'>
                               Item Status</td>
                                <td className='table-labl'>
                                <select
                                    name='status'
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=''>Select Status</option>
                                    <option value='Category1'>Active</option>
                                    <option value='Category2'>Inactive</option>
                                </select>
                            </td>
                           
                        </tr>
                       
                    
                    </tbody>
                </table>
            </div>

            {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
            <div className='btn-sec-4tier'>
                <button type='submit' className='pagenavbutton'>Refresh</button>
                <button type='reset' className='pagenavbutton'>clear form</button>
                <button type='submit' className='print-button'>Submit</button>
                
                <button type='submit' className='print-button'>Update</button>
                <button type='submit' className='pagenavbutton'>Back</button>
            </div>
            </form>
            <Powerfooter/>
        </div>
    );
};

export default Itemsetup;
