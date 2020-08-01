//setting up configurations
const config = require('config');
require('dotenv').config();
//getting required modules
const express = require('express');
const mongoose = require('mongoose');
const setupDatabase = require('./startup/database');
const userRoutes = require('./routes/users');
const markRoutes = require('./routes/marks');

//connectecting to DB
setupDatabase();

//setting up Express server
const app = express();

app.use(express.json());

//setting up routes
app.use('/user',userRoutes);
app.use('/marks',markRoutes);

app.listen(config.get('port'),()=>{
    console.log('Server is running on ',config.get('port'));
});

