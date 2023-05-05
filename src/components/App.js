import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';

// import components
import { default as Header } from './Header';
import { default as HomePage } from './HomePage';
import { default as Cart } from './Cart';
import { default as Register } from './Register';
import { default as Login } from './Login';
import { default as Footer } from './Footer';
import { default as Profile } from './Profile';
import {
  AdminProducts,
  AddProduct,
  AdminHomePage,
  AdminUsers,
} from './admin/index.js';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);


const isAdmin = localStorage.getItem('isAdmin')

  // render all components below
  return (
    <div className="app-container">
      <Header token={token} isAdmin={isAdmin}/>
        {/* will eventually need to add ternary here to check for token */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/AdminHomePage' element={<AdminHomePage isAdmin={isAdmin} />} />
        <Route path='/AdminProducts' element={<AdminProducts isAdmin={isAdmin} />} />
        <Route path='/AdminUsers' element={<AdminUsers isAdmin={isAdmin} />} />
        <Route path='/AddProduct' element={<AddProduct isAdmin={isAdmin} />} />
        <Route path='/cart' element={<Cart />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
