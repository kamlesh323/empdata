import React from "react"

function Infotable({ info, toAscendingID, toDescendingID, handleAscendingName, handleDescendingName }){


  return(
<>
{/* Creating our_Table */}
<div className='mainTable'> 
<table>
  <thead>
  <tr>
    <th className='idHeading'>ID {/*Sorting_buttons for id*/}
<div className='idSort'>
<button className='toAscendingIDButton' onClick={toAscendingID}>▲</button>
  <button className='toDescendingIDButton'  onClick={toDescendingID}>▼</button>
  
</div></th>
    <th>Image </th>
    <th className='fullnameHeading'>Full Name  {/*Sorting_buttons for name*/}
<div className='orders'>
  <button className='ascButton'  onClick={handleAscendingName}>▲</button>
  <button className='dscButton'  onClick={handleDescendingName}>▼</button>
</div>

</th>
    <th>demography</th>
    <th>Designation</th>
    <th>Location</th>
  </tr>
  </thead>


  <tbody className='tableBody'>

{/* Using map to get all information in table */}
{
info.map((item)=>(

<tr key={item.id}>

<td className='dataid'>{item.id}</td>
<td>
<img className='profilepic' src={item.image}  alt='Profile pic'  />
</td>
<td>{item.firstName} {item.maidenName} {item.lastName}</td>
<td>{item.gender}/{item.age}</td>
<td>{item.company.title}</td>
<td>{item.address.city},{item.address.designation}</td>

</tr>
))
}
</tbody>

</table>
</div>

</>
  )
}

export default Infotable;