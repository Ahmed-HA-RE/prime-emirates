# 🛍️ PrimEmirates

**PrimEmirates** is a full-stack **E-Commerce web application** built using the **MERN stack** (MongoDB, Express, React, Node.js) with a modern frontend powered by **React Router v7**, **Zustand**, and **TanStack Query** for state and data management.

This project simulates a real-world e-commerce experience — users can browse products, add to cart, and make test payments using **PayPal Sandbox**.  
It’s built purely for **portfolio**, not commercial use.

## View it on:

[website](https://primemirates.ahmedrehandev.net)

## 🚀 Tech Stack

### 🖥️ Frontend

Built with:

- ⚛️ **React 19** + **React Router v7**
- 🪄 **Tailwind CSS** + **shadcn/ui** + **Radix UI**
- 💾 **Zustand** – global state management
- 🔗 **Axios** – API communication
- 🧩 **React Hook Form** + **Zod** – form handling & validation
- 🔄 **TanStack Query (React Query)** – data fetching & caching
- 💳 **@paypal/react-paypal-js** – PayPal sandbox integration
- 🎨 **Radix-UI, Shadcn**

### ⚙️ Backend

Built with:

- 🧱 **Node.js** + **Express.js**
- 🗄️ **MongoDB** + **Mongoose**
- 🔐 **JWT Authentication** with secure **HTTP-only cookies**
- 📦 **Cloudinary** (for product image storage)

## 💸 PayPal Sandbox Integration

Payments in PrimEmirates are powered by the **PayPal Sandbox** environment.  
This allows you to safely simulate real transactions without using real money.

> ⚠️ **Note:**  
> All payments are for **demo purposes only** — no real money is transferred.

You can use PayPal’s demo buyer credentials to test checkout.

## 🧭 App Flow (5 Main Steps)

1. **User Authentication**

   - Register, login, and manage user sessions using secure HTTP-only cookies.
   - Role-based access control (user/admin).

2. **Product Browsing**

   - Products fetched from the backend API.
   - Filters, categories, and search implemented with React Router loaders and TanStack Query.

3. **Cart & Checkout**

   - Persistent cart state managed by Zustand.
   - Checkout flow integrated with PayPal Sandbox.

4. **Order Management**

   - Users can view their order history.
   - Admins can manage all orders, update delivery statuses, and monitor transactions.

5. **Admin Dashboard**
   - Admins can create, update, or delete products.
   - Manage users and view key metrics.

## ⚡ Getting Started

### 1 Clone the repository:

```bash
git clone https://github.com/Ahmed-HA-RE/prime-emirates.git
# Install both frontend and backend dependencies
cd /backend && npm install
cd /frontend && npm install
```

### 2 Backend .env:

PORT=
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

## 📸 Screenshot:

![screen imgae](/frontend/public/screen.jpg)

## 🪪 License:

MIT License © 2025 Ahmed Haitham
