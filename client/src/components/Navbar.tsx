import { useState, useEffect } from 'react';
import auth from '../utils/auth.tsx';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // State to track the login status
    const [loginCheck, setLoginCheck] = useState(false);

    // Function to check
    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true); // Set loginCheck to true if user is logged in
        }
    };
    // Variable to indicate if we are on the login page so we can hide it
    const isLoginPage = location.pathname === '/login';

    // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
    useEffect(() => {
        checkLogin(); // Call checkLogin() function to update loginCheck state
    }, [loginCheck]); // Dependency array ensures useEffect runs when loginCheck changes

    return (
        <div className="display-flex justify-space-between align-center py-2 px-5 mint-green">
          <div>
            {
              // Conditional rendering based on loginCheck state
              !loginCheck && !isLoginPage ? (
                // Render login button if user is not logged in
                <button className="btn" type='button'>
                  <Link to='/login'>Login</Link>
                </button>
                // Render logout button if user is logged in
              ) : loginCheck ? ( 
                <button className="btn" type='button' onClick={() => {
                  auth.logout();  // Call logout() method from auth utility on button click
                }}>Logout</button>
              ) : null //do not render anything on the login page if not logged in
            }

            <Link to='/' className='Links' id='search'>Search</Link>

            <Link to='/saved' className='Links' id='saved'>Saved</Link>
            
          </div>
        </div>
      )
}

export default Navbar;