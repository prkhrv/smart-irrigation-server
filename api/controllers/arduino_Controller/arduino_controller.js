var five = require('johnny-five');

var controller = process.argv[2] || "GP2D120XJ00F";



exports.turn_on_arduino = function(req,res,next){
    //Arduino
const board = new five.Board();

board.on("ready", function() {
    var proximity = new five.Proximity({
              controller: controller,
              freq: 2000,
              pin: "A1"
    });
    var sensor = new five.Sensor({
        pin:"A0",
        freq:1000
    });
    var relay = new five.Relay(5);
    sensor.scale(0, 100).on("change", function() {
        console.log(this.value);
         // 0 - Wet
            // 50 - Dry
            if (this.value > 60) {
                if (!relay.isOn) {
                  // Turn on the water pump!
                  relay.on();
                }
              } else {
                relay.off();
              }
    });
    var proximity_relay = new five.Relay(6);
        proximity.on("data", function() {
          console.log("inches: ", this.inches);
          console.log("cm: ", this.cm);
          if(this.cm > 3){
              proximity_relay.on();
          }else{
              proximity_relay.off();
          }
        });
    
  });

  res.json({auth:true});

};


exports.turn_off_arduino = function(req,res,next){

const board = new five.Board();
board.on("ready", function() { 
    //  "ready" emits upon confirmation of board capabilities and receipt of initial state
    this.disconnect();
    res.json({auth:false});
  });


};
