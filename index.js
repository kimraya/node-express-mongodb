const express = require('express');
const mongoose = require('mongoose'); //Require if you use nodeJS
const app = express();

const Product = require('./models/product.model.js'); //Import the product.model.js

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from NODE API server');
});

// Create a new product
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View all products
app.get('/api/viewProducts', async (req, res) => {
    try {
        const newProduct = await Product.find({});
        console.log("Fetched Products:", newProduct); // Log the list of products
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Establish connection to mongoDB Atlas
mongoose.connect('mongodb+srv://admin:admin123@backenddb.3wsrj.mongodb.net/simple-crude-api?retryWrites=true&w=majority&appName=backendDB')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        });
    })
    .catch(() => {
        console.log('Connection failed!')
    })