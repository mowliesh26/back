const express = require('express');
const router = express.Router();
const { uploadFile, getFiles ,deleteFile} = require('../controller/uploadController.js'); 
const multer = require('multer'); 
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage: storage });


router.post('/upload', upload.single('file'), uploadFile); 
router.get('/', getFiles); 
router.delete('/delete/:id', deleteFile);
module.exports = router;
