# louis-ohara-blink

## **Project description**
An app that you use when you have no plans in order to post to your friends that you're available. In your post, you can declare you want to do and specify how long you are available for. 

Posting will display your profile to your network on the active users page - where your friends can comment on your post in order to arrange plans with you.

My app allows users to arrange spontaneous plans with friends when they find themselves without them.

My app is responsive at mobile and tablet breakpoints.

---

## **Tech stack used**
- Front-end:
Axios, react-router-dom (BrowserRouter, Routes, Route, useParams, useNavigate, Link, NavLink), react (useState, useEffect), react-search-autocomplete (ReactSearchAutocomplete), fuse.js

- Back-end:
Knex, mysql2, cors, express, dotenv, node.js, jsonwebtoken

---

## **Project Demonstration**

1) Sign up as a new user and proceed to login.
<img width="1279" alt="Screenshot 2023-12-04 at 13 15 59" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/f3256805-41b1-49cc-8a70-942017a06d42">

2) Add friends to get started.
<img width="247" alt="Screenshot 2023-12-04 at 12 32 38" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/8f8aced0-8b26-48bb-b292-db08fd0c17c7">

3) Search for friends to connect.
<img width="251" alt="Screenshot 2023-12-04 at 12 31 44" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/7db7e612-de94-4ee1-837c-37e862ceebe2">

4) See which friends are available at any moment via the Active Users page.
<img width="242" alt="Screenshot 2023-12-04 at 12 30 54" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/b020d237-7e6c-45b6-a052-8ef93dbddcb0">

6) Click on an active profile to see the post belonging to that user. You can comment on your friend's post, as well as see how long they are available for.
<img width="1266" alt="Screenshot 2023-12-04 at 12 44 18" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/48c8a061-5e6a-4d31-898b-e995a05f2ceb">

7) If you're free in that moment, navigate to your user profile to activate your profile and make a post.
<img width="246" alt="Screenshot 2023-12-04 at 12 33 04" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/3a892adb-6a63-4f02-8520-5248507490b6">
<img width="243" alt="Screenshot 2023-12-04 at 12 34 23" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/1ca41f64-ea79-4c81-96b0-a9d9092a358b">

8) Your profile will be added to the active users page - where your friends will be able to view your post and respond.
<img width="1262" alt="Screenshot 2023-12-04 at 12 36 56" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/d5b3d2d7-18ab-437c-b553-5df90442fc05">
You can also view your post on your profile page. You can deactivate at any time - removing your profile and post from the active users view for others to see.
<img width="243" alt="Screenshot 2023-12-04 at 12 35 07" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/00b240a8-0e66-4b9f-ba50-b96bb51ad47f">

10) Your profile will remain on the active users grid for the amount of time specified when you activated/made a post. The purpose of this feature is to ensure that only users who are free at that moment are displayed on the active users grid.

11) Once your profile is deactivated, your post will no longer be accessible.
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
- $ cd server
- $ npm i
- $ npm start

5) Run client
- $ cd client/capstone-client/capstone
- $ npm i
- $ npm start
