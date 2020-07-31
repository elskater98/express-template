/* Imports */
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const User = require('./schemas/user');
const user = require('./routes/user');
const authentication = require('./routes/authentication');
const bcrypt = require('bcrypt');

/* Initialization*/
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

/*Routes*/
app.use('/user',user);
app.use('/auth',authentication);

/*Connection MongoDB*/
mongoose.connect(config.devel_database, {useNewUrlParser: true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology:true});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'Failed connection.'));
db.once('open',function () {
    console.log("Successfully connection.")
});

/* Server */
const port = config.port;
app.listen(port, () => {
console.log('The server is running on '+ config.port+' ...');
});

/* Initialize Admin */
User.find({}).countDocuments().then(async (count) => {
    if(count === 0){
        let password = await bcrypt.hash('password', 10);
        const user = new User({first_name: 'Admin',last_name: 'Node Template',email: 'admin@admin.com',password:password,roles:['Administrator']});
        user.save();
        console.log("User: "+ JSON.stringify(user) +" had been created successfully.")
    }
});

module.exports = app;
