require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/profile', profileRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
