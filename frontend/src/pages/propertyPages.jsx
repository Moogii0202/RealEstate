import React from 'react'
import MainContainer from '../utils/MainContainer'
import PropertyList from '../components/PropertyList'
import SideBars from '../sidebar/Sidebar'
const PropertyPages = () => {
  return (
    <div>
       <SideBars/>
        <MainContainer>
           <PropertyList/>
          
        </MainContainer>
    </div>
  )
}

export default PropertyPages;