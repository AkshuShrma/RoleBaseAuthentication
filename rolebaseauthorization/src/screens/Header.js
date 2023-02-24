import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Header() {
  const navigate=useNavigate();
  const[user,setUser]=useState(null);

  useEffect(()=>{
    let usr= localStorage.getItem("currentUser");
    if(usr){
      setUser(usr);
    }
  },[]);
  const logOutClick=()=>{
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <Link to="/home" className="nav-link">
            Home
        </Link>
      </li>
      <li class="nav-item">
      <Link to="/employee" className="nav-link">
            Employee
        </Link>     
         </li>
         <li class="nav-item">
      <Link to="/company" className="nav-link">
            Company
        </Link>     
         </li>
    </ul>
  </div>
  {user?(
      <div/>
  ):(
    <Link to="/register" className="btn btn-outline-success my-2 my-sm-0 m-1">
    Register
</Link>   
  )}  
  {user?(
         <a onClick={logOutClick} className="btn btn-outline-success my-2 my-sm-0 m-1">
         LogOut
     </a>
  ):(
    <Link to="/login" className="btn btn-outline-success my-2 my-sm-0 m-1">
    Login
</Link>
  )}  
</nav>
    </div>
  )
}

export default Header;