const express = require('express');
const mongoose = require('mongoose'); //Require if you use nodeJS
const app = express();

const Product = require('./models/product.model.js'); //Import the product.model.js

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello from NODE API server');
});

// Create a new product
app.post('/api/products', async (req, res) => { // POST -> create new data
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// View all products
app.get('/api/viewProducts', async (req, res) => { // GET -> retrieve data
    try {
        const newProduct = await Product.find({});
        console.log("Fetched Products:", newProduct); // Log the list of products
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get the product by its ID
app.get('/api/viewProduct/:id', async (req, res)=> {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Update a product API
app.put('/api/viewProduct/:id', async (req, res) => { // PUT -> update existing data
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body); // Na update na dre ang product

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id); // Re-checks if the product has been updated
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Delete a product API
app.delete('/api/viewProduct/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body); // Delete the product using the id

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: `Product with ID ${id} has been deleted successfully`, deletedProduct: product});

    } catch (error) {
        res.status(500).json({message: error.message});
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
    });