const express = require('express');
const router = express.Router();
const {check, validationResult} = require ("express-validator");
let User = require('../schemas/User')
const bcryptjs = require ('bcryptjs');
const gravatar = require("gravatar");
const config = require("config");
const jwt  = require("jsonwebtoken");
const authentication = require('../middleware/authentication');


router.get("/", authentication, async(req,res) => {
    try {
        let user = await User.findById(req.user.id).select("-password");
        res.json(user);        
    } catch (error) {
    console.error (error.message);
    return res.status (500).send("server error");
    }    
})



//test if the route works (for postman test)
// router.get('/', (req,res) => res.send ("Hello"));

// ----------------------->register user<-----------------------------

router.post('/register', 
[
    check("name",'Name is empty').not().isEmpty(),
    check("lastName",'Last name is empty').not().isEmpty(),
    check("userName",'Username is empty').not().isEmpty(),
    check("email",'E-mail is empty').isEmail(),
    check("password",'Password should be 6-12 characters').isLength({min: 6, max: 12 }),

],
async (req, res)=>{
try {
    let {name, lastName, userName, email, password} = req.body;
    let user = await User.findOne({email}).select("-password");
    let fetchedUserNameFromDatabase = await User.findOne({userName}).select("-password");
    let errors = validationResult(req);

    if(!errors.isEmpty()) 
    return res.status(400).json({errors: errors.array()});
    
//need to update this
    if(user) 
    return res.status(401).send("There is already a user registered with this email");
    
    if(fetchedUserNameFromDatabase === userName) 
    return res.status(401).json("There is already a user registered with this username");



    const avatar = gravatar.url(email,{
        r: 'pg',
        d: 'mm',
        s: '200'
    });

    let newUser = new User({
        name,
        lastName,
        userName,
        email,
        password,
        avatar,
    });

    const salt = await bcryptjs.genSalt(10);

    let hashedPassword = await bcryptjs.hash(password,salt);

    newUser.password = hashedPassword;
    
    await newUser.save();

    const payload = {
        user: {
            id: newUser._id,
        },
    };

    jwt.sign(
        payload,
        config.get("jsonWebTokenSecret"), 
        {expiresIn: 3600}, 
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
    );



} catch (error) {
    console.error (error.message);
    return res.status (500)
    .send("server error");
}
});

// ----------------------->Login user<-----------------------------

router.post('/login', 
[
    check("email",'E-mail is empty').isEmail(),
    check("password",'Password should be 6-12 characters').isLength({min: 6, max: 12 }),

],
async (req, res)=>{
try {
    let {email, password} = req.body;
    let user = await User.findOne({email});
    let errors = validationResult(req);

    if(!errors.isEmpty()) 
    return res.status(400).json({errors: errors.array()});
    
//need to update this
    if(!user) 
    return res.status(404)
    .send("user with this email has not been created yet");
    

    let doPasswordsMatch = await bcryptjs.compare(password, user.password);

    if(!doPasswordsMatch) 
    return res.status(401).json("Passwords do not match");


    const payload = {
        user: {
            id: user._id,
        },
    };

    jwt.sign(
        payload,
        config.get("jsonWebTokenSecret"), 
        {expiresIn: 3600}, 
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
    );



} catch (error) {
    console.error (error.message);
    return res.status (500)
    .send("server error");
}
});


module.exports = router;