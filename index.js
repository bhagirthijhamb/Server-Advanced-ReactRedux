// main starting point to the application
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();

// App Setup
// middlewares - any incoming request tot he server will be passed into these by default
app.use(morgan('combined')); // logging framework
app.use(express.json()); // any incoming request will be parsed as json

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server litening on: ', port);
