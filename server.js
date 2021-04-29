const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const connectDB = require('./server/database/connection');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// set view engine
app.set('view engine', 'ejs');

// connect database
connectDB.connectDB();

// set assets 
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use(express.static("assets/css"));

//load router 
app.use('/', require('./server/routes/router'));



app.listen(port, () => {
    console.log("Server started at port " + port);
})