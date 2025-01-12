import React, { useState,useEffect,useRef} from 'react';
import Delete from "../Assets/DeleteIcon.svg"
import Edit from "../Assets/EditIcon.svg"
import { NavLink,useNavigate } from 'react-router-dom';
import "./AssetInventoryReport.css"
import { Helmet } from 'react-helmet';
const AssetInventoryReport = () => {
  const modal = useRef()
  const navigate = useNavigate()
const [dataHolder, setdataHolder] = useState([]);
const [success, setSuccess] = useState('');
const [error, setError] = useState('');
const [pageNo, setPageNo] = useState(1);
const rowsperPage = 32;
const pagerowslastindex = pageNo * rowsperPage;
const pagerowsfirstindex = pagerowslastindex - rowsperPage
const displayingpage = dataHolder.slice(pagerowsfirstindex, pagerowslastindex);
const [isMoadalOpen, setIsMoadalOpen] = useState(false);
const [editRowData, setEditRowData] = useState(null);

const fetchCategoryData = async () => {
  try {
    const response = await fetch("http://localhost:5000/FetchItemCategories", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      setdataHolder(data.data);
      setSuccess(data.success);
    } else {
      setError(data.error || "Failed to load data!");
    }
  } catch (error) {
    setError("Error Loading data, check your internet connection!");
  }
};

useEffect(() => {


  fetchCategoryData();
const disappear =(e)=>{
  if(modal.current && !modal.current.contains(e.target)){
    setIsMoadalOpen(false)
    setEditRowData(null)
  }}
  document.addEventListener('mousedown',disappear)
  return ()=>{
    document.removeEventListener('mousedown', disappear)
  }
}, []); 

const handleSmartBg = (index) => {
  if (index % 2 === 0) {
      return { backgroundColor: "#f1f1" }
  }
  else{
    return {
      backgroundColor: "#F2F2F2"
    }}
};


const handlePrev = ()=>{
  if(pageNo > 1){ 
  setPageNo(pageNo - 1)
  }
  
}

const handleNext = ()=>{
  if(pageNo < Math.ceil(dataHolder.length/rowsperPage)){
  setPageNo(pageNo + 1)
  }
}


const handleDeleteClick =async(id)=>{
  try{
const response = await fetch(`http://localhost:5000/DeleteItemCategories/${id}`,{
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
})
const realres = await response.json()
if(response.ok){
  setSuccess(realres.message || "Item Category deleted successfully!")
  fetchCategoryData();
}
  else{
  setError(realres.error || "Failed to delete item category check your connection!")
}
}
catch (err) {
  setError("Failed to delete item category check your connection!")
}
}

const handleEditClick = (id) => {
  // Find the item with the matching id
  const dataToEdit = dataHolder.find(acc => acc.id === id); // Correct comparison

  if (dataToEdit) {
    // Store the found object as a JSON string in localStorage
    localStorage.setItem("Edit-data", JSON.stringify(dataToEdit)); 
  }

  // Navigate to the edit page
  navigate("/assetmanagement/createcategory");
};


const handleRowDisplay =(item) =>{
  setIsMoadalOpen(!isMoadalOpen)
  setEditRowData(item)
}

const handlePrint =()=>{
  const printSec = document.getElementById('print-row').innerHTML
  const originalBody =document.body.innerHTML

  document.body.innerHTML = printSec
  window.print()
  document.body.innerHTML = originalBody
  window.location.reload();
}

const handleCancelPrint =()=>{
  setIsMoadalOpen(false)
  setEditRowData(null)
}
  return (
    <div>
    <Helmet>
      <title>Category Report</title>
    </Helmet>
      {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <span className='setups_acc_head'>Item Categories</span>
                <hr/>
                <div className="item-header-section">
                <NavLink 
          to="/asset-management" 
          className="account_setup" 
          activeClassName="active"
        >
          <h6 className="account-header-title">Asset Hub</h6>
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
          <h6 className="account-header-title">Category-Item</h6>
        </NavLink>
        </div>
      <table className='item-report-table'>
      <thead>
  <tr>
    <th>No:</th>
    <th>Category Name</th>
    <th>Category Description</th>
    <th>Tax Type</th>
    <th>Unit of Measure</th>
    <th>Purchase Exclusion</th>
    <th>Sale Exclusion</th>
    <th>Sales Account</th>
    <th>Purchase Account</th>
    <th>Work Area</th>
    <th>Timestamp</th> 
    <th>Action</th>
  </tr>
</thead>
<tbody>
  
{displayingpage.length === 0 ? (
  <tr><td colSpan="12">Loading...</td></tr>
) : (
  displayingpage.map((val, idx) => {
    console.log(val.ExcludefromSale, val.ExcludefromPurchase); // Debugging log
    return (
      <tr key={idx} style={handleSmartBg(idx)} className='purchaseacc_row'>
        <td  className="clickable-cell" onClick={()=>handleRowDisplay(val)}>{idx + 1}</td>
        <td className='border-separator'>{val.categoryName}</td>
        <td className='border-separator'>{val.categoryDescription}</td>
        <td className='border-separator'>{val.categoryTaxType}</td>
        <td className='border-separator'>{val.categoryUnitOfMeasure}</td>
        <td className='border-separator'>{val.ExcludefromSale === 0? "Excluded" : 'Not Excluded'}</td>
        <td className='border-separator'>{val.ExcludefromPurchase === 1 ? 'Excluded' : 'Not Excluded'}</td>
        <td className='border-separator'>{val.salesAccount}</td>
        <td className='border-separator'>{val.purchaseAccount}</td>
        <td className='border-separator'>{val.workArea}</td>
        <td className='border-separator'>{val.timecol}</td>
        <td>
          <div className="icons_section">
            <img
              src={Delete}
              alt="Delete"
              onClick={() => handleDeleteClick(val.id)} 
              className="action_icons"
              title="Delete Account"
            />
            <img
              src={Edit}
              alt="Edit"
              onClick={() => handleEditClick(val.id)} 
              className="action_icons"
              title="Edit Account"
            />
          </div>
        </td>
   
      </tr>


    );
  })
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
  Page <span className='currentpage'>{pageNo} </span> of <span className='max_pages'>{Math.ceil(dataHolder.length/rowsperPage)} </span>
</span>
</td>
</tr>

</tbody>

      </table>

      {editRowData && (
  <div id="print-row" ref={modal}>
    <table className="modal-table" >
      <p className='order-title'>Category Details No:{editRowData.id}</p>
      <tbody>
        <tr>
          <td><strong>Category Name:</strong></td>
          <td className='border-separator'>{editRowData.categoryName}</td>
        </tr>
        <tr>
          <td><strong>Category Description:</strong></td>
          <td className='border-separator'>{editRowData.categoryDescription}</td>
        </tr>
        <tr>
          <td><strong>Category Tax Type:</strong></td>
          <td className='border-separator'>{editRowData.categoryTaxType}</td>
        </tr>
        <tr>
          <td><strong>Unit of Measure:</strong></td>
          <td className='border-separator'>{editRowData.categoryUnitOfMeasure}</td>
        </tr>
        <tr>
          <td><strong>Exclude from Sale:</strong></td>
          <td className='border-separator'>{editRowData.ExcludefromSale === 0 ? "Excluded" : "Not Excluded"}</td>
        </tr>
        <tr>
          <td><strong>Exclude from Purchase:</strong></td>
          <td className='border-separator'>{editRowData.ExcludefromPurchase === 1 ? "Excluded" : "Not Excluded"}</td>
        </tr>
        <tr>
          <td><strong>Sales Account:</strong></td>
          <td className='border-separator'>{editRowData.salesAccount}</td>
        </tr>
        <tr>
          <td><strong>Purchase Account:</strong></td>
          <td className='border-separator'>{editRowData.purchaseAccount}</td>
        </tr>
        <tr>
          <td><strong>Work Area:</strong></td>
          <td className='border-separator'>{editRowData.workArea}</td>
        </tr>
        <tr>
          <td><strong>Time:</strong></td>
          <td className='border-separator'>{editRowData.timecol}</td>
        </tr>
      </tbody>
    </table>
    <span className='btn-sec'>
      <button type='button' onClick={handlePrint} className='print-button'>Print</button>
      <button type='button' onClick={handleCancelPrint} className='pagenavbutton'>Cancel</button>
    </span>
  </div>
)}

    </div>
  );
}

export default AssetInventoryReport;
