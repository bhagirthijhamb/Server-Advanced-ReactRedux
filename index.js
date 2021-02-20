// main starting point to the application
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();

// App Setup

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server litening on: ', port);
