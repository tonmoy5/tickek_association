require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dataFormatterRoutes = require('./routes/dataFormatterRoutes');
const hubspotRoutes = require('./routes/hubspotRoutes');
const logger = require('./utils/logger'); // Add logger
const setupSwagger = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(session({
  secret: Math.random().toString(36).substring(2),
  resave: false,
  saveUninitialized: true
}));

app.use('/', hubspotRoutes);
app.use('/format', dataFormatterRoutes);

// Setup Swagger
setupSwagger(app);

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));