 import React from 'react'
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle form submission logic here
    axios.post('http://localhost:5000/api/auth/register', { name, email, password })
      .then(response => {
       // console.log('Registration successful:', response.data);
        // Handle successful registration (e.g., redirect, store token, etc.)
        navigate('/');
        
      })
      .catch(error => {
        console.error('Registration error:', error.response.data);
        // Handle registration error (e.g., show error message)
      });
  };
  
  return (<>

  <div className="loginpage min-h-screen flex items-center justify-center bg-orange-100 px-4 py-8">
  <div className="login w-full max-w-md bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl">

           <div className="text-center">
     <h1 className="text-4xl sm:text-5xl text-orange-500 mb-4">
  <i className="fa-solid fa-store"></i>
</h1>

<h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
  Registration Page
</h1>

<h2 className="text-base sm:text-lg text-gray-500 mt-2">
  Welcome to ShopNest
</h2>
    </div>

     <form className="mt-8">
          <label className="block text-gray-700 mb-2">
       Name
      </label>
      <input
        type="text"
        placeholder="Enter your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <label className="block text-gray-700 mb-2">
        Email Address
      </label>
       <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

       <label className="block text-gray-700 mb-2">
        Password
      </label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

        <button
        type="submit"
        value="Register"
        onClick={handleSubmit}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
      >
        Register
      </button>

       <p className="text-center text-gray-500 mt-6">
     Already have an account?{" "}
      <a href="/login" className="text-orange-600 font-semibold">
        Sign in
      </a>
    </p>

      </form>
    </div>

     
  </div>
  </>)
  
}
  

export default Loginpage



