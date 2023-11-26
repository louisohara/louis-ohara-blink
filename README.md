# louis-ohara-blink

## **Project description**
An app that you use when you have no plans in order to post to your friends that you're available. In your post, you can declare you want to do and specify how long you are available for. 

Posting will display your profile to your network on the active users page - where your friends can comment on your post in order to arrange plans with you.

My app allows users to arrange spontaneous plans with friends when they find themselves without them.

---

## **Tech stack used**
- Front-end:
Axios, react-router-dom (BrowserRouter, Routes, Route, useParams, useNavigate, Link, NavLink), react (useState, useEffect), react-search-autocomplete (ReactSearchAutocomplete), fuse.js

- Back-end:
Knex, mysql2, cors, express, dotenv, node.js, jsonwebtoken

---

## **Installation instructions**
1) CREATE LOCAL DATABASE:
-	$ mysql -u root -p
-	$ password: rootroot
-	$ CREATE DATABASE blink;
  
2) IN SERVER FOLDER, CONFIGURE KNEXFILE.JS:
- amend your server .env file to change the below values of knexfile.js in order to connect with the database you created in the step prior.
   connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
  },
- sample .env file below:
    PORT=8080
    DB_HOST=127.0.0.1
    DB_NAME=blink
    DB_USER=root
    DB_PASSWORD=rootroot

3) Run migrations
- $ cd server
- $ npm run migrate
- $ npm run seed

4) Run server
- $ npm start

5) Run client
- $ cd client/capstone-client/capstone
- $ npm start

