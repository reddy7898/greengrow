import React, { useState } from 'react';
import API, { setAuthToken } from '../api/api';
import { Link, useHistory } from 'react-router-dom';
import banner from '../assets/banner.png';
import '../styles/login.css'; // using same CSS

export default function Register() {
  const history = useHistory();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '', general: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', general: '' }); // clear error while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ name: '', email: '', password: '', general: '' });

    // Frontend validation
    if (!form.name) return setErrors(prev => ({ ...prev, name: 'Full name is required' }));
    if (!form.email) return setErrors(prev => ({ ...prev, email: 'Email is required' }));
    if (!form.password) return setErrors(prev => ({ ...prev, password: 'Password is required' }));

    try {
      
      const res = await API.post('/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      window.dispatchEvent(new Event("storage"));
      setAuthToken(res.data.token);

      // Redirect after successful registration
      history.push('/fertilizer');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setErrors(prev => ({ ...prev, general: msg }));
    }
  };

  return (
    <div className="login-body" style={{ backgroundImage: `url(${banner})` }}>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          {/* General (API) Error */}
          {errors.general && <div className="error-message">{errors.general}</div>}

          <div className="input-group">
            {errors.name && <div className="error-text">{errors.name}</div>}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            {errors.email && <div className="error-text">{errors.email}</div>}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            {errors.password && <div className="error-text">{errors.password}</div>}
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Password</label>
          </div>

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
