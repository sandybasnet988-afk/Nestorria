import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProperties } from '../assets/data';
import { useUser } from '@clerk/clerk-react';

const AppContext = createContext();



export const AppContextProvider = ({children}) => {

  const currency = import.meta.env.VITE_CURRENCY

  const navigate = useNavigate();
  const [properties, setproperties] = useState([]);
  const [showAgencyReg, setShowAgencyReg] = useState(false)
   const {user} = useUser();
   const [isOwner, setIsOwner] = useState(true)

  const getproperties = ()=>{
    setproperties(dummyProperties)
  };

  useEffect(()=>{
    getproperties()
  }, [])


const value = {
  navigate, properties, currency, user, showAgencyReg, setShowAgencyReg, isOwner, setIsOwner,
};

  return <AppContext.Provider value={value}>
      {children}
     </AppContext.Provider>
  
};

export const useAppContext = ()=> useContext(AppContext);







      