import React, { useState } from 'react';
import API, { setAuthToken } from '../api/api';
import { Link, useHistory } from 'react-router-dom';
import banner from '../assets/banner.png';
import '../styles/login.css';

export default function Login() {
  const history = useHistory();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', general: '' }); // clear errors as user types
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });

    // Basic frontend validation
    if (!form.email) return setErrors(prev => ({ ...prev, email: 'Email is required' }));
    if (!form.password) return setErrors(prev => ({ ...prev, password: 'Password is required' }));

    try {
      const res = await API.post('/login', form);
      const { token, user } = res.data;

      // Save auth details
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      // Set token globally
      setAuthToken(token);

      // Trigger route update (instant redirect without refresh)
      window.dispatchEvent(new Event("storage"));

      // Redirect user
      history.push('/fertilizer');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password';
      setErrors(prev => ({ ...prev, general: msg }));
    }
  };

  return (
    <div className="login-body" style={{ backgroundImage: `url(${banner})` }}>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          {/* Global error message */}
          {errors.general && <div className="error-message">{errors.general}</div>}

          {/* Email field */}
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

          {/* Password field */}
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

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
