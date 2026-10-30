import React from 'react'
import {useState} from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/logo.png';
// import banner from '../assets/banner.png';



 

  const SearchBar = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
  e.preventDefault();
  console.log('Searching for:', search);
  };


  return (
   <form
   onSubmit={handleSearch}
   className="flex items-center w-full max-w-xl border border-gray-300 rounded-lg bg-white px-4 py-2 focus-within:border-orange-500"
 >
       <input
        type="text"
         placeholder="Search for products..."
        value={search}
         onChange={(e) => setSearch(e.target.value)}
         className="w-full outline-none text-gray-700 bg-transparent"
          />

  <button type="submit" className="text-gray-700 hover:text-orange-500">
    <i className="fa-solid fa-magnifying-glass"></i>
  </button>
</form>
  )
}

export default SearchBar;
