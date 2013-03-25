#Jquery Spycat v0.01#
Jquery.Spycat is a plug-in that tracks, stores and replays user behaviour. 

Spycat can be used for:
- Conversion optimization
- Ad placement optimization
- Landing page optimization
- Design (fold) optimization
- Usability research
- Web app documentation

Depends on:
- jQuery
- Database
- Server side language to store and retrieve data

#Usage#

Simple:

	...
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script src="jquery.spycat.js"></script>
	...
	$("body").spycat()

Advanced:

	...
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
	<script src="jquery.spycat.js"></script>
	...
	$("body").spycat({ 
		postUrl : "test.php", // the URL to post the data to (This script should add new data to the database)
		frameTime: 250, // The time between frames in milliseconds (Higher means less db transactions, lower means more precise data)
		sendTime: 12, // The time between posts to postURL in seconds
		sendTimeLong: 40, // The time between posts to postURL in seconds, after the user spend a long time on a page
		setLong: 30, // The time in seconds, after which the user is considered to have spend a long time on a page
		maxTime: 1000 // The time in seconds, after which the script stops tracking
	});
	
##Warning/Disclaimer##
This plug-in tracks a lot of user data. Not all users like this. Depending on your jurisdiction you might have to make changes in your website TOS, to reflect why and for what purpose you gather this data.

A security concern could arise with user passwords. For this reason the plug-in doesn't grab all keyboard input, but only registers keystrokes. That does not mean this plug-in has zero security concerns.

The plug-in currently doesn't scale very well. If you serve more than 100 users a day, consider only tracking a subset of users.

This plug-in is currently in pre-alpha mode and has not been fully tested in a production environment.