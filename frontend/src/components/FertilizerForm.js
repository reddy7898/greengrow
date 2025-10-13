import React, { useState } from 'react';
import API from '../api/api';

export default function FertilizerForm({ fetchFertilizers }) {
  const [form, setForm] = useState({ name:'', description:'', price:'', stock:'' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/fertilizers', form);
      alert('Fertilizer added!');
      setForm({ name:'', description:'', price:'', stock:'' });
      fetchFertilizers();
    } catch(err) {
      alert(err.response?.data?.message || 'Error adding fertilizer');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Fertilizer</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} type="number" required />
      <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} type="number" required />
      <button type="submit">Add</button>
    </form>
  );
}
