// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./TaxType.css";
// import Delete from "../Assets/DeleteIcon.svg";
// import Edit from "../Assets/EditIcon.svg";
// import { Helmet } from 'react-helmet';
// const TaxType = () => {
//     const navigate = useNavigate();
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);
//     const [data, setData] = useState({
//         taxType: '',
//         taxRate: '',
//         lowerLimit: '',
//         upperLimit: '',
//     });
//     const [taxList, setTaxList] = useState([]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({ ...data, [name]: value });
//     };

//     const handleSubmission = async (e) => {
//         e.preventDefault();
//         console.log(data);

//         const url = taxList._id?
//         `http://localhost:5000/EditTax/${taxList._id}` :
//         "http://localhost:5000/AddTax";
       
//         const method = taxList._id? "PUT": "POST";


//         try {
//             const response = await fetch(url, {
//                 method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });
//             if(response.ok){
//                 const json = await response.json();
//                 console.log('Success:', json);
//                 setSuccess(true);
//                 setError(''); // Clear previous errors
//                 fetchTaxTypes(); // Refresh the list after submission
                
//                 setData({
//                     taxType: '',
//                     taxRate: '',
//                     lowerLimit: '',
//                     upperLimit: '',
//                 });
//             }
//             else {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

           
//         } catch (error) {
//             setError('Failed to add tax type');
//             console.error('Error:', error);
//         }

        
//     };

//     useEffect(() => {
//         fetchTaxTypes();
//         const editTax = localStorage.getItem('taxTypes')
//         if(editTax) {
//             const editTaxData = JSON.parse(editTax);
//             setData(editTaxData);
//             localStorage.removeItem('taxTypes');
//         }

//     }, []);

//     const fetchTaxTypes = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/AddTax"); // Ensure this matches your backend GET route
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const json = await response.json();
//             setTaxList(json.data); // Correctly set the tax list from the response
//             console.log('Success:', json);
//         } catch (error) {
//             setError('Failed to fetch tax types');
//             console.error('Error:', error);
//         }
//     };


//     // const fetchTaxTypes = async () => {
//     //     try {
//     //         const response = await fetch("http://localhost:5000/AddTax");
//     //         if (!response.ok) {
//     //             throw new Error(`HTTP error! status: ${response.status}`);
//     //         }
//     //         const json = await response.json();
//     //         setTaxList(json.data); // Ensure 'data' contains unique IDs
//     //     } catch (error) {
//     //         setError('Failed to fetch tax types');
//     //         console.error('Error:', error);
//     //     }
//     // };
    

//     const handleDynamicbg=(index)=>{
//         if(index %2 ===0){
//             return { backgroundColor: "#f1f1" }
//             }
// else{
//   return {
//     backgroundColor: "#F2F2F2"
//   }
//     }}

// // const handleTaxDeletion = async (id) => {
// //     try {
// //         const response = await fetch(`http://localhost:5000/DeleteTax/${id}`, {
// //             method: 'DELETE',
// //         });

// //         if (!response.ok) {
// //             throw new Error(`Failed to delete tax type: ${response.statusText}`);
// //         }

// //         await fetchTaxTypes(); // Refresh the list after deletion
// //     } catch (error) {
// //         console.error('Error:', error);
// //         setError('Failed to delete tax type');
// //     }
// // };


// const handleTaxDeletion = async (id) => {
//     if (!id) {
//         alert("Invalid ID. Unable to delete tax type.");
//         return;
//     }

//     try {
        
//         const response = await fetch(`http://localhost:5000/DeleteTax/${id}`, {
//             method: 'DELETE',
//         });

//         if (!response.ok) {
            
//             throw new Error(`Failed to delete tax type: ${response.statusText}`);
//         }

//         await fetchTaxTypes(); // Refresh the list after deletion
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Failed to delete tax type. Please try again.');
//         setError('Failed to delete tax type. Check your connection.');
//     }
// };



// setTimeout(() => {
//     setSuccess(false);
//     setError('');
// }, 2000);

// const handleTaxEdit = (tax) => {
//     localStorage.setItem('taxData', JSON.stringify(tax))
// }

//     return (
//         <div className='tax-type-container'>
//             <Helmet>
//                 <title>Tax Types</title>
//             </Helmet>
//             {taxList.length > 0 ?  <table className='tax-table'>
//                 <thead>
//                     <tr>
//                         <th>No:</th>
//                         <th>Tax Type</th>
//                         <th>Tax Rate</th>
//                         <th>Lower Limit</th>
//                         <th>Upper Limit</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                  <tbody>
//                     {taxList.map((tax, index) => (
//                         <tr key={tax._id} style={handleDynamicbg(index)}>
//                             <td>{index+1}</td>
//                             <td>{tax.taxType}</td>
//                             <td>{tax.taxRate}</td>
//                             <td>{tax.lowerLimit}</td>
//                             <td>{tax.upperLimit}</td>
//                             <td>
//                   <div className="icons_section">
//                     <img
//                       src={Delete}
//                       alt="Delete"
//                       onClick={() => handleTaxDeletion(tax._id)}
//                       className="action_icons_delete"
//                       title="Delete Breed"
//                     />
//                     <img
//                       src={Edit}
//                       alt="Edit"
//                       onClick={()=> handleTaxEdit(tax)}
//                       className="action_icons"
//                       title="Edit Breed"
//                     />
//                   </div>
//                 </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table> :<p>No Tax data available. Try refreshing or adding data....</p>}
//             <form className='tax-setupform' onSubmit={handleSubmission}>
//                 <div className='input_section'>
//                     <label htmlFor="taxType">Tax Type</label>
//                     <input
//                         type='text'
//                         className='tax-type'
//                         name='taxType'
//                         value={data.taxType}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className='input_section'>
//                     <label htmlFor="taxRate">Tax Rate</label>
//                     <input
//                         type='number'
//                         className='tax-rate'
//                         name='taxRate'
//                         value={data.taxRate}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className='input_section'>
//                     <label htmlFor="lowerLimit">Lower Limit</label>
//                     <input
//                         type='number'
//                         className='lower-limit'
//                         name='lowerLimit'
//                         value={data.lowerLimit}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className='input_section'>
//                     <label htmlFor="upperLimit">Upper Limit</label>
//                     <input
//                         type='number'
//                         className='upper-limit'
//                         name='upperLimit'
//                         value={data.upperLimit}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-buttons">
//                     <button type="submit" className="form-submit-btn">Add Tax</button>
//                     <button type="button" className="form-back-btn" onClick={() => navigate(-1)}>Back</button>
//                 </div>
//                 {error && <div className='error-message'>{error}</div>}
//                 {success && <div className='success-message'>Tax type added successfully</div>}
//             </form>
//         </div>
//     );
// };

