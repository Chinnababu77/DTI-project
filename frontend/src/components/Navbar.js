import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get user info
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Artisan Market</Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          {user ? (
            <>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;