# Artisan E-commerce Website

A full-stack e-commerce platform for local artisans to sell their handmade products.

## Features

- User authentication (Customer, Artisan, Admin roles)
- Product management for artisans
- Product browsing with filters and search
- Shopping cart and checkout
- Order management
- Admin panel

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Installation

1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm start`
4. Start MongoDB
5. Configure .env in backend
6. Start backend: `cd backend && npm run dev`
7. Start frontend: `cd frontend && npm start`

## Database Schema

- Users: id, name, email, password, role
- Products: id, name, price, description, category, image, artisan_id
- Orders: id, user_id, products, total, status, address

## Usage

- Register as customer or artisan
- Artisans can add/edit/delete products
- Customers can browse, search, add to cart, checkout
- Admins can manage users, products, orders