const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.json({limit: '50mb', extended: true}),express.urlencoded({ limit: '1024mb', extended:true }));

//Database Config
const db = require('./config/keys').MongoURI;

//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology: true })
.then(console.log('MongoDB connected'))
.catch(err => console.log(err));

//Routes
app.use('/', require('./routes/index'));

//Static Paths
var path = require('path');
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/scripts'));



const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));