const express = require('express');
const multer = require('multer');
const path = require('path');
const {
    uploadSingleFile,
    uploadMultipleFiles,
    getListFiles,
    download,
  } = require('../services/documentService');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/files/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const uploadStorage = multer({ storage: storage });

router.post('/upload/single',uploadStorage.single("file"), uploadSingleFile);
router.post('/upload/multiple', uploadMultipleFiles);
router.get('/files', async (req, res) => {
    try {
        const fileInfos = await getListFiles();
        res.status(200).json(fileInfos);
    } catch (error) {
        console.error('Error getting list of files:', error);
        res.status(500).json({ message: 'Error getting list of files' });
    }
});

router.get('/files/:name',download);

module.exports = router;
