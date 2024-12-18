import React,{useState,useEffect} from 'react'
import ReusableMenu from '../Components/ReusableMenu';
import '../Styles/Dashboard.css';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [breeds,setBreeds]=useState(0)

  useEffect(()=>{
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
      
    </div>
  );
};

export default Dashboard;


