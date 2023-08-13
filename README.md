## Sociopedia
Welcome to the Sociopedia repository! This web app brings the power of social networking to your fingertips, allowing users to connect, share, and engage like never before.

### Features
* __User Authentication__: Secure user login and authentication system.
* __Multimedia Sharing__: Post pictures, videos, and audio clips to express yourself.
* __Interactive Feed__: Explore a dynamic feed of user-generated content.
* __Likes and Comments__: Engage with posts through likes and comments.
* __User-Friendly Interface__: Intuitive  design for seamless navigation.

### Getting Started
To get started with the Social Media Clone:
1. Download Node.js onto your system.
2. Clone the repository.
3. Go into the two directories and install the dependencies. Start with the `Front-end-client` using the commands below.
```
cd Front-end-client
```
After going inside the directory, make install the dependencies with the following command.
```
npm install
```
Now run the front-end-client with the following command.
```
npm run dev
```
Next go into the `Server` director and do the same. First, to go into the directory, use the following commands
```
cd ..
cd Server
```
 Do note that you have to change the permissions for the public directory and all its subdirectories so that anyone can read and write inside it. This is where all the users will store their media files. 
 
 On windows, right click on the `public` directory and unselect the read-only attribute. Then go to the security tab and select 'Edit'. There, give the appropriate permissions. For testing purposes, you may simply give full control to all users.
 
 For other linux based platforms, you may have to run specific commands set for your operating systems. For instance, for Ubuntu-based systems, you can run the following command and this should allow all users to read and write into the directory. 
```
$ chmod -R 0777 public
``` 
Do note that the above file permissions are only appropriate for testing purposes and should not used when deploying the application.

Now as before, install the dependencies with the following command.
```
npm install
```
Now run the server.
```
npm start
```

* If you found an error starting the server, it is probably because you do not have an appropriate .env file. It should contain information like the desired port number for the backend server and the MongoDB URL. It should also contain a secret string that will be used to hash passwords and session tokens. The file should contain the information as shown. Fill out the required data accordingly.
```
PORT=
MONGO_URL=
JWT_SECRET=
```
 An example file can be found [here](https://drive.google.com/file/d/1HgJ-6eKP3c--oKXvi6kXYWRFN9v7MShL/view?usp=sharing). Put it inside the `Server` directory and try to run it again. 
