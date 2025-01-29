import fs from 'node:fs/promises';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Get Meals
app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    console.error('Error reading meals:', error);
    res.status(500).json({ message: 'Failed to load meals.' });
  }
});

// ✅ New GET API for Orders
app.get('/orders', async (req, res) => {
  try {
    const ordersData = await fs.readFile('./data/orders.json', 'utf8');
    const orders = ordersData.trim() ? JSON.parse(ordersData) : [];
    res.json(orders);
  } catch (error) {
    console.error('Error reading orders:', error);
    res.status(500).json({ message: 'Failed to load orders.' });
  }
});

// Post Order
app.post('/orders', async (req, res) => {
  try {
    const orderData = req.body.order;

    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ message: 'Missing order data.' });
    }

    if (
      !orderData.customer.firstName?.trim() ||
      !orderData.customer.lastName?.trim() ||
      !orderData.customer.email?.includes('@') ||
      !orderData.customer.phoneNumber?.trim() ||
      isNaN(orderData.customer.phoneNumber) ||
      !orderData.customer.address?.trim() ||
      !orderData.customer.city?.trim() ||
      !orderData.customer.state?.trim() ||
      !orderData.customer.pinCode?.trim() ||
      isNaN(orderData.customer.pinCode)
    ) {
      return res.status(400).json({
        message: 'Invalid or missing customer details.',
      });
    }

    const newOrder = {
      ...orderData,
      id: (Math.random() * 1000).toString(),
    };

    let orders = [];
    try {
      const ordersData = await fs.readFile('./data/orders.json', 'utf8');
      orders = ordersData.trim() ? JSON.parse(ordersData) : [];
    } catch {
      orders = [];
    }

    orders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(orders, null, 2));

    res.status(201).json({ message: 'Order created!', order: newOrder });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
