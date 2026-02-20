import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({setmenuOpened, containerstyles }) => {

  const navLinks = [
    {path: '/', title: 'Home'},
    {path: '/listing', title: 'Listing'},
    {path: '/blog', title: 'Blog'},
    {path: '/contact', title: 'Contact'},

  ];
  return  <nav className={`${containerstyles}`}>
    {navLinks.map((Link)=>(
      <NavLink onClick={()=>{setmenuOpened(false); scrollTo(0,0); 

      }}
       key={Link.title} 
       to={Link.path}
      className={({isActive})=> `${isActive ? "active-link" : ""} px-3 py-2 rounded-full uppercase text-sm font-bold `}
      >
        {Link.title}
      </NavLink>
    ))}
   
  </nav>
  
};

export default Navbar