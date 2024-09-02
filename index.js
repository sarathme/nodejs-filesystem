const fs = require("fs");
const path = require("path");

const express = require("express");

// INITALIZING app using express

const app = express();

// Creating a results directory using fs module mkdir method.

fs.mkdir(path.join(__dirname, "results"), { recursive: true }, (err) => {
  // Error handling for directory creation
  if (err) {
    res
      .status(500)
      .json({ status: "failed", message: "'Couldn't create a directory" });
  }

  // Logging to the console as the directory is created.

  console.log("Directory created successfully");
});

// Create a API endpoint to create a file in results directory

app.get("/create-file", (req, res) => {
  // Using fs module to create a directory called results

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
    res
      .status(200)
      .json({ status: "success", message: "File Created successfully" });
  });
});

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

const port = 3000;

app.listen(port, () => {
  console.log("App running on port 3000");
});
