
import  { useEffect, useState } from 'react'
import './App.css';
import Infotable from './Components/Infotable';
import Filters from './Components/Filters';
import Navbar from './Components/Navbar'


function App() {

//Declaring useState hooks
 let [info,setInfo] = useState([]); //to store user details from api
 let [userDetails,setUserDetails] = useState([]); //to store user details from api

 let [gender,setGender] = useState(""); //filter
 let [designation,setDesignation] = useState(""); 
 let [skip,setSkip] = useState(0);
 let [hasMore,sethasMore] = useState(true)
 let [isLoading,setisLoading] = useState(false)
 const totalSkips = 30;


 //Fetching API
  useEffect(()=> {
    getUserDetails();
},[skip])


const getUserDetails = async()=>{
    if (isLoading || !hasMore || skip >= totalSkips) return; //checking the conditions to break the execution
    setisLoading(true); 
    try{
    const response = await fetch(`https://dummyjson.com/users?limit=10&skip=${skip * 10}`);
    const data = await response.json();
  
    if (data.users.length < 10 || skip >= totalSkips-1) {
      sethasMore(false);
    }
    setUserDetails ([...userDetails,...data.users]);
    setInfo([...info,...data.users]);
    
    }
    catch(error){
      console.log('error', error)
    }
    setisLoading(false);
  }

  useEffect(()=>{
    //designation and Gender Filter
    const filteredinfo = userDetails.filter( user =>{
      return(
        (gender === '' || gender === user.gender) && (designation === "" || designation === user.company.title)
      )
    })
    setInfo(filteredinfo)
  },[gender,designation])
 
  //Sorting Name
 function handleAscendingName(){
 
  const sortedinfo = [...userDetails].sort((a,b)=>{
    let nameA = a.firstName.toLowerCase();
    let nameB = b.firstName.toLowerCase();
    return nameA < nameB ? -1:0;
   
   })
   setInfo(sortedinfo);
 }

 function handleDescendingName(){
  const sortedinfo = [...userDetails].sort((a,b)=>{
    let nameA = a.firstName.toLowerCase();
    let nameB = b.firstName.toLowerCase();
    return nameA > nameB ? -1:0;

   })
   setInfo(sortedinfo);
 }

   //Sorting ID
function toAscendingID(){
  const idSortedinfo = [...userDetails].sort((a,b)=>{
  return a.id - b.id;
})

setInfo([...idSortedinfo])
}

function toDescendingID(){
  const idSortedinfo = [...userDetails].sort((a,b)=>{
    return  b.id - a.id ;
  })
  setInfo([...idSortedinfo])
}


  //infinitescroll-Function to load more data on scrollevent
const handleScroll = ()=>{ 
  if(document.documentElement.scrollTop + window.innerHeight + 200 >= document.documentElement.scrollHeight){
  if(!isLoading && hasMore){ 
    setSkip(prev => prev+1)
  }
}
}

  // This will execute on scrolle event 
  useEffect(()=>{
    window.addEventListener("scroll",handleScroll)
  return () => window.removeEventListener("scroll",handleScroll)
  },[isLoading, hasMore])


  return (
<>

<div className='body'>

<Navbar/>

<div className='filterSection'>
<h1>Employees</h1>
        <Filters setGender={setGender} setDesignation={setDesignation} />
</div>
 
 <div className='tableContainer'>
<Infotable info={info} 
          toAscendingID={toAscendingID} 
          toDescendingID={toDescendingID} 
          handleAscendingName={handleAscendingName} 
          handleDescendingName={handleDescendingName}
     />
     </div>

     {isLoading && <p style={{ margin:'20px' }}>Loading...</p>}


</div>
</>

  );
}

export default App;



