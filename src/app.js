const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/', bookRoutes);

app.get('/', (req, res) => {
  res.send('Bem-vindo ao BookBridge API!');
});

module.exports = app;