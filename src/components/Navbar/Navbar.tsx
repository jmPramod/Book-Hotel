import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const Navbar = () => {
 const [visible,setVisible]=useState(false)
  const loaction=useLocation()

 console.log(loaction);

useEffect(()=>{
  
  
  if(loaction&&loaction.pathname=='/sign-up'){
setVisible(true)
 }


},
[loaction])
if(visible){
return<>
  <Outlet/></>
}
  return (

    <>
    <div>Navbar</div>
    
    <Outlet/>
    </>
  )
}

export default Navbar