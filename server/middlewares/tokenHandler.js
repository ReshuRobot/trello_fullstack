
// auth, isStudent,isAdmin

const jwt = require("jsonwebtoken");
const User = require('../models/User');
require("dotenv").config();

exports.tokenDecode = (req,res, next) => {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ')[1]
      try {
        const tokenDecoded = jwt.verify(
          bearer,
          process.env.JWT_SECRET
        )
        return tokenDecoded
      } catch {
        return false
      }
    } else {
      return false
    }
  }

   
   



exports.verifyToken = async(req,res,next)=>{
    const tokenDecoded = exports.tokenDecode(req);
    if(tokenDecoded){
const user = await User.findById(tokenDecoded.id)
if(!user) return res.status(401).json('Unauthorized')
req.user = user
next()
    } else {
        res.status(401).json('Unauthorized')
    }

}






// exports.isStudent = (req,res,next) => {
//     try{
//             if(req.user.role !== "Student") {
//                 return res.status(401).json({
//                     success:false,
//                     message:'THis is a protected route for students',
//                 });
//             }
//             next();
//     }
//     catch(error) {
//         return res.status(500).json({
//             success:false,
//             message:'User Role is not matching',
//         })
//     }
// }

// exports.isAdmin = (req,res,next) => {
//     try{
//         if(req.user.role !== "Admin") {
//             return res.status(401).json({
//                 success:false,
//                 message:'THis is a protected route for admin',
//             });
//         }
//         next();
// }
// catch(error) {
//     return res.status(500).json({
//         success:false,
//         message:'User Role is not matching',
//     })
// }
// }