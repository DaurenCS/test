import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Body from './components/MainBody/MainBody';
import Login from './components/Login/Login';
import React from 'react';
import Registration from './components/Registration/Registration';
import FoodCard from './components/FoodCard/FoodCard'
import FoodCart from './components/FoodCart/FoodCart'

function App() {
  return (
    <>
        <Header/>
        <Routes>
          <Route exact path="/" Component={Body} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/register" Component={Registration} />
          <Route exact path="/foodlist/:id" Component={FoodCard} />
          <Route exact path="/cart" Component={FoodCart} />
          <Route path="*" element={<Navigate from="*" to="/" />} />
        </Routes>
    </>
  );
}

export default App;
