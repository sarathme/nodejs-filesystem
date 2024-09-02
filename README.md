# Node File System task

Last commit Hash : 6f6a7129a627f05a4e76016355b32c8f910f3d23

Postman Docs:
[Postman Published Docs](https://documenter.getpostman.com/view/16657839/2sAXjM4rZT#7c58913d-e465-4cde-b147-9cea6861a51d)

Deployed Render URI:
[https://nodejs-filesystem-sarasraman.onrender.com](https://nodejs-filesystem-sarasraman.onrender.com)

Deployed URI for creating a new file:
[https://nodejs-filesystem-sarasraman.onrender.com/create-file](https://nodejs-filesystem-sarasraman.onrender.com/create-file)

Deployed URI for reading files:
[https://nodejs-filesystem-sarasraman.onrender.com/read-files](https://nodejs-filesystem-sarasraman.onrender.com/read-files)

Deployed URI for removing all files:
[https://nodejs-filesystem-sarasraman.onrender.com/remove-files](https://nodejs-filesystem-sarasraman.onrender.com/remove-files)

## Creating a results directory

1. I have created a results directory in the root directory in the top level
   code as its efficient to create a directory once when the server is turned
   on.

2. I have used the mkdir method of the fs module and created the results
   directory.

```js
const fs = require("fs");
const path = require("path");

const express = require("express");

// INITALIZING app using express

const app = express();

// Creating a results directory using fs module mkdir method.

fs.mkdir(path.join(__dirname, "results"), { recursive: true }, (err) => {
  // Error handling for directory creation
  if (err) {
    console.log("Error creating directory");
  }

  // Logging to the console as the directory is created.

  console.log("Directory created successfully");
});
```

## Creating a file

Deployed URI for creating a new file:
[https://nodejs-filesystem-sarasraman.onrender.com/create-file](https://nodejs-filesystem-sarasraman.onrender.com/create-file)

1. First I have defined a route for creating a file using expressjs by calling
   the get method on instance of Express object.

2. The route is '/create-file' and the callback handles the creation of file
   with filename as date time string and inserting the file with a timestamp.

```js
const fs = require("fs");
const path = require("path");

const express = require("express");

// INITALIZING app using express
const app = express();

// Create a API endpoint to create a file in results directory

app.get("/create-file", (req, res) => {
  // defining variables for file name using Date class.
  const date = new Date().toISOString();
  const fileName = date.replace(/:/g, "-").replace("T", "_").split(".")[0];

  // Defining the path name for the file.

  const filePath = `./results/${fileName}.txt`;

  // Defining the content of the file as a timestamp

  const timeStamp = Date.now().toString();

  // Write the timestamp to the file using the fs module writeFile method.

  fs.writeFile(filePath, timeStamp, (err) => {
    if (err) {
      res.status(500).json({ status: "failed", message: err });
    }

    // Sending response to the client
    res.status(200).json({
      status: "success",
      message: "File Created successfully",
      createdFile: fileName + ".txt",
    });
  });
});
```

## Reading filenames

Deployed URI for reading files:
[https://nodejs-filesystem-sarasraman.onrender.com/read-files](https://nodejs-filesystem-sarasraman.onrender.com/read-files)

1. The route (API endpoint) for reading the available files is '/read-files'
   with a get request.

2. This endpoint will give a response a object with status and array of
   filenames in files field.

```js
const fs = require("fs");
const path = require("path");

const express = require("express");

// INITALIZING app using express

const app = express();

// Create a API endpoint to read the files in the results directory

app.get("/read-files", (req, res) => {
  // Defining the path name of the files.

  const pathName = path.join(__dirname, "results");

  // Read the files inside the results directory using fs module readFile.

  fs.readdir(pathName, (err, files) => {
    // Error handling for reading the files in results directory.

    if (err) {
      res
        .status(500)
        .json({ status: "failed", message: "Unable to read files" });
    }

    // Sending response to client with the names of the files in files directory as an array.

    res.status(200).json({ status: "success", files: files });
  });
});
```

## Removing all files

Deployed URI for removing all files:
[https://nodejs-filesystem-sarasraman.onrender.com/remove-files](https://nodejs-filesystem-sarasraman.onrender.com/remove-files)

1. The route (API endpoint) for removing all the available files is
   '/remove-files' with a get request.

2. This endpoint will respond with an object with status, message and an array
   of filenames which are deleted.

```js
const fs = require("fs");
const path = require("path");

const express = require("express");

// INITALIZING app using express

const app = express();

// Creating an endpoint to remove all files from the results directory.

app.get("/remove-files", (req, res) => {
  // Defining the directory path (results) using path join method.

  const dirPath = path.join(__dirname, "results");

  // Reading all the files avaliable in the directory (results) using readdir method of fs module.

  fs.readdir(dirPath, (err, data) => {
    // Looping through the received data (filenames) using forEach method.

    try {
      data.forEach((file) => {
        // Defining the file path of each object
        const filePath = path.join(dirPath, file);

        // Removing the file using unlinkSync (synchronous delete) method of the fs module.

        fs.unlinkSync(filePath);
      });

      res.status(200).json({
        status: "success",
        message: "All files deleted successfully",
        deletedFiles: data,
      });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        message: "Unable to delete files",
      });
    }
  });
});
```

## Redirect Endpoint

1. Since I haven't associated any response for the root url (/) so I have
   redirected it to response of /read-files endpoint.

```js
const fs = require("fs");
const express = require("express");

// INITALIZING app using express

const app = express();

// Create a API endpoint to redirect to /read-files route when / route is requested.
app.get("/", (req, res) => {
  res.status(301).redirect("/read-files");
});
```
