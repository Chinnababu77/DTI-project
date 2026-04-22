import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data.slice(0, 6))) // Featured 6
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Artisan Market</h1>
        <p>Discover unique handmade products from local artisans.</p>
        <Link to="/products" className="btn">Shop Now</Link>
      </section>
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image || 'placeholder.jpg'} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <Link to={`/product/${product._id}`} className="btn">View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;