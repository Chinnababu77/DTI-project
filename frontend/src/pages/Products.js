import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    if (search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredProducts(filtered);
  }, [category, search, products]);

  return (
    <div className="products">
      <h1>Products</h1>
      <div className="filters">
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Handicrafts">Handicrafts</option>
          <option value="Textiles">Textiles</option>
          <option value="Artworks">Artworks</option>
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image || 'placeholder.jpg'} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product._id}`} className="btn">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;