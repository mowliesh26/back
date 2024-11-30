const File = require('../models/uploadmodal');  
const path = require('path');
const fs = require('fs');

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
    });

    await file.save();  
    res.json({ success: true, fileData: file });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error uploading file', error: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find();  
    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching files', error: error.message });
  }
};
const deleteFile = async (req, res) => {
    const { id } = req.params;  
    console.log("id",id);
  
    try {
      const file = await File.findById(id);
  
      if (!file) {
        return res.status(404).json({ success: false, message: 'File not found' });
      }
  
      const filePath = path.join(__dirname, '..', file.path); 
      console.log("filePath",filePath);

      fs.unlinkSync(filePath); 
  
      await File.findByIdAndDelete(id);
  
      res.json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ success: false, message: 'Error deleting file', error: error.message });
    }
  };
  

module.exports = { uploadFile, getFiles,deleteFile };
