const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Connection to MongoDB Cluster connected successfully!");
  } catch (err) {
    console.log("Error while connecting to MongoDB");
    console.log(err);

    // process exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;
