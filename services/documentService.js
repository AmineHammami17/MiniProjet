const multer = require("multer");
const path = require("path");
const fs = require('fs');
const fileconfig = require("../config/fileconfig")
const asyncHandler = require('express-async-handler');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/files/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

const uploadSingleFile = uploadStorage.single("file");
const uploadMultipleFiles = uploadStorage.array("file", 10);

const getListFiles = asyncHandler(async (req, res) => {
    const directoryPath = path.join(__dirname, fileconfig.filelocation);
    console.log("List all the files in directory - " + directoryPath);
    const files = await fs.promises.readdir(directoryPath);
    console.log("Total files available are - " + files);
    let fileInfos = [];
    files.forEach((file) => {
        console.log("Adding file fileInfo Array - " + file);
        const url = path.join("/", fileconfig.filelocation, file); 
        fileInfos.push({
            name: file,
            url: url,
        });
    });
    res.status(200).send(fileInfos);
});

const download = asyncHandler(async (req, res) => {
    const fileName = req.params.name; 
    const directoryPath = fileconfig.filelocation;
    res.download(path.join(directoryPath, fileName), fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "There was an issue in downloading the file. " + err,
        });
      }
    });
});

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  getListFiles,
  download,
};
