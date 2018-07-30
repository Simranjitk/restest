# RESTest - Automatic API Monitoring

------

RESTest allows developers to monitor the APIs that they are using for availability by running scheduled tests. The web application is built using [Meteor](https://www.meteor.com/). The database is MongoDB. 

**Want to be a part of RESTest?** See how you can help by heading over to the wiki: 

**Have issues?** Report them here: 

Please note that this project was created for research and to make developers' life easier. I am not responsible for any damages that occur from the usage of this tool. I am also not responsible for any damages that happen to the APIs you use as a result of using this tool. Use on your own behalf. 

**Support:** Any support is appreciated! [![paypal](https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png)](https://www.paypal.me/restest)

**Customized solutions?** You can email me at restestapp@gmail.com if you would like help setting up the application, custom features, branding, hosting, or anything else related to the application. 

# Table of Contents

------

- [Getting Started](https://github.com/Simranjitk/restest/blob/master/README.md#getting-started)

  - [Setting up Meteor](https://github.com/Simranjitk/restest/blob/master/README.md#setting-up-meteor)
  - [Running Restest](https://github.com/Simranjitk/restest/blob/master/README.md#running-restest)

- [Using Restest](https://github.com/Simranjitk/restest/blob/master/README.md#using-restest)

  - [Set up an account](https://github.com/Simranjitk/restest/blob/master/README.md#set-up-an-account)
  - [Adding an API](https://github.com/Simranjitk/restest/blob/master/README.md#adding-an-api)
  - [API status check frequency](https://github.com/Simranjitk/restest/blob/master/README.md#api-status-check-frequency)
  - [Set up email SMTP](https://github.com/Simranjitk/restest/blob/master/README.md#set-up-email-smtp)
  - [Set up Slack webhooks](https://github.com/Simranjitk/restest/blob/master/README.md#set-up-slack-webhooks)

  

## Getting Started

------

## Setting up Meteor

### Windows

First install [Chocolatey](https://chocolatey.org/install), then run this command using an Administrator command prompt: 

`choco install meteor`

### OSX / Linux

Run the following command in your terminal to install the latest official Meteor release: 

`curl https://install.meteor.com/ | sh`

## Running Restest

```
1. git clone https://github.com/simranjitk/restest.git
2. cd restest
3. meteor npm install
4. meteor run

The application will be running at localhost:3000
```



## Using Restest

------

### Set up an account

The accounts feature is there so multiple developers on your team can use the same application but there is a way to differentiate which APIs each developer is keeping track of. When the application first opens, it will ask you to login to your account. Since you won't have one, click *Create an account*. Fill out the information and click *Register* and you will be automatically redirected to the dashboard

### Adding an API

 Once you're registered and logged in, you will be redirected to the dashboard, which will have a `Add API` button to the right. Click that and fill out the information for the API you would like to test. At the moment, Rested support GET and POST calls.

### API status check frequency

When adding your API, you can select how often you want the application to make a call to the specified API to check its status. You can check every minute, 15 minutes, 30 minutes, hour, or 3 hours. Make sure that the API you are making calls to is able to handle the checks because it does count towards your API usage if it has a limit. 

If you would like to customize the frequency options, you can do so in `client/views/main/mainDashboard.html` at

```html
<div class="form-group">
    <label for="formGroupExampleInput2">Status update frequency</label>
    <select id="addingFrequency" class="selectpicker form-control">
        <option>every 30 seconds</option>
        <option>every 15 minutes</option>
        <option>every 30 minutes</option>
        <option>every 1 hour</option>
        <option>every 3 hours</option>
    </select>
</div>
```

by adding a new option. The option can be formatted as such: `every *number* second/minute/hours/days`. You can see more examples here: http://bunkat.github.io/later/parsers.html#text. 

You probably want to be able to modify the frequencies once you have added the API and if you are using custom options, you will have to add it to the following lines as well, in the same file as before:

Your new frequency:

```html
{{#if $neq this.frequency 'every 30 seconds'}}
	<button type="button" class="btn btn-default" id="frequencyButton" data-	
	value="every 20 seconds,{{this._id}}">20 seconds</button>
{{else}}
	<button type="button" class="btn btn-default" disabled>Current: 20 	
	seconds</button>
{{/if}} 
```

Add it alongside the other frequency checks in the following lines:

```html
<div class="form-group">
    <div class="form-horizontal">
        <label for="formGroupExampleInput2">Update frequency:</label>
        <br>
        <div class="btn-group" role="group" aria-label="First group">
            {{#if $neq this.frequency 'every 30 seconds'}}
            <button type="button" class="btn btn-default" id="frequencyButton" data-	
                    value="every 30 seconds,{{this._id}}">30 seconds</button>
            {{else}}
            <button type="button" class="btn btn-default" disabled>Current: 30 	
                seconds</button>
            {{/if}} 
            {{#if $neq this.frequency 'every 1 minute'}}
            <button type="button" class="btn btn-default" id="frequencyButton" data-
                    value="every 1 minute,{{this._id}}">1 minute</button>
            {{else}}
            <button type="button" class="btn btn-default" disabled>Current: 1 
                minute</button>
            {{/if}} 
            {{#if $neq this.frequency 'every 15 minutes'}}
            <button type="button" class="btn btn-default" id="frequencyButton" data-
                    value="every 15 minutes,{{this._id}}">15 minutes</button>
            {{else}}
            <button type="button" class="btn btn-default" disabled>Current: 15 
                minutes</button>
            {{/if}}
            {{#if $neq this.frequency 'every 30 minutes'}}
            <button type="button" class="btn btn-default" id="frequencyButton" data-
                    value="every 30 minutes,{{this._id}}">30 minutes</button>
            {{else}}
            <button type="button" class="btn btn-default" disabled>Current: 30 
                minutes</button>
            {{/if}}
            {{#if $neq this.frequency 'every 1 hour'}}
            <button type="button" class="btn btn-default" id="frequencyButton" data-
                    value="every 1 hour,{{this._id}}">1 hour</button>
            {{else}}
            <button type="button" class="btn btn-default" disabled>Current: 1 hour</button>
            {{/if}}
            {{#if $neq this.frequency 'every 3 hours'}}
            <button type="button" class="btn btn-default" id="frequencyButton" data-
                    value="every 3 hours,{{this._id}}">3 hours</button>
            {{else}}
            <button type="button" class="btn btn-default" disabled>Current: 3 
                hours</button>
            {{/if}}
        </div>
    </div>
</div>
```



### Set up email SMTP 

In order to get updated when an API fails without checking the dashboard, you can opt-in to receive emails. 

I use [SendGrid](https://sendgrid.com) as my email client. You can sign up for their Free account, which includes 40,000 emails for your first month and then 100/day forever. 

Once you sign up for whichever account you choose, choose SMTP as your integration method. You will then generate your SMTP key. Add your API key in `server/main.js` for the variable `process.env.MAIL_URL` as such:

```javascript
process.env.MAIL_URL = "smtp://apikey:yourApiKey:587"; //only change 'yourApiKey' and the port(if required)
```

Sending email updates are disabled by default. You can enable it in the `checkStatus` function under `server/main.js`. Enable the following line: `Meteor.call("sendErrorEmail", error, userEmail); `. You will now receive emails to the email you signed up with when one of your APIs fail. 



### Set up Slack webhooks

You can setup Slack webhooks at https://api.slack.com/incoming-webhooks. Once you have your incoming webhook URL, paste it in the file `settings.json` as the value for the variable `webhookUrl` in the project directory. 

By default, posting to slack is disabled. You can enable it in the `checkStatus` function under `server/main.js`. Enable the following line: `Meteor.call("postToSlack", "The following API failed at " + postingTime + ": " + error);`



