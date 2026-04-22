import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const addToCart = () => {
    // Simple cart in localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.product === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ product: id, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <img src={product.image || 'placeholder.jpg'} alt={product.name} />
      <div className="details">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <p>Artisan: {product.artisan.name}</p>
        <p className="price">${product.price}</p>
        <button className="btn" onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;