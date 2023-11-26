# Project Title - CAPSTONE PROPOSAL

## extras

Potential NAMEs:

- TIG:
- hook: idea is that pressing the button throws a net/is fishing for plans
- IP

## Overview

## What is your app? Brief description in a couple of sentences.

An app that you use when you're free/have no plans in order to alert your friends that you want to hangout. With the press of a button, you can declare your availability and specify how long you are available for. As well as sending your friends a notification (NICE TO HAVE), pressing the button will display your profile as a post to your network on the who's available page - where your friends can respond/comment in order to arrange plans with you.

My app allows users to arrange spontaneous plans with friends when they find themselves without them - as well as allowing users to see what their friends are doing and join any open invite plans on the app.

## User Journey

After completing sign-up and profile creation steps, users connect with their friends on the app.

Users connect with their friends on the app via the add Friends page - which houses a searchbar and displays current friends.

The main page houses a button 'I'M FREE' that users press when they have no plans and want to see friends - users can also specify how long they are free for.

Once the button is pressed, all friends of the user are sent an alert/push notification that the user is free to hangout. (NICE TO HAVE)

Each user is able to see a list of all friends who are free at any given time via the who's free page.

When users press the button/declare their freedom, their profile is added to the page for the amount of time specified, and a post is created. Once the time has passed, their profile is removed from the page/their post is deleted.

On the who's free page, profiles are displayed in a list view.

Clicking on each profile will take the user to the post belonging to that profile. Here the user can add a comment on the post - such as 'hey i'm at the pub, come join'.

Users can become inactive/delete their posts once they have made plans or if they change their minds.

### Problem - Why is your app needed? Background information around any pain points or other reasons.

Sometimes plans fall through, or you're poorly organised and find yourself free on a friday night when you don't want to be.

With the press of a button, you can notify all your friends that you're free and keen to hang.

All friends with the app will receive a notification that you're free. They can then respond to your signal through the app to let you know what they're up to.

Suddenly you have plans.

### User Profile - Who will use your app? How will they use it? Any special considerations that your app must take into account.

Target audience is people who have friends already.

If user does not have existing friends on the app, they will have nothing to do.

To demonstrate the app, I will create a profile on the app and add a friend to get started.

I will have to build an API for a preset array of fake friend profiles.

The friend users will be profiles hosted by the API which persist. The friends with: array of profiles will then be displayed on the swipe page.

Friend users will have posts which persist on the app.

### Features - List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

FRONT-END:

- storePhoto: allows the user to upload an image to link to their profile. Function stores the image in a static path.
- createUser: user submits registration form which creates user profile object and posts the profile to the /users api array.
- setUser: also runs after the user submits registration form, setting the current user of the app (which determines what profiles are shown).
- searchUser: user searches name of a friend user and function returns the friends profile (.find method) allowing user to connect with friend.
- addFriend: adds selected user's user_id to the main user's friends object property.
- displayFriends: gets list users from the api and displays the name and profile photo of each user object on the page in list form. Used to view current friends.
- displayActive: variation of the above, displaying only active profiles - for the who's free page.
- createPost: user creates post by completing the form and presses 'throw/cast' button to send post to the /posts.
- setActive: runs when the user submits post, changing the active object property on their user profile to true (default is false).
- setDuration: runs when the user specifies their availability duration - converting the user input to change the active object property to false after the specified amount of time; removing their profile from the active profiles display (who's free page).
- setInactive: users can remove themselves from the 'i'm free'/active users page by pressing the inactive button (which appears only once the user's active status is true)
- displayPost: displays the post and comments for when a user clicks on an active Profile from the who's free page, linked to /posts/:id, displaying the post.
- deletePost: deletePost deletes the user's post from the API once the user's availability window expires, or if the user setsInactive. Posts live for the duration of user's activity window. Sends the ID of the post to be deleted.
- addComment: handleSubmit that allows users to add a comment to another member's post. Creates comment object and posts to /posts/:id comments object property.

BACK-END:

- getUsers: responds with list of all users.
- addUser: receives userObject and adds userObject to api.
- addFriend/editUserFriends: receives the userID and updates the friends object property value with the new friend user_id.
- getUserPosts: receives userID and returns posts belonging to the user.
- addPost: receives postObject and adds postObject to api.
- deletePost: receives postID and deletes postObject.
- addComment/editPostComments: receives commentObject, postID in request body and adds commentObject to postID.

## Implementation

### Tech Stack - List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

Front-end:
Axios, useState, useEffect, BrowserRouter, Routes, Route, useParams, react, useNavigate, Link

firebase - for sending push notifications. Firebase Cloud Messaging (EXTRA)

Back-end:
Knex, mysql2, cors, express, dotenv, node.js

### APIs - List any external sources of data that will be used in your app.

/USERS

When a user completes sign-up, they will provide the user name, photo, tel and friends with. The object's active property will default to false - with true.

Who's available page will display a list of active users/only the user object's user_name and user_photo.

/USERS/:ID/FRIENDS - add Friends page

[
user_id,
user_id,
user_id,
]

When searching for friends, the user can see a list of their current friends under the search panel.

/POSTS/ - A list of all posts made by all users. Posts are displayed relevant to the user, only after the user's profile is clicked on, to return the specific user's post.

Posts are objects created after users press the create post button via a handleClick event/axios.post request.

POSTS/:ID - returns the individual post/and its comments specified by the given ID.

USERS/:ID/POSTS/
From the who's available page, clicking on a user's profile will lead you to USERS/:ID/POSTS/ endpoint. This displays the posts made by a certain user.

