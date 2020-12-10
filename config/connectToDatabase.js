const mongoose = require("mongoose");
const config = require("config");
// const { error } = require("console");


// const {MONGO_ATLAS, MONGO_LOCAL, NODE_ENV } = process.env;


// const connectToDatabase = (mongoURI) =>
// mongoose
// .connect (mongoURI,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//       })
//       .then ((x) => {
//         console.log(
//           `Connected to Mongodb! database name: "${x.connections[0].name}"`
//         );
//       })
//       .catch((err) =>{
//         console.error("error connecting to mongo",err);
//       });



// NODE_ENV === "development" ? connectToDatabase(MONGO_LOCAL) : connectToDatabase(MONGO_ATLAS);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDb is connected...");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


module.exports = connectToDatabase;