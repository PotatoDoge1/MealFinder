//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom';
import './App.css'
import FooterEl from './components/FooterEl.tsx';
import Navbar from './components/Navbar.tsx';
//import FetchRandomFood from './api/fetchRandomFood.tsx';

function App() {

  return (
    <>
      <Navbar />
      <main className="container pt-5">
        <Outlet />
      </main>
      {/*
      <div>
        <button onClick={ fetchRandomFood }> Random Food </button>
      </div>
      */}
 
      <footer>
        <FooterEl />
      </footer>
    </>
  )
}

export default App
