#Some say home...

...is where the heart is
This bot says it can be many other things too.

This bot composes tweets describing where home is, by using other tweets containing the words "is where" as reference.
E.g., if you tweeted "@username Linux is where you go to when Windows has failed you for the last time." the bot might find your tweet and use it to compose its own tweet saying "@some_say_home is where you go to when Windows has failed you for the last time.".

The bot can be found at https://twitter.com/some_say_home

##...is where things get installed

If you don't already have have it, please install [Node.js](http://nodejs.org/). This will install two programs: `node`, which runs JavaScript from the command line, and `npm`, which helps you install software that Node.js can run.

Extract this repository somewhere on your computer, and run 'install-modules.bat', to install the necessary modules, which at the moment is just 'twit'.

##...is where you connect to Twitter

At this point you need to register a Twitter account and also get its "app info".

So create a Twitter account for whatever account you want to tweet this stuff. Twitter doesn't allow you to register multiple twitter accounts on the same email address. I recommend you create a brand new email address (perhaps using Gmail) for the Twitter account. Once you register the account to that email address, wait for the confirmation email. Then go here and log in as the Twitter account for your bot:

https://dev.twitter.com/apps/new

Once you're there, fill in the required fields: name, description, website. None of it really matters at all to your actual app, it's just for Twitter's information. Do the captcha and submit.

Next you'll see a screen with a "Details" tab. Click on the "Settings" tab and under "Application Type" choose "Read and Write", then hit the update button at the bottom.

Then go to the Keys and Access Tokens tab, and at the bottom click "create my access token". Nothing might happen immediately. Wait a minute and reload the page. then there should be "access token" and "access token secret", which are both long strings of letters and numbers.

In the same folder as 'bot.js' create a folder named 'config' and inside it, make a file called 'config.js'.

Now use a text editor to open up the "config.js" file. It should look like this:

```javascript
module.exports = {
  consumer_key:         'blah',
  consumer_secret:      'blah',
  access_token:         'blah',
  access_token_secret:  'blah'
}
```

In between those quotes, instead of `'blah'`, paste the appropriate info from the Details page. This is essentially the login information for the app.

No you can run 'run.bat' to use the bot. The bot will suggest a tweet it has composed. If you confirm, using 'y' in the prompt, the tweet will be posted. Any other console input will discard the current tweet and the bot will present you with a different tweet. When the bot has posted a tweet or has run out of suggestions, the program will terminate.

##...is where credits are given

Thanks to DariusK for providing source code for an example bot at https://github.com/dariusk/examplebot/blob/master/README.md
This has been very helpful for getting the bot up and running.
