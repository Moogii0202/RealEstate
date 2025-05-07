import React from "react";
const MainContainer = ({children}) => {
    return (
        <div className="p-4 pl-[16vw] max-md:pl-[21vw]">
          {children}  
        </div>
    );
};
export default MainContainer;