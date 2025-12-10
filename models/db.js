const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/studentsDB")
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

require("./student.model"); // keep this only if your schema file exists
