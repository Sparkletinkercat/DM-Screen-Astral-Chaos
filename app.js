// Import the necessary modules
const http = require('http');
const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const fs = require('fs');
var readline = require('readline');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
dotenv.config();


// Define the hostname and port
const hostname = process.env.HOST;
const port = process.env.PORT;

// DATABASE
// ==================================

try {
    var connection = require("./database.js");
} catch (error) {console.log(error);}



// Read the contents of setup.sql
// Cannot have gaps between code segments
// var rl = readline.createInterface({
//     // Gets the sql file to read
//     input: fs.createReadStream('./sql/setup.sql'),
//     terminal: false
// });

// rl.on('line', function(chunk){
//     connection.query(chunk.toString('ascii'), function(err, sets, fields){
//     // Error checking on the sql file
//     if (err != null)  {console.log(err)}
//     });
// });
// ==================================



// Express
// ==================================
// Create an Express application
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to use EJS
app.set('view engine', 'ejs');

// Set the directory for the views
//app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));

const getRoutes = require('./getRoutes');
const postRoutes = require('./postRoutes');
app.use('/', getRoutes);
app.use('/', postRoutes);

// Define a route to render an EJS file


// ---- Api tests

const { createProxyMiddleware } = require('http-proxy-middleware');

// Proxy setup for the external API
app.use('/api', createProxyMiddleware({
  target: 'https://randomuser.me/api',
  changeOrigin: true,
  pathRewrite: {
      '^/api': '', // remove /api from the URL
  },
}));

// Start the server and listen on the specified port and hostname
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 