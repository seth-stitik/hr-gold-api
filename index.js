const express = require('express');
const app = express();
const { sequelize } = require('./config/database');

app.use(express.json());

// Routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed');
    }
});