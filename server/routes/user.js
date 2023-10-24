const router = require('express').Router();
const {body} = require('express-validator');
const {login, signup} = require("../Controllers/Auth");
const validation = require("../middlewares/validation")
const tokenHandler=require('../middlewares/tokenHandler');
const User = require('../models/User');
// const User = require('../models/User');
// const {auth, isStudent,isAdmin} = require("../middlewares/auth");


router.post('/signup', 
body('username')
.isLength({ min: 8 })
.withMessage('Username must be 8 characters')
.custom(async (value) => {
  // Check if the value is either a valid email or a string
  if (!(isValidEmail(value) || typeof value === 'string')) {
    throw new Error('Invalid username');
  }

  // Check if the username is already used
  const user = await User.findOne({ username: value });
  if (user) {
    throw new Error('Username already used');
  }

  return true; // Indicates that the validation passed
}),
   
body('password').isLength({min: 8}).withMessage('password must be at least 8 characters' ),
body('confirmPassword').isLength({min : 8}).withMessage('confirmPassword must be ateast 8 characters'),

validation.validate,
signup);


router.post("/login",
body('username').isLength({min:8}).withMessage(
    'username must be at least 8 characters'
),
body('password').isLength({min:8}).withMessage(
    'password must be at least 8 chacaters'
),
validation.validate,
login)

router.post('/verify-token',
tokenHandler.verifyToken,(req,res)=> {
    res.status(200).json({user:req.user})
})
// //testing protected routes for single middleware
// router.get("/test", auth, (req,res) =>{
//     res.json({
//         success:true,
//         message:'Welcome to the Protected route for TESTS',
//     });
// });

// //Protected Route
// router.get("/student", auth, isStudent, (req,res) => {
//     res.json({
//         success:true,
//         message:'Welcome to the Protected route for Students',
//     });
// } );

// router.get("/admin", auth, isAdmin, (req,res) => {
//     res.json({
//         success:true,
//         message:'Welcome to the Protected route for Admin',
//     });
// });

module.exports = router;
function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }