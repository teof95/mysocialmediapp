const express = require('express');
const app = express();
const connectToDatabase = require('./config/connectToDatabase');
const cors = require("cors");

app.use(cors());
app.use(express.json(
    {extented:false}
    ));

connectToDatabase();

app.get('/',(req,res)=>
res.send('app is working, congrats')
)
 

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
console.log(`server is on port: ${PORT}`)
);