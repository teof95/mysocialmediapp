require("dotenv").config()
const express = require('express');
const app = express();
const connectToDatabase = require('./config/connectToDatabase');
const cors = require("cors");
const http = require('http');


const {MONGO_ATLAS, MONGO_LOCAL, NODE_ENV } = process.env;


NODE_ENV === "development" ? connectToDatabase(MONGO_LOCAL) : connectToDatabase(MONGO_ATLAS);


//prevent cors policy warning
app.use(cors());

//use body json thing to create posts
app.use(express.json({extented:false}));

//dummy function to see if the app works 
// app.get('/',(req,res)=>res.send('app is working, congrats'))

let server = http.createServer(app);

server.on('error', error => {
    if (error.syscall !== 'listen') { throw error }
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${process.env.PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${process.env.PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });



//routes
app.use('/api/posts', require('./routes/posts.js'))
app.use('/api/users', require('./routes/users.js'))


if (process.env.NODE_ENV === "production") {
  // set ability to get static values from client build folder
  // static files include all javascript and css files
  app.use(express.static("frontend/build"));
  // get the index.html that will be rendered on the browser
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend", "build", "index.html"));
  });
}


//specify the port of the app depending if heroku will run the port or it runs at local host
let PORT = process.env.PORT || 5000;

//method to specify on which port we want our app to e with callback function to see if method works
server.listen(PORT, () => 
console.log(`server is on port: ${PORT}`)
);


