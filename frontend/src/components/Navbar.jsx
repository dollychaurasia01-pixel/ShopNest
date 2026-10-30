import React from 'react'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return ( <>
 <nav className="flex items-center justify-between w-full gap-6">
    
  <div className="w-1/4 flex items-center justify-center ">
  <Link to="/" className="flex items-center gap-2">

    <img
      src={logo}
      alt="ShopNest Logo"
      className="h-14 w-14 object-contain"
    />

    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-orange-500">
        ShopNest
      </h1>

      <p className="text-xs text-gray-500">
        Your Everyday Shopping Partner
      </p>
    </div>

  </Link>
</div>

  <div className="flex-1 flex justify-center">
    <SearchBar />
  </div>


   <div className="w-1/4 flex items-center justify-center gap-10">
    {/* Profile, Wishlist, Cart */}
     <Link to="/profile" className="flex flex-col items-center text-gray-700 hover:text-orange-500">
      <i className="fa-solid fa-user text-xl"></i>
      <span className="text-sm">Profile</span>
    </Link>

    <Link to="/wishlist" className="flex flex-col items-center text-gray-700 hover:text-orange-500">
      <i className="fa-solid fa-heart text-xl"></i>
      <span className="text-sm">Wishlist</span>
    </Link>
    
    <Link to="/cart" className="flex flex-col items-center text-gray-700 hover:text-orange-500">
      <i className="fa-solid fa-cart-shopping text-xl"></i>
      <span className="text-sm">Cart</span>
    </Link>
    
  </div>
  </nav>
  </>
  )
}

export default Navbar