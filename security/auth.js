const jwt = require('jsonwebtoken');
const User = require('../models/user')


exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "RANDOM_TOKEN_ACCESS");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// module.exports.usersAuth = (req, res , next) =>{
//   try{
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if(req.body.userId && req.body.userId !== userId){
//       res.status(401).json({
//         message: 'User invalid'
//       });
//     }else{
//       next();
//     }
//   }catch{
//     res.status(401).json({
//       message : 'Invalid request'
//     })
//   }
// }

