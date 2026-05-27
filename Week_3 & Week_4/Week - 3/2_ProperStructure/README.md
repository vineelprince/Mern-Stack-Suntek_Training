# Backend Basics now

## Highlevel Overview of Backend Architecture
* HTTP Server
- listen to port
- receive requests
- create responses
- Hand off to application logic
* API's
- routing
- authentication
- validation
- Business Logic
- database operations
- response formatting
- error handling
* Database
- data persistence
- data retrieval
- indexing
- transaction management
- query optimization
- schema validation
- connection management

## Steps to create a simple backend application
    1. Generate package.json
        npm init -y
    2. create HTTP server
        a. install and import "express" module
            npm install express
        b. import express module
    3. create api
        a. define routes
        b. implement route handlers

### HTTP Request types (CRUD operations)
* GET - to fetch data from server
* POST - to create data on server
* PUT - to update data on server
* DELETE - to delete data from server

    http://localhost:3000 --> base URL which is running on local machine on port 3000
    http://127.0.0.1:3000 --> loopback IP address which is running on local machine on port 3000

    GET http://localhost:3000/path --> this is called the url path

### User API's
    GET http://localhost:3000/users --> to get all users
    POST http://localhost:3000/users --> to create a new user
    PUT http://localhost:3000/users/<id> --> to update user with id 
    DELETE http://localhost:3000/users/<id> --> to delete user with id 


## Data -> 
## Data Vs Information : the processed data is called information
## Database : a structured collection of data
## Database server : a software that provides database services to other computer programs or computers
## DBMS

## difference between sql and mysql?
SQL (Structured Query Language) is a standard language used for managing and manipulating relational databases. It provides a set of commands for querying, updating, and managing data.
MySQL is a specific implementation of a relational database management system (RDBMS) that uses SQL as its query language. It is an open-source database system that is widely used for web applications and other data storage needs.