// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config/config.js'));

// q: "is%20where"%20lang%3Aen&src=typd

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
//var mediaArtsSearch = {q: "#mediaarts", count: 10, result_type: "recent"};
var homeIsSearch = {q: "\"is where\"", count: 100, lang: "en", result_type: "recent"}; 

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function confirmTweet(tweet, ifYes, ifNo)
{
	rl.question("Do you want to tweet \"" + tweet + "\" (y/n)? ", function(answer) {
		
		if(answer === "y")
		{
			ifYes();
		}
		else
		{
			ifNo();
		}
		
		rl.close();
	});
}

function processStatuses(index, statuses, onReturn)
{
	function next() { processStatuses(index+1, statuses); }
	
	if(index >= statuses.length)
	{
		onReturn();
	}
	
	var text = statuses[index].text;
			
	if(text.indexOf("RT") > -1)
	{
		next();
	}

	var textIndex = text.indexOf("is where");

	if(textIndex < 0)
	{
		next();
	}

	var slice = text.slice(textIndex);
	
	if(slice.indexOf("@") > -1 ||
		slice.indexOf("\\") > -1 ||
		slice.indexOf("//") > -1)
	{
		next();
	}

	rl.question("Do you want to tweet \"" + slice + "\" (y/n)? ", function(answer) {
		
		if(answer === "y")
		{
			T.post('statuses/update', { status: slice }, function(err, statuses, response) {
				console.log("tweeted: " + slice);
				console.log(statuses)
			});
			
			rl.close();
		}
		else
		{
			next();
		}
	});
}


function postTweet2() {
	T.get('search/tweets', homeIsSearch, function (error, data) {
		if (!error) 
		{
			// ...and then we tell Twitter we want to retweet it!
			
			var statuses = data.statuses;
			
			processStatuses(0, statuses, function() { rl.close() });
		}
		else {
			console.log('An error occurred:', error);
		}
	});
}

postTweet2();

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function postTweet() {
	T.get('search/tweets', homeIsSearch, function (error, data) {
	
		// log out any errors and responses
		
		console.log(data.statuses[0].text);
		if (!error) 
		{
			// ...and then we tell Twitter we want to retweet it!
			
			var statuses = data.statuses;
			var statusesLength = statuses.length;
			
			for(var statusIndex = 0;
				statusIndex < statusesLength;
				++statusIndex)
			{
				var status = statuses[statusIndex];
				var text = status.text;
			
				if(text.indexOf("RT") > -1)
				{
					continue;
				}
		
				var textIndex = text.indexOf("is where");
		
				if(textIndex < 0)
				{
					continue;
				}
		
				var slice = text.slice(textIndex);
				
				if(slice.indexOf("@") > -1 ||
				   slice.indexOf("\\") > -1 ||
				   slice.indexOf("//") > -1)
				{
					continue;
				}
		
				var accept = false;
		
				
				
				if(!accept)
				{
					continue;
				}
		
				T.post('statuses/update', { status: slice }, function(err, data, response) {
					console.log("tweeted: " + slice);
					console.log(data)
					});
		
				return;	
			}
		}
		else {
			console.log('An error occurred:', error);
		}
	});
}

//postTweet();