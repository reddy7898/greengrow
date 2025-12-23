import React, { useEffect, useState } from 'react';
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import API from '../api/api';
import FertilizerForm from './FertilizerForm';
import fertilizerImg from '../assets/fertilizer.png';
import greengrowLogo from '../assets/logo.png';
import '../styles/FertilizerList.css';

export default function FertilizerList() {
  const [fertilizers, setFertilizers] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const { cartCount} = useCart(); 
  const { cartItems, addToCart, removeFromCart } = useCart();


  const fetchFertilizers = async () => {
    try {
      const res = await API.get('/fertilizers');
      setFertilizers(res.data.data);
    } catch (err) {
      console.error('Error fetching fertilizers:', err);
    }
  };

  useEffect(() => {
    fetchFertilizers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this fertilizer?')) {
      await API.delete(`/fertilizers/${id}`);
      fetchFertilizers();
    }
  };

  const handleAddToCart = (f) => {
     addToCart();
  };

  const handleBuyNow = (f) => {
    alert(`Proceeding to buy ${f.name}...`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login'; // Redirect to login page
  };

  const handleLogoClick = () => {
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <div className="fertilizer-page">
      {/* ✅ Header section with logo and logout */}
     <header className="app-header">
  <div className="logo-section">
    <img src={greengrowLogo} alt="GreenGrow Logo" className="app-logo" />
    <h2 className="app-title">GreenGrow Fertilizers</h2>
  </div>

  <div className="header-right">
    <div className="cart-icon">
      <FaShoppingCart size={22} />
      {cartCount > 0 && (
        <span className="cart-badge">{cartCount}</span>
      )}
    </div>

    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>
</header>


      <h1 className="page-title">🌿 Fertilizer Products</h1>

      {role === 'admin' && (
        <div className="form-wrapper">
          <FertilizerForm fetchFertilizers={fetchFertilizers} />
        </div>
      )}

      <div className="fertilizer-grid">
        {fertilizers.map((f) => (
          <div key={f.id} className="fertilizer-card">
            <img src={fertilizerImg} alt="Fertilizer" className="fertilizer-img" />
            <h3>{f.name}</h3>
            <p className="desc">{f.description || 'High quality fertilizer for better growth.'}</p>
            <p><strong>Price:</strong> ₹{f.price}</p>
            <p><strong>Stock:</strong> {f.stock}</p>

            {role === 'admin' ? (
              <button className="delete-btn" onClick={() => handleDelete(f.id)}>
                Delete
              </button>
            ) : (
              <div className="action-buttons">
  <button
    className="cart-btn"
    onClick={() => addToCart(f.id)}
  >
    🛒 Add to Cart
  </button>

  {cartItems[f.id] && (
    <button
      className="remove-cart-btn"
      onClick={() => removeFromCart(f.id)}
    >
      ➖ Remove
    </button>
  )}

  <button
    className="buy-btn"
    onClick={() => handleBuyNow(f)}
  >
    💳 Buy Now
  </button>
</div>

            )}
          </div>
        ))}
      </div>
    </div>
  );
}
