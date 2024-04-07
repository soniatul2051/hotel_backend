const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Assuming this is a database configuration or model
const jwtAuthMiddleware = require('./jwt'); // Import JWT authentication middleware
const jwt = require('jsonwebtoken'); // Import jsonwebtoken module

const app = express();

// Middleware
app.use(bodyParser.json());

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Request Made to ${req.originalUrl}`);
    next();
}

app.use(logRequest);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome here');
});

app.get('/about', (req, res) => {
    res.send('About');
});

// Assuming these are your routes for different functionalities
const personRoutes = require('./personRoutes');
const menuItemRoutes = require('./menuRoutes');

// Mounting routes
app.use('/person', personRoutes);

// Apply JWT authentication middleware to menuItemRoutes
app.use('/menu', jwtAuthMiddleware, menuItemRoutes);

// JWT token generation route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Mock user authentication. Replace this with actual authentication logic.
    if (username === 'example_user' && password === 'example_password') {
        // Generate JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Authentication failed' });
    }
});

// Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
