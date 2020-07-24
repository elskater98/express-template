/* Imports */
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');



const app = express();
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(helmet());
app.use(cors({
    "origin": config.client,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    "credentials": true
}));

/* Server */
const port = config.port;
app.listen(port, () => {
console.log('The server is running on '+ config.port+' ...');
});
