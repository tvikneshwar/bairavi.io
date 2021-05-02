
/*
   Eclipse Paho MQTT-JS Utility
   by Elliot Williams for Hackaday article, 
*/
// Global variables


var MyApp = {}; // Globally scoped object
var client       = null;
var led_is_on    = null;
// These are configs	
var hostname       = "broker.hivemq.com";
var port           = "8000";
var clientId       = "mqtt_js_" + parseInt(Math.random() * 100000, 10);
var temp_topic     = "home/outdoors/temperature";
var humidity_topic = "home/outdoors/humidity";
var status_topic   = "home/outdoors/status";
var topic1         = "home/outdoors/tp1";

// This is called after the webpage is completely loaded
// It is the main entry point into the JS code





function calculateTotal()
{
  let unit_price={
    sugar: 50,
    butter: 12,
    eggs: 2,
    vanilla:43    
  };
  let item_price={}
  

  areabeat  = ($("#beat").val());
  shop_name = ($("#shop").val());
  phone_num = ($("#phone").val());
  
  item_price.sugar = ($("#qty_sugar").val() * unit_price.sugar )
  $("#price_sugar").val(item_price.sugar);
  sugr_QTY= ($("#qty_sugar").val());

  
  item_price.butter = ($("#qty_butter").val() * unit_price.butter )
  $("#price_butter").val(item_price.butter);
   butter_QTY= ($("#qty_butter").val());



  item_price.eggs = ($("#qty_eggs").val() * unit_price.eggs )
  $("#price_eggs").val(item_price.eggs);  
  egg_QTY= ($("#qty_eggs").val());


  item_price.vanilla = ($("#qty_vanilla").val() * unit_price.vanilla )
  $("#price_vanilla").val(item_price.vanilla);    
  vanilla_QTY= ($("#qty_vanilla").val());

  let total = item_price.sugar + item_price.butter + item_price.eggs + item_price.vanilla;

 
  $("#total_value").text(total);

//###########################################################################################################

var jsonObject =[{Beat: areabeat, shop: shop_name,Phone: phone_num,sugar: sugr_QTY,butter: butter_QTY,Egg: egg_QTY,vanilla: vanilla_QTY}]
//var data={"BEAT":"mm","SHOP":"kk","SALT-QTY":"2","MUSTARD-QTY":"2","GEERA-QTY":"2","VENTHYAM-QTY":"3"}
var data= JSON.stringify(jsonObject);
MyApp.color = data;
//bucket = json;
console.log(data);
//console.log(bucket);
    
}
//############################################################################################################




$(function()
 {
    $(".qty").on("change keyup",calculateTotal)
})


function connect(){
	// Set up the client
	client = new Paho.MQTT.Client(hostname, Number(port), clientId);
	console.info('Connecting to Server: Hostname: ', hostname, 
			'. Port: ', port, '. Client ID: ', clientId);

	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	// see client class docs for all the options
	var options = {
		onSuccess: onConnect, // after connected, subscribes
		onFailure: onFail     // useful for logging / debugging
	};
	// connect the client
	client.connect(options);
	console.info('Connecting...');
}


function onConnect(context) {
	console.log("Client Connected");
    // And subscribe to our topics	-- both with the same callback function
	options = {qos:0, onSuccess:function(context){ console.log("subscribed"); } }
	/*
	client.subscribe(temp_topic, options);
	client.subscribe(humidity_topic, options);
	client.subscribe(status_topic, options);
	*/
}

function onFail(context) {
	console.log("Failed to connect");
}

function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("Connection Lost: " + responseObject.errorMessage);
		window.alert("Someone else took my websocket!\nRefresh to take it back.");
	}
}


function onMessageArrived(message) {
	console.log(message.destinationName, message.payloadString);

	// Update element depending on which topic's data came in
	if (message.destinationName == temp_topic){ 
		var temperature_heading = document.getElementById("temp_display");
		temperature_heading.innerHTML = "Temperature: " + message.payloadString + " &deg;C";
	} else if (message.destinationName == humidity_topic) {
		var humidity_heading = document.getElementById("humidity_display");
		humidity_heading.innerHTML = "Humidity: " + message.payloadString + "%";
	} else if (message.destinationName == status_topic) {
		var status_heading = document.getElementById("led_status");
		status_heading.innerHTML = "LED Status: " + message.payloadString;
		// Accomodates one or two byte "on" commands.  Anything else is off.
		if (message.payloadString == "on" || message.payloadString == "o"){
			led_is_on = true;
		} else {
			led_is_on = false;
		}
	}
}


function duck(){
	

     //alert(MyApp.color);

	var apple= MyApp.color;
	//alert(apple);
	// Send messgae
	var payload= JSON.stringify(apple);
	//message = json;
	//console.info('sending: ', message);
	//message.destinationName = status_topic;
	//message.retained = true;
	//client.send("message");
	//console.info('sending: ', message);



// alert ("You typed: " + payload);
// Send messgae
	    message = new Paho.MQTT.Message(payload);
		message.destinationName = topic1 ;
		message.retained = true;
		client.send(message);
		console.info('sending: ', payload);

    	  }
    	