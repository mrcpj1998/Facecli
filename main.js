//Christian Egon Sørensen, licensed under the MIT-license
var readlineSync = require("readline-sync"); //For getting the user input in a discret way
var login = require("facebook-chat-api"); //The actual module that through clever tricks allows facebook chat functions

//get the email in plaintext
var userName = readlineSync.question("What is your email?\t");

//get the password in hidden text
var pw = readlineSync.question('What is your password?:\t', {hideEchoBack:true});

console.log("Welcome " + userName);

/* if possible, the i variable should be used first allowing small but still some runtime, if you can, please, prove me wrong */

//Login to facebook with email and password, and return api object and possible errors
login({email: userName, password:pw}, function callback(err,api){
	//if errors in login, print them and stop the program
	if(err) return console.error(err);	

	//The commandline input variable
	var i = readlineSync.question(">");

	if (i == "help"){
		console.log("The help command is not implemented, but the commands are:\nthreads\nmsg\nlist\n");
	} else if (i == "threads") {
		//Ask user how many threads to get, should be able to input with flags
		var i = readlineSync.question("How many pulls?: ");
		api.getThreadList(0, i - 1, function callback(err, data){
			if(err) return console.error(err);

			for (i = 0; i != data.length; i++)
			console.log("Thread " + data[i].name + ": \"" + data[i].snippet + "\" has id: " + data[i].threadID);
		});
	} else if(i=="msg") {
		//Contains the thread identifyer
		var i = readlineSync.question("What is the sender id?: ");
		//Contains the message to be send
		var msg = readlineSync.question("Message: ");
		api.sendMessage({body: msg}, i);
	} else if(i=="list"){
		 api.getFriendsList(function(err, data) {
		    if(err) return console.error(err);

		 for (i = 0; i != data.length; i++) {
		 	console.log("Friend " + data[i].fullName + " has id " + data.userID);
		 	var cont = readlineSync.question("Press enter to continue");
		 }});
	}
});
