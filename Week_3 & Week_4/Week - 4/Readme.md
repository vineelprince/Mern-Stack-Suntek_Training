### 1. Projections
### 2. Unique Properties
### 3. Saving Password
### 4. Authentication
### 5. Public and Protected Routes

#### One important point :
* The validators will run before inserting or updating any data in the database.
* So if any validation fails the data will not be inserted or updated in the database.
* on the update operation will not run the validators by default.
* To run the validators on update operation we need to set the runValidators option to true.

#### How Error handling works in Express :
* In Express, error handling is done using default error Handler middleware functions.


## Projections:
* Projections are retrieving only specific fields from a document in the database.
* Field level filtering is called Projections.
* when we call functions like find(), findOne() etc we can pass second argument as projection.
* Projections can be specified in two ways:
  1. As an object with field names as keys and 1 or 0 as values.
  2. As a space-separated string of field names.


## Unique Properties:
* Unique properties are used to ensure that a field in a document is unique across all documents in a collection.
* We can set a field as unique by setting the unique property to true in the schema definition.

## Saving Password:
* We should never save passwords in plain text in the database.
* there are two ways to save passwords securely:
  1. Hashing : this is a one-way process. once the password is hashed it cannot be converted back to the original password. so it is secure.
  2. Encryption : this is not recommended for saving passwords. as it is done with the help of secret key which can be compromised. so it is a reversible process. and not secure. 
* We should always hash the passwords before saving them in the database.
* We can use libraries like bcrypt.js to hash the passwords.
* in this we have no of rounds or cost factor or salt which makes the hashing process more secure.
* generally we use 8 to 12 rounds for hashing the passwords.

## Authentication:
* Authentication is the process of verifying the identity of a user.
* Every API has Two types of routes:
  1. Public Routes : these routes can be accessed by anyone without authentication.
  2. Protected Routes : these routes can be accessed only by authenticated users.
* User authentication means submitting the credentials and getting the tocken, it is same as pay the amount and get the ticket.
* Once a user has tocken, he is said to be authenticated.
### Steps for user Authentication:
#### After receiving the user credentials:
1. API verifies the username
2. if username is matched then it compares the password
3. if password is matched then it generates a tocken and sends it to the user


#### JWT Authentication Flow:
1. once the user credentials are verified, server generates a JWT token and sends it to the user.
2. User stores the token in local storage or cookies.
3. For every subsequent request to protected routes, user sends the token in the Authorization header.

### Important Points:
* whenever we store the token in local storage, it is vulnerable to XSS attacks.
* whenever we store the token in cookies, it is vulnerable to CSRF attacks.
* so the local storage, session storage and normal cookies are not secure for storing tokens.
* to store the token securely in cookies, we need to set the httpOnly and secure flags on the cookies.
* httpOnly flag prevents the client-side scripts from accessing the cookies.
* so the safest way to store the token is to use httpOnly and secure cookies. only server can access these cookies.

### There are two types of authentication:
  1. Session-based authentication
  2. Token-based authentication

### Authentication and Authorization are different:
* Authentication is the process of verifying the identity of a user.
* Authorization is the process of verifying the access rights of a user.
* Authentication is done before authorization.

## Making Authenticated Requests:
1. When Client Application makes req after successful login, the httpOnly cookie containing the JWT token is ** automatically ** included in the request headers.
2. The middleware in the express server can extract the cookie using libraries like cookie-parser.
3. The middleware verifies the JWT token to authenticate the user.

### Aggregation Pipeline in Mongoose:
* Aggregation pipeline is a framework for data aggregation in MongoDB.
* It is used to perform complex data analysis and transformation operations on the data stored in MongoDB.
* It consists of a series of stages that process the data in a sequential manner.
* Each stage performs a specific operation on the data and passes the result to the next stage.
* Some common stages in the aggregation pipeline are:
  1. $match : filters the documents based on a specified condition.
  2. $group : groups the documents based on a specified field and performs aggregation operations like sum, avg, count etc.
  3. $sort : sorts the documents based on a specified field.
  4. $project : reshapes the documents by including or excluding specific fields.
  5. $limit : limits the number of documents returned.
  6. $skip : skips a specified number of documents.

#### populate() function in Mongoose:
* The populate() function is used to populate the referenced documents in a document.
* It is used to perform JOIN operations in MongoDB.

## Password traps in mongoose:
* the reason is we are not hashing the other fields except password.

### Unique is not a validator it is an option so we cannot customize the error message for unique property.
### but recently in new Express versions we can customize the error message for unique property.

## So now our E-Commerce backend is a scalable backend.


# BLOG App
* we will learn role based authentication and authorization.
## Roles:
* Admin : login,view Articles,Block/Unblock Users.
* User : login,register,view Articles,write Articles
* Author : register,login,Add Articles,view Articles,edit Articles,delete Articles.

## Function declaration vs function expression:
* Function Declaration : function funcName() {}
* Function Expression : const funcName = function() {}

### the real thing about any application is Database Architecture.
### so we need to design the database architecture before starting any application.
### Steps to design Database Architecture in terms of Collections and Documents:
1. Identify the main entities in the application.
2. Identify the relationships between the entities.
3. Identify the fields for each entity.

## Guides for building a scalable backend:
