const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./Mongo.js');
var openingController = require('./controllers/openingControllers');

var app = express();
app.use(bodyParser.json());

let cors = require('cors')
app.use(cors({
    origin: 'http://localhost:4200' 
}))

app.listen(3000,()=>console.log('Server started at port:3000'));

app.use('/openings',openingController); 