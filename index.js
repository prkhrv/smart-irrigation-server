//API
var express = require('express');
var app = express();
// var cors = require('cors')
var port = process.env.PORT || 80;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var io = require('socket.io').listen(app.listen(port));





//DataBase
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
const dbConfig = require('./config/database.config.js');
// Connecting to the database 
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// Socket
var clients = 0;
io.on('connection',function(socket){
    clients = clients+1;
    console.log("client Connected");
    console.log("Online Users "+clients);

    socket.on('disconnect',function(){
        clients = clients-1;
        console.log("Client Gone");
        console.log("Online Users "+clients);

    })
});


//io
app.set('io', io);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Models
const Users = require('./api/models/sis_users/sis_users');




const routes = require('./api/routes/router');
app.use('/',routes);


console.log("socket server started on "+port);