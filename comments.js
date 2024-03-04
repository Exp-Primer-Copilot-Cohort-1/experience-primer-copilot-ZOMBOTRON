// Create web server
// npm install express
// npm install body-parser
// npm install cors
// npm install mysql
// npm install nodemon
// npm install eslint
// npm install express-fileupload
// npm install fs
// npm install path
// npm install morgan
// npm install jsonwebtoken
// npm install bcrypt
// npm install multer
// npm install cookie-parser
// npm install express-session
// npm install express-validator
// npm install express-jwt

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const expressJWT = require('express-jwt');

// Create web server
const app = express();

// Configure middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(morgan('combined'));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));
app.use(expressValidator());
app.use(expressJWT({ secret: 'secret' }).unless({ path: ['/login', '/register'] }));

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comments',
  multipleStatements: true,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Create database
app.get('/createdb', (req, res) => {
  const sql = 'CREATE DATABASE comments';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send('Database created');
  });
});

// Create table
app.get('/createtable', (req, res) => {
  const sql = 'CREATE TABLE comments (id INT AUTO_INCREMENT, name VARCHAR(255), comment VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err,