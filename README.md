# Northcoders News FrontEnd API


[Northcoders News](https://frozen-dawn-38418.herokuapp.com) is an API for sharing articles online of interest to Northcoders members. NCNews users can read articles and comments, vote on articles and comments, and log in to submit articles and comments. 

## Getting Started

If you only wish to browse the website, you can access it through the link above. See the section 'API Usage Guide' below for a brief introduction to its functionality. If you wish to work with the code, follow the steps below. 

### Prerequisites

Setting up a development and testing environment for NCNews first requires VSCode - find installation instructions [here](https://code.visualstudio.com/docs).

The Git repository for NCNews FrontEnd can be found [here](https://github.com/TerryDutton/FE-FT-NC-News). You will need to set up a GitHub account [here](https://help.github.com/articles/set-up-git/) if you don't already have one, and you must be a member of the [Northcoders team](https://github.com/northcoders) to access the repository. 

### Installation 

Fork and clone the repository and run 
```
$ npm install 
```
at the project's root directory to install dependencies. NCNews uses the following packages: 

```
axios version 0.18.0
react version 16.4.0
react-dom version 16.4.0
react-router-dom version 4.3.1
react-scripts version 1.1.4
```
Run `$ npm start` to start an instance of the app. This will open in your default browser on port 3000. 

When first downloaded, NCNews FrontEnd will be set to retreive its data from the database hosted at https://tranquil-chamber-17426.herokuapp.com/api . If you wish to set up your own back-end, go to https://github.com/TerryDutton/BE-FT-northcoders-news and follow the steps outlined. Once set up, you can alter the FrontEnd's target database by changing the address in the FrontEnd's ``source.js`` file. Alternatively, during testing phase, you can run an instance of the backend on your machine and target http://localhost:9090/api to run your tests without needing to connect to an externally hosted database. 

## API Usage Guide

The links in the navigation bar can show all articles, or articles of a particular topic, as well as the submit article page and a list of all users. The main title is also a link to the welcome page. Following a link to a particular user's page will show their user profile as well as a list of all their submitted articles and comments. 

To submit an article or a comment, or to delete a comment, you must log in. To log in as a particular user, type their username in the login box at the top of the page. (Passwords are unfortunately not yet implemented.)

You can vote on articles or comments with the appropriate buttons; while comments appear on several parts of the site, the voting buttons only appear while viewing the article to which they were submitted. There is currently no limit on how many times you can vote. 

## Deployment

Deploying this to your own live system requires online hosting. This example uses [Heroku](https://heroku.com) to host the app. If you lack a Heroku account, you can sign up by following the link. 

To deploy the app to Heroku, install and set up Heroku on your system and log in with the command 
```
$ heroku login
```
then: 
```
$ heroku create
```
Commit any changes to the code, then run 
```
$ git push heroku master
```
To push your project to Heroku. Finally, run 
```
$ heroku open 
```
to open your newly-hosted and live project in your web browser. 

## Built With: 
[VSCode](https://code.visualstudio.com/) \
[Heroku](https://www.heroku.com) 

## Authors
Terry Dutton  \
[Northcoders Team](www.northcoders.com)