# Code.me
Project of portal with small announcements where can get reputation points for good work.
- Keystone, HBS, MongoDB, [Colandero](https://github.com/bzhk/colandero)

## Features

- **1. Registration** [clien code](https://github.com/bzhk/code.me/blob/master/code.me/templates/views/register.hbs), [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/register.js)
- **2. Log-in** [client code](https://github.com/bzhk/code.me/blob/master/code.me/templates/views/signin.hbs), [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/signin.js)
- **3. Log-out** [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/signout.js)
- **4. Profile** 
     - [x] Render own profile [client code](https://github.com/bzhk/code.me/blob/master/code.me/templates/views/profile.hbs), [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/profile.js)
     - [x] Render other user profile [client code](https://github.com/bzhk/code.me/blob/master/code.me/templates/views/user.hbs), [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/user.js)
     - [x] Edit own profile [client code](https://github.com/bzhk/code.me/blob/master/code.me/templates/views/editProfile.hbs), [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/editProfile.js)    
- **5. Announcements** 
     - [x] Add announcement [client code](https://github.com/bzhk/code.me/blob/master/code.me/templates/views/addPost.hbs), [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/addPost.js)
     - [x] Show announcement [client code](https://github.com/bzhk/code.me/blob/master/code.me/templates/views/post.hbs), [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/post.js)
     - [x] Show announcements list [client code](https://github.com/bzhk/code.me/blob/master/code.me/templates/views/posts.hbs), [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/posts.js)
     - [x] Application for work [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/add.js)
     - [x] Close announcement and give respect points for work [API code](https://github.com/bzhk/code.me/blob/master/code.me/routes/views/cloPost.js)
     - [x] Showing notification label for announcement depends the user's reputation.

## How to use

### Requirements

* mongoDB
* node.js

### Start

1. npm install - install all dependencies
2. npm start - start server
