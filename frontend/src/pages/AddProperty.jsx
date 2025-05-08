import React from 'react'
import MainContainer from '../utils/MainContainer';
import PropertyForm from '../components/PropertyForm';
import SideBars from '../sidebar/Sidebar';
const AddProperty = () => {
  return (
    <div>
     <SideBars/>
   <MainContainer>
    <PropertyForm>

    </PropertyForm>
   </MainContainer>
    </div>
  )
};

export default AddProperty;