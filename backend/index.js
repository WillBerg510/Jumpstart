const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const habitsRouter = require('./routes/habits');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // DEVELOPMENT ONLY, INSECURE
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.get('/', (req, res) => {
    res.send('Habit Tracker is Live!');
    console.log('Habit Tracker is Live!');
});

app.use('/habits', habitsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});