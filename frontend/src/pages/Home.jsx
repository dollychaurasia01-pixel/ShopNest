import React from 'react'
import Navbar from '../components/Navbar';
import banner from '../assets/banner.png';

import SearchBar from '../components/SearchBar';

export const Home = () => {
  return (
      
      <>
   
    
    <div>
      <Navbar />
    </div>

    <div className="flex justify-center mt-10 h-screen">
      <img src={banner} alt="ShopNest Banner" className=" w-full h-auto object-contain" />
    </div>
    </>
        
       
   
  )
}
