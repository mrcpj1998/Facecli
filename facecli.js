//Christian Egon Sørensen, licensed under the MIT-license
var readlineSync = require("readline-sync"); //For getting the user input in a discret way
var login = require("facebook-chat-api"); //The actual module that through clever tricks allows facebook chat functions

//get the email in plaintext
var userName = readlineSync.question("What is your email?\t");

//get the password in hidden text
var pw = readlineSync.question('What is your password?:\t', {hideEchoBack:true});

var firstLogin = true;

/* if possible, the i variable should be used first allowing small but still some runtime, if you can, please, prove me wrong */

//Login to facebook with email and password, and return api object and possible errors
//var api;
login({email: userName, password:pw}, function callback(err,api){
	//if errors in login, print them and stop the program
	if(err) return console.error(err);
	var err = null;

	// Puts the login info the first time one logs in
	if(firstLogin){
		console.log("Welcome " + userName);
		console.log("Logged in with id: " + api.getCurrentUserID());
		firstLogin = false;
	}
	//The commandline input variable
	var inp = readlineSync.question(">"); //input variable

	switch (inp) {
		case "exit":
			console.log("Logging out " + userName);
			api.logout();
			break;
		case "help":
			console.log("The help command is not implemented, but the commands are:\nthreads\nmsg\nlist\n");
			break;
		case "getchat":
			var i = readlineSync.question("How many messages to retrive: ");
			var id = readlineSync.question("What is the threadID: ");
			api.getThreadHistory(id, 0, i, null, function callback(err, data){
				if(err) return console.log(err);
				// working example, console.log(data[1].body);
				for (v = 0; v < i; v++){
					console.log(data[v].timestampDatetime + ": " + data[v].senderName + " | " + data[v].body);
				}
			});
			break;
		case "threads":
			//Ask user how many threads to get, should be able to input with flags
			var i = readlineSync.question("How many pulls?: ");
			console.log("Pulling " + i + " threads");
			api.getThreadList(0, i, function callback(err, data){
				if(err) return console.error(err);

				for (i = 0; i < data.length; i++)
					console.log("Thread " + data[i].name + ": \"" + data[i].snippet + "\" has id: " + data[i].threadID);
			});
			break;
		case "msg":
			//Contains the thread identifyer
			var id = readlineSync.question("What is the sender id?: ");
			//Contains the message to be send
			var msg = readlineSync.question("Message: ");
			api.sendMessage({body: msg}, i);
			break;
		case "list":
			api.getFriendsList(function (err, data) {
		    if(err) return console.error(err);

		 	for (i = 0; i != data.length; i++) {
		 		console.log("Friend " + data[i].fullName + " has id " + data.userID);
		 		var cont = readlineSync.question("Press enter to continue");
		 	}});
			break;
		case "myid":
			console.log("Logged in with id: " + api.getCurrentUserID());
			break;
		case "bdays":
			api.getFriendsList(function(err, data) {
		    if(err) return console.error(err);

			for (i = 0; i < data.length; i++) {
		 		if (data[i].isBirthday){
		 			console.log("Friend " + data[i].fullName + " with id " + data.userID + " was born today");
		 			var cont = readlineSync.question("Press enter to continue");
		 	}
		 }});
			break;
		default:
			// statements_def
			break;
	}
});
