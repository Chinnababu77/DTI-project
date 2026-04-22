import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
    axios.get('http://localhost:5000/api/admin/products', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
    axios.get('http://localhost:5000/api/admin/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/orders/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin">
      <h1>Admin Panel</h1>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => <li key={user._id}>{user.name} - {user.role}</li>)}
        </ul>
      </section>
      <section>
        <h2>Products</h2>
        <ul>
          {products.map(product => <li key={product._id}>{product.name} - ${product.price}</li>)}
        </ul>
      </section>
      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              {order.user.name} - ${order.total} - {order.status}
              <select value={order.status} onChange={e => updateOrderStatus(order._id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;