// export default TaxType;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaxType.css';
import Delete from '../Assets/DeleteIcon.svg';
import Edit from '../Assets/EditIcon.svg';
import { Helmet } from 'react-helmet';

const TaxType = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState({
        taxType: '',
        taxRate: '',
        lowerLimit: '',
        upperLimit: '',
    });
    const [editingTaxId, setEditingTaxId] = useState(null);
    const [taxList, setTaxList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        if (!data.taxType || data.taxRate === '' || data.lowerLimit === '' || data.upperLimit === '') {
            setError('All fields are required.');
            return;
        }

        const url = editingTaxId
            ? `http://localhost:5000/EditTax/${editingTaxId}`
            : 'http://localhost:5000/AddTax';

        const method = editingTaxId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const json = await response.json();
            console.log('Success:', json);
            setSuccess(true);
            setError('');
            fetchTaxTypes();
            setData({
                taxType: '',
                taxRate: '',
                lowerLimit: '',
                upperLimit: '',
            });
            setEditingTaxId(null);
        } catch (error) {
            setError('Failed to add or edit tax type.');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchTaxTypes();
    }, []);

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess(false);
                setError('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const fetchTaxTypes = async () => {
        try {
            const response = await fetch('http://localhost:5000/AddTax');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const json = await response.json();
          
            
            setTaxList(json.data);
           
            
        } catch (error) {
            setError('Failed to fetch tax types');
            console.error('Error:', error);
        }
    };

    const handleTaxDeletion = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/DeleteTax/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`Failed to delete tax type: ${response.statusText}`);

            fetchTaxTypes();
        } catch (error) {
            setError('Failed to delete tax type.');
            console.error('Error:', error);
        }
    };

    const handleTaxEdit = (tax) => {
        setData(tax);
        setEditingTaxId(tax._id);
    };

    const getRowClassName = (index) => (index % 2 === 0 ? 'row-even' : 'row-odd');

    return (
        <div className="tax-type-container">
            <Helmet>
                <title>Statutory Setup</title>
            </Helmet>
            {taxList.length > 0 ? (
                <table className="tax-table">
                    <thead>
                        <tr>
                            <th>No:</th>
                            <th>Tax Type</th>
                            <th>Tax Rate</th>
                            <th>Lower Limit</th>
                            <th>Upper Limit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxList.map((tax, index) => (
                            <tr key={tax._id} className={getRowClassName(index)}>
                                <td>{index + 1}</td>
                                <td>{tax.taxType}</td>
                                <td>{tax.taxRate}</td>
                                <td>{tax.lowerLimit}</td>
                                <td>{tax.upperLimit}</td>
                                <td>
                                    <div className="icons_section">
                                        <img
                                            src={Delete}
                                            alt="Delete"
                                            onClick={() => handleTaxDeletion(tax._id)}
                                            className="action_icons_delete"
                                            title="Delete Tax"
                                        />
                                        <img
                                            src={Edit}
                                            alt="Edit"
                                            onClick={() => handleTaxEdit(tax)}
                                            className="action_icons"
                                            title="Edit Tax"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Tax data available. Try refreshing or adding data...</p>
            )}
            <form className="tax-setupform" onSubmit={handleSubmission}>
                <div className="input_section">
                    <label htmlFor="taxType">Tax Type</label>
                    <input
                        type="text"
                        name="taxType"
                        value={data.taxType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input_section">
                    <label htmlFor="taxRate">Tax Rate</label>
                    <input
                        type="number"
                        name="taxRate"
                        value={data.taxRate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input_section">
                    <label htmlFor="lowerLimit">Lower Limit</label>
                    <input
                        type="number"
                        name="lowerLimit"
                        value={data.lowerLimit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input_section">
                    <label htmlFor="upperLimit">Upper Limit</label>
                    <input
                        type="number"
                        name="upperLimit"
                        value={data.upperLimit}
                        onChange={handleChange}
                        required
                    /> 
                </div>
                <div className="form-buttons">
                    <button type="submit" className="form-submit-btn">
                        {editingTaxId ? 'Update Tax' : 'Add Tax'}
                    </button>
                    <button type="button" onClick={() => navigate(-1)}>
                        Back
                    </button>
                </div>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Tax type saved successfully</div>}
            </form>
        </div>
    );
};

export default TaxType;
