const express = require("express");
require("dotenv").config();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const mongoose = require("mongoose");
const { createServer } = require("http");

const app = express();

const v1route = require("./routes/v1");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MDB_URI)
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch((err) => {
    console.log("something went wrong", err);
  });
app.get("/", (req, res, next) => res.send("hi from slowbro backend"));
app.use("/api/v1", v1route);

app.use(errorMiddleware);
 const httpServer = createServer(app);
 
 
 const PORT = process.env.PORT || 5000;
 httpServer.listen(PORT, () => {
   console.log(`server running on port : ${PORT}`);
  });

  module.exports = app;

  

 
  
