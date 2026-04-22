import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '', image: '' });
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProducts(res.data.filter(p => p.artisan === JSON.parse(atob(token.split('.')[1])).id)))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/products/${editing}`, form, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post('http://localhost:5000/api/products', form, { headers: { Authorization: `Bearer ${token}` } });
      }
      setForm({ name: '', price: '', description: '', category: '', image: '' });
      setEditing(null);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = (product) => {
    setForm(product);
    setEditing(product._id);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Artisan Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Category</option>
          <option value="Handicrafts">Handicrafts</option>
          <option value="Textiles">Textiles</option>
          <option value="Artworks">Artworks</option>
        </select>
        <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <button type="submit" className="btn">{editing ? 'Update' : 'Add'} Product</button>
      </form>
      <h2>Your Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => editProduct(product)}>Edit</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;