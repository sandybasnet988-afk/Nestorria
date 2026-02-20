import React, { useEffect, useState } from "react";
import { Link,  useLocation } from "react-router-dom";
import { assets } from  "../assets/data";
import Navbar from "./Navbar";
import {useClerk, UserButton,} from "@clerk/clerk-react";
import { useAppContext} from "../context/AppContext";

const Header = () => {

const [active, setActive] = useState(false);
  const [menuOpened, setmenuOpened] = useState(false);
  const [showSearch, setshowSearch] = useState(false);
  const location = useLocation();
  const {navigate, user} = useAppContext();
  const {openSignIn} = useClerk();

  const BookingIcon = () => (
    <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  class="lucide lucide-scroll-text lucide-scroll-text-icon"
>
  <path d="M15 12h.5" />
  <path d="M15 8h.5" />
  <path d="M15 16h.5" />
  <path d="M10 9h5" />
  <path d="M10 13h5" />
  <path d="M10 17h5" />
  <path d="M18 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6" />
  <path d="M6 2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" />
</svg>
    
  )

  const toggleMenu = ()=> setmenuOpened(prev => !prev)

  useEffect(()=>{
    const handlescroll = ()=>{
      if(location.pathname === "/"){
        setActive(window.scrollY > 10) 
      }else{
        setActive(true) // always stay active on other pages
      }
      if(window.scrollY > 10){
        setmenuOpened(false)
      }
    };

    window.addEventListener("scroll", handlescroll ); // run once to set initial active state
    

    return ()=>{
      window.removeEventListener("scroll", handlescroll )
    };

  }, [location.pathname])


  return (
    <header className={`${active ? "bg-white py-3 shadow-md" : "py-4"} fixed top-0 w-full left-0 right-0 z-50 transition-all duration-200`}>
      <div className='max-padd-container'>
        {/*container*/}
        <div className='flexBetween'>
          {/*logo*/}
          <div className=' flex flex-1'>
            <Link to={'/'}>
            <img src={assets.logoImg} alt="logoimg" className={`${!active && "invert"} h-11`} />
            </Link>
          </div>
          {/*navbar*/}
          <Navbar 
            setmenuOpened={setmenuOpened}
            containerstyles={`${
              menuOpened ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 rounded=x1 z-50"
              :"hidden lg:flex gap-x-5 xl:gap-x-1 medium-15 p-1"
            } ${!menuOpened && !active ? "text-white" : ""}`}
            />
          {/*buttons searchbar & profile*/}
          <div className='flex sm:flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8'>
           {/*searchbar*/}
           <div className='relative hidden xl:flex items-center'>
            <div className={`${active ? "bg-secondary/10" : "bg-white" } transition-all duration-300 ease-in-out ring-1 ring-slate-90 10 rounded-full overflow-hidden ${
              showSearch
              ? "w-[266px] opacity-100 px-4 py-2"
              : "w-11 opacity-0 px-0 py-0"
            }`}
            >
              <input type="text" placeholder="Type here..." className="w-full text-sm outline-non pr-10 placeholder:text-gray-400" />
            </div>
            <div onClick={()=> setshowSearch(prev => !prev)} className={`${ active ? "bg-secondary/10" : "bg-primary"} absolute right-0 ring-1 ring-slate-900/10 p-[8px] rounded-full cursor-pointer z-10`}>
             <img src={assets.search} alt="searchIcon" />
            </div>

           </div>
           {/*menu toggler*/}
           <>
          {menuOpened ? (
            <img src={assets.close} alt="closeMenuIcon" onClick={toggleMenu} className={`${!active && "invert"} lg:hidden cursor-pointer text-xl`} />
          ) : (
            <img src={assets.menu} alt="openMenuIcon" onClick={toggleMenu} className={`${!active && "invert"} lg:hidden cursor-pointer text-xl`} />
          )}
           </>
          {/* User Profile*/}
          <div className="group relative top-1">
            {/*user*/}
            <div>
              {user ? (
                <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox:{
                      width:"42px",
                      height:"42px"
                    }
                  }
                }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action 
                    label="MY Bookings"
                    labelIcon={<BookingIcon />}
                    onClick={()=>navigate('/my-booking')}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (

                  <button onClick={openSignIn} className='btn-secondary flexCenter gap-2-rounded-full'>
                  Login
                  <img src={assets.user} alt="userIcon" />
                </button>
              

              )

              }
        
            </div>
          </div>
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header
