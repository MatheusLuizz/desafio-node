const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const logRequest = require('./middlewares/logMiddleware');

const app = express();

app.use(express.json());

app.use(logRequest);

app.use('/api/users', userRoutes);
app.use('/api/', bookRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('Bem-vindo ao BookBridge API!');
});

module.exports = app;