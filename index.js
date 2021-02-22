// main starting point to the application
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:27017/auth',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },);

// App Setup
// middlewares - any incoming request tot he server will be passed into these by default
app.use(morgan('combined')); // logging framework
app.use(cors());
app.use(express.json()); // any incoming request is going to be parsed as if it was json
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server litening on: ', port);
