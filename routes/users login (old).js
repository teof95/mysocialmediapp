// const express = require('express');
// const router = express.Router();
// const {check, validationResult} = require ("express-validator");
// let User = require('../schemas/User')
// const bcryptjs = require ('bcryptjs');
// const gravatar = require("gravatar");
// const config = require("config");
// const jwt  = require("jsonwebtoken");



// //test if the route works (for postman test)
// // router.get('/', (req,res) => res.send ("Hello"));

// router.post('/login', 
// [
//     check("email",'E-mail is empty').isEmail(),
//     check("password",'Password should be 6-12 characters').isLength({min: 6, max: 12 }),

// ],
// async (req, res)=>{
// try {
//     let {email, password} = req.body;
//     let user = await User.findOne({email});
//     let errors = validationResult(req);

//     if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    
// //need to update this
//     if(!user) 
//     return res.status(404)
//     .send("user with this email has not been created yet");
    

//     let doPasswordsMatch = await bcryptjs.compare(password, user.password);
//     console.log(user.password);
//     console.log(password);

//     if(!doPasswordsMatch) 
//     return res.status(401).json("Passwords do not match");


//     const payload = {
//         user: {
//             id: user._id,
//         },
//     };

//     jwt.sign(
//         payload,
//         config.get("jsonWebTokenSecret"), 
//         {expiresIn: 3600}, 
//         (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         }
//     );



// } catch (error) {
//     console.log (error.message);
//     return res.status (500)
//     .send("server error");
// }
// });




// module.exports = router;