# COMP 3123 - Assignment 1

Develop a Backend application using NodeJS, Express and MongoDB with the following configuration:
![Table of endpoints for the API](./resources/List-of-APIs.png)

## Notes
* The Postman collection is available in the resources folder `./resources/Assignment 1.postman_collection.json`
* Screenshots of Postman and MongoDB are available in the screenshots folder `./resources/screenshots/*.png`

---

## Steps to Setup

1. Install dependencies

```bash
npm install
```

2. Run Server

```bash
node server.js
```

You can browse the apis at <http://localhost:8081>

---

## Instructions

1. Update database credentials and/or connection string to match your configuration inside `server.js` (line 13-16).
```javascript
const DB_NAME = "CHANGE_HERE_DATABASE_NAME";
const DB_USER = "CHANGE_HERE_USERNAME";
const DB_PASSWORD = "CHANGE_HERE_PASSWORD";
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.adpukiy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
```

2. Import collection **resources/Assignment 1.postman_collection.json** to Postman using *File > Import...*

---

## How to Log In
A user needs to be created and added into the database.
### Add a new user (if needed)
1. Copy the [User JSON object example](#examples-of-json-objects-for-the-models) or create yout own.
   1. The email address needs to be valid and unique (no duplicated users).
   2. The password needs to be strong and contain at least:
      1. 2 lowercase letters;
      2. 2 uppercase letters;
      3. 2 symbols;
      4. 2 digits;
      5. no spaces;
      6. at least 12 characters.
      
2. Open Postman and the request named **User - Sign Up**.
    *(POST request to http://localhost:8081/api/user/signup)*
3. Paste the JSON inside the body and send the request.
   *(Note: Passwords are encrypted.)*

### Log In with Username and Password
1. Open Postman and the request named **User - Log In**.
*(POST request to http://localhost:8081/api/user/login)*
2. Add the username and password inside a JSON object and send the request.

For example, if you created a user with our [JSON object example](#examples-of-json-objects-for-the-models), you would have the following in the body of your request:
```json
{
  "username": "jacobie",
  "password": "p4$5WOrd!*12"
}
```

---

## Examples of JSON objects
### User
```json
{
    "username": "jacobie",
    "email": "j.ieschin@example.com",
    "password": "p4$5WOrd!*12"
}
```

### Employee
```json
{
  "first_name": "Max",
  "last_name": "LaMenace",
  "email": "m.lamenace@company.com",
  "gender": "Other",
  "salary": 125500.00
}
```