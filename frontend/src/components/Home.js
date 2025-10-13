import React from 'react';
import FertilizerList from './FertilizerList';
import { Link } from 'react-router-dom';
import banner from '../assets/banner.png';


export default function Home() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };

  return (
    <div>
      <nav>
        <div>
          {token ? (
            <button onClick={handleLogout} style={{padding:'5px 10px', borderRadius:'5px', cursor:'pointer'}}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <div className="container">
        <FertilizerList />
      </div>
    </div>
  );
}