Here, the POST object's description, duration, comments and post_createdAt properties will also be available.

Users will also need to be able to see their own posts on their I'm free page (after they have pressed the button).

### Sitemap - List the pages of your app with brief descriptions. You can show this visually, or write it out.

MVP:

- Sign up page: users register and provide profile information and photo.
- Add friends page: users search for friends to add/view existing friends.
- I'm free page - houses the I'm free button which displays create post modal when pressed.
- Who's free page?/On the line - Displays active profiles.
- User Post Modal - Clicking on the profile from who's free page displays a modal with the user's post.
- Create Post Modal - houses the create post form.
- Search Results Modal - displays user Profile matched from searchbar in the add friends page.

### Mockups - Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

![Who's free Mobile page] (assets/images/13 November 2023/IMG_5454.jpeg)
![Who's free desktop page] (assets/images/13 November 2023/IMG_5455.jpeg)
![I'm free mobile page] (assets/images/13 November 2023/IMG_5456.jpeg)
![I'm free desktop page] (assets/images/13 November 2023/IMG_5457.jpeg)
![Add friends mobile page] (assets/images/13 November 2023/IMG_5458.jpeg)
![Add friends desktop page] (assets/images/13 November 2023/IMG_5459.jpeg)
![Sign up mobile and desktop page] (assets/images/13 November 2023/IMG_5460.jpeg)

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

Users and posts have a one to many relationship. Each post can only be authored by one user, each user can have multiple posts.

Users: BACK-END TABLE

user {
id: BIGINT(20)
email:VARCHAR(50)
password:VARCHAR(50)
first_name:VARCHAR(50)
last_name:VARCHAR(50)
photo: upload
createdAt: DATETIME
}

FRONT-END: Users are objects containing: {
id: random UUID,
user_email: email @auth,
user_password: password ,
user_name: user name,
user_photo: user photo,
friends: [ user_id, user_id, user_id ], user_id is FOREIGN KEY - JOINED ON FRONT END
active: true/false
}

Users can have many posts. (Although only 1 will be active)

Posts belong to only one user.

BACK-END Posts table: {
id: BIGINT(20)
author_id: BIGINT(20) - foreign key
description: VARCHAR(250)
durationValue: DATETIME
createdAt: DATETIME
}

BACK-END POSTS COMMENT table: {
id: BIGINT(20)
post_id: BIGINT(20) - foreign key
author_id: BIGINT(20) - foreign key
description: VARCHAR(250),
createdAt: DATETIME,
}

FRONT-END comment object {

id: BIGINT(20), primary key
post_id: BIGINT(20) - foreign key
author_id: BIGINT(20) - foreign key
description: VARCHAR(250),
createdAt: DATETIME,
userName: , JOINED FROM USERS
userPhoto: , JOINED FROM USERS

}

FRONT-END POST OBJECT
Posts {
id: post_id, PRIMARY KEY
author_id: user_id, FOREIGN KEY
user_name: user name, - joined from Users
description: post description,
duration: user's availability duration,
user_photo: user photo, - joined from Users
post_createdAt: timestamp,
comments: [ {comment} , {comment} , ] - joined from
}

Comment objects contain {
id: randomUUID,
post_id: post_id, FOREIGN KEY
user_id: user_id, FOREIGN KEY
user_name: user Name - joined from Users,
user_photo: user Photo, - joined from Users,
comment: comment description,
comment_createdAt: timestamp,
}

Each comment belongs to one post and one user. Each post can have multiple comments.

- do posts have to be separate from array of comments?

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

router.get("/", usersController.getAllUsers);
router.post("/", usersController.addUser);
router.get("/:id", usersController.getUser);
router.put("/:id", usersController.editUser)
router.get("/:id/posts", usersController.getUserPosts);

<!-- router.post("/:id/posts", usersController.addUserPosts); -->

router.get("/:id", postsController.getPost)
router.post("/", postsController.addPost);
router.put("/:id", postsController.editPost);
router.delete("/:id", postsController.deletePost)

### Auth - Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

User's provide a profile when they sign-up - login functionality as a nice to have.
Current user will dictate the friends and posts displayed.

## Roadmap - Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

1. Create DATABASE and fill using mysql2 and knex migrations/seeds.
   - create Users migration file. DONE
   - create Posts migration file. DONE
   - view tables in workBench. DONE
   - fill with default/demo values seeds. DONE
2. Build the API server routers/controllers DONE
   - app.use("/api/posts", postsRouter); DONE
   - app.use("/api/users", usersRouter); DONE
   - test using Postman; DONE
3. Build front-end in following order:

- React Routing - DONE
  function heavy components:
  - Sign-up page with AUTH and headers {Bearer "JWT TOKEN"}
  - Who's free page
  - I'm free page - create posts/make users active
  - Display Post Modal
  - Add friends page
    Styling components:
  - Create Header/Footer Components

4. Review page functionality.
5. Review page styling.

## Nice-to-haves - Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

SCALED UP:

- on I'm free page: once button pressed is pressed, your post modal is displayed here and you can view your post and the responding profiles here.
- edit user profile page.
- notifications page.
- a button on the profile allows friends to send a request to hang.

  - request is received by the user and approved/rejected.
  - click 'accept' plan and the friend profile is added/joined to the post - status is updated to '{x} and {y} are kicking it at {location}' for others to see.
  - friend profiles are added to the post if they press the JOIN button. This way other friends can see that 2 people are hanging out/plans are arranged.

- a swipe queue for friends who are free, users can go through and 'match' with friends that they want to hang out with.
- chat features?
- location-based: friends can send their locations in response.
