const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const connection = require("./config/database");
const apiRoutes = require("./routes/api");

const fileUpload = require("express-fileupload");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize the file upload middleware
app.use(fileUpload());

//config req.body:
app.use(express.json()); //for json
app.use(express.urlencoded({ extended: true })); //for form data

//config template engine
configViewEngine(app);

//khai bao route
app.use("/", webRoutes);
app.use("/v1/api", apiRoutes);

//shape data

//test connection
const startServer = async () => {
  try {
    //using mongoose
    // await connection();

    //using mongodb
    // Connection URL
    const url = process.env.DB_HOST;
    const client = new MongoClient(url);

    // Database Name
    const dbName = process.env.DB_NAME;

    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("documents");

    const result = await collection.find({}).toArray();

    console.log(result);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
