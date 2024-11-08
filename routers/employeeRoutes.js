const express=require('express');
const router=express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  });

const {createEmployee, getAllEmployees, editEmployee, deleteEmployee}= require('../controllers/employeeController');
const authMiddleware=require('../middleware/authMiddleware');
router.post('/employee',authMiddleware,upload.single('image'),createEmployee);
router.get('/employee',authMiddleware,getAllEmployees);
router.put('/employee/:id',authMiddleware,upload.single('image'),editEmployee);
router.delete('/employee/:id',authMiddleware,deleteEmployee);

module.exports=router;