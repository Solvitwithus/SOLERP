import React from 'react';
import Featureicon from "../Assets/Feature.svg"
import "./BreedModuleStyling/Breed.css"
const Dynamite = ({Breedsetupname}) => {
  return (
    <div className='Breed_creation'>
      <img src={Featureicon} alt="Featureicon" className='Featureicon'/>
      <h6 className='Feature_title'>{Breedsetupname}</h6>
    </div>
  );
}

export default Dynamite;
