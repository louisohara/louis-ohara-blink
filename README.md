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

**VIDEO:** 
https://www.loom.com/share/be035be7c50944c9ae500112055dee57?sid=478694fc-bbc7-4b87-8c09-5260846eb1d9

**STEPS:**
1) Sign up as a new user and proceed to login.
<img width="1279" alt="Screenshot 2023-12-04 at 13 15 59" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/f3256805-41b1-49cc-8a70-942017a06d42">

Add a profile picture after login complete.

<img width="1280" alt="Screenshot 2023-12-07 at 18 32 48" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/d43fa69b-f3b5-43f5-84cf-16b727b0699e">

2) Add friends to get started.
<img width="1270" alt="Screenshot 2023-12-05 at 16 41 22" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/db29348d-171a-45a5-a8c4-45849eb5a66c">

Navigate to the add friends page.

<img width="579" alt="Screenshot 2023-12-05 at 16 46 52" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/bf1c5479-c23e-405b-a2c8-af744f976a8c">

Press the search button to find friends.

<img width="251" alt="Screenshot 2023-12-05 at 16 44 40" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/79e7d5e3-dcce-4589-aaea-b8c28fb03819">

4) Search for friends to connect.

<img width="260" alt="Screenshot 2023-12-05 at 16 50 19" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/b9d37546-9f88-4f50-a0b1-0aa005964f6f">

5) See which friends are available at any moment via the Active Users page.
<img width="1266" alt="Screenshot 2023-12-05 at 16 52 50" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/a73cdeca-793e-4968-bd03-69c0f49d2270">

6) Click on an active profile to see the post belonging to that user. You can comment on your friend's post, as well as see how long they are available for.
<img width="1265" alt="Screenshot 2023-12-05 at 16 54 34" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/729c6b6e-6872-4126-a332-884975bc11a6">

7) If you're free in that moment, navigate to your user profile to activate your profile and make a post.
<img width="246" alt="Screenshot 2023-12-04 at 12 33 04" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/3a892adb-6a63-4f02-8520-5248507490b6">
<img width="243" alt="Screenshot 2023-12-04 at 12 34 23" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/1ca41f64-ea79-4c81-96b0-a9d9092a358b">

8) Your profile will be added to the active users page - where your friends will be able to view your post and respond.
<img width="1264" alt="Screenshot 2023-12-05 at 17 00 05" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/2264b260-a911-4744-98ee-b5c46c689877">

You can also view your post on your profile page. You can deactivate at any time - removing your profile and post from the active users view for others to see.

<img width="259" alt="Screenshot 2023-12-05 at 17 03 54" src="https://github.com/louisohara/louis-ohara-blink/assets/145442290/febf0ce4-1f3a-43b9-8de3-9effcd757fa2">

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
