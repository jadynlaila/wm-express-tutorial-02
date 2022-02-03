const express = require('express');
const app = express();
const auth = require('./middleware/auth')

//logger middleware
const logger = require('./middleware/logger')
const morgan = require('morgan');

app 
    .use( morgan('tiny'), auth)
    .get('/', (req, res) => {
        res.send('home page')
    })
    .get('/about', (req, res) => {
        res.send('about page')
    })
    .listen(3000, () => {
    console.log('server is listening on port 3000');
    })