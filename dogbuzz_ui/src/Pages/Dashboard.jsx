import React,{useState,useEffect} from 'react'
import ReusableMenu from '../Components/ReusableMenu';
import '../Styles/Dashboard.css';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [breeds,setBreeds]=useState(0)
const [dataHolder, setdataHolder] = useState([]);
const [success, setSuccess] = useState('');
const [error, setError] = useState('');
  useEffect(()=>{
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
  
    fetchCategoryData();


      fetchData();


  },[]);

  

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:5000/AddBreedForm');
    const data = await response.json();
    setBreeds(data.length);
  }

  return (
    <div id="Dashboard-container">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
   
      <ReusableMenu/>
      <h1>The number of breeds is: {breeds}</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className='notification-bar'>
        <h4 className='notification-bar-header'>Notification Bar</h4>
        <hr/>
        
      {dataHolder.map((val)=>(
        <>
        <p>Category {val.categoryName} was created at {val.timecol}.</p>
        <p>Category {val.categoryName} was created at {val.timecol}.</p>
        <p>Category {val.categoryName} was created at {val.timecol}.</p>
        <p>Category {val.categoryName} was created at {val.timecol}.</p>
        <p>Category {val.categoryName} was created at {val.timecol}.</p>
        <p>Category {val.categoryName} was created at {val.timecol}.</p>
        </>
      ))}
      
      </div>
    </div>
  );
};

export default Dashboard;


