# bookapp
This simple node based app contains code for REST end points for adding, updating and retrieving books from mongodb.
It uses mongoose as Object Document Model to interact with mongodb.
It is driven by JWT token to authenticate user for different API end points.
Once you have cloned the app, please follow the following steps to run code;
npm install
npm start
This will run the localhost on http://localhost:3000/. This will take you to MEAN stack welcome page.
Before we can do anything, we got to setup user in mongodb, make sure you have mongodb installed and started. Use the following link to setup a sample user in DB through which we will be logging in to system;
http://localhost:3000/user/setup
I must add above link requires POST request. You can change it to GET request through code.
To get authentication token, use the following url;
http://localhost:3000/oauth/authenticate
Post the following json through some API client like postman:
{
"username": "developer",
"password": "password"
}
This will return you token. Once you are authenticated, you will have to send "token" in header of each request otherwise you will not be authenticated.
Add Book API Endpoint: http://localhost:3000/books/add 
POST following JSON:
        {
        "_id": "5ac4745eace3cd2df8c0f293",
        "title": "Outlier",
        "author": "Malcom Gladwell",
        "excerpt": "One thousand hours rule.",
        "domain": "Personal Development"
        }
List all books API Endpoint: http://localhost:3000/books/
