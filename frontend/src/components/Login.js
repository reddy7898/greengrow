import React, { useState } from 'react';
import API, { setAuthToken } from '../api/api';
import { Link, useHistory } from 'react-router-dom';
import banner from '../assets/banner.png';
import '../styles/login.css';

export default function Login() {
  const history = useHistory(); // useHistory instead of useNavigate
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      setAuthToken(res.data.token);
      history.push('/fertilizer'); // use history.push for navigation
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-body" style={{backgroundImage: `url(${banner})`}}>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
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
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
