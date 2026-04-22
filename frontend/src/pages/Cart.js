import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartItems);
    // Fetch product details
    const productIds = cartItems.map(item => item.product);
    if (productIds.length > 0) {
      axios.get('http://localhost:5000/api/products')
        .then(res => {
          const cartProducts = res.data.filter(p => productIds.includes(p._id));
          setProducts(cartProducts);
        })
        .catch(err => console.log(err));
    }
  }, []);

  const updateQuantity = (productId, quantity) => {
    let updatedCart = cart.map(item =>
      item.product === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    let updatedCart = cart.filter(item => item.product !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p._id === item.product);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const checkout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // Simulate checkout
    const order = {
      products: cart.map(item => ({ product: item.product, quantity: item.quantity })),
      total,
      address: 'Simulated Address'
    };
    axios.post('http://localhost:5000/api/orders', order, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        localStorage.removeItem('cart');
        alert('Order placed!');
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="cart">
      <h1>Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <>
          {cart.map(item => {
            const product = products.find(p => p._id === item.product);
            return product ? (
              <div key={item.product} className="cart-item">
                <img src={product.image || 'placeholder.jpg'} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <input type="number" value={item.quantity} onChange={e => updateQuantity(item.product, parseInt(e.target.value))} />
                  <button onClick={() => removeItem(item.product)}>Remove</button>
                </div>
              </div>
            ) : null;
          })}
          <div className="total">Total: ${total.toFixed(2)}</div>
          <button className="btn" onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;