const express = require('express');
const app = express();
const { sequelize } = require('./config/database');

app.use(express.json());

app.use('/api/golf-clubs', require('./routes/golfClubRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/holes', require('./routes/holeRoutes'));
app.use('/api/tee-boxes', require('./routes/teeBoxRoutes'));

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