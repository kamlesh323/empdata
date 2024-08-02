import React from "react";

function Filters({setDesignation,setGender}){
return(
<>
<div className='filters'>
{/* Filter_Gender */}
  <select className='genderHolder' onChange={(e)=>{ setGender(e.target.value)}}>
  <option value="">Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
  </select>
{/* Filter_designation */}
  <select className='designationHolder' onChange={(e)=>{setDesignation(e.target.value)}}>
  <option value="">Designation</option>
      <option value="Research Analyst">Research Analyst</option>
      <option value="Accountant">Accountant</option>
  </select>
  </div>
</>


)
}

export default Filters;