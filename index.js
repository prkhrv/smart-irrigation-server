//API
var express = require('express');
var app = express();
// var cors = require('cors')
var port = 3000 || process.env.PORT;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


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


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Models
const Users = require('./api/models/sis_users/sis_users');


//Arduino
var five = require('johnny-five');
// const board = new five.Board();

// board.on("ready", function() {
//     // Create an Led on pin 13
//     var led = new five.Led(13);
//     // Blink every half second
//     led.blink(2000);
//   });

const routes = require('./api/routes/router');
app.use('/',routes);


app.listen(port,function(err){
    if(err){
        res.send(err);
    }else{
        console.log("Server running on "+port);
    }

});