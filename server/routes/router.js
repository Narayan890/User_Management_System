const express = require('express');
const connectDB = require('../database/connection');
const axios = require('axios');
const { response } = require('express');
const route = express.Router();

//API
route.post('/api/users', connectDB.create);
route.get('/api/users', connectDB.find);
route.put('/api/users/:id', connectDB.update);
route.delete('/api/users/:id', connectDB.deleteUser);

route.get('/', (req, res) => {
    axios.get("http://localhost:3000/api/users")
        .then(response => {
            res.render('index', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })

});

route.get('/add-user', (req, res) => {
    res.render('add-user');
});

route.get('/update-user', (req, res) => {
    axios.get("http://localhost:3000/api/users", { params: { id: req.query.id } })
        .then(response => {
            res.render('update-user', { user: response.data });
        })
        .catch(err => {
            res.send(err);
        })
});

//API

module.exports = route;