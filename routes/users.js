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
});

router.get ("/get_user_by_email/:user_email", async (req,res) =>{
    try {
        let userEmail =  req.params.user_email;
        let user = await User.findOne({email: userEmail}).select("-password");
        res.json(user);        
    } catch (error) {
    console.error (error);
    return res.status (500).json("server error...");
    }
});

router.get('/users', async (req,res) =>  {
    try {
        let users = await User.find().select("-password");
        res.json(users);        
    } catch (error) {
    console.error (error.message);
    return res.status (500).send("server error");
        
    }
});

router.get('/get_user_by_id/:user_id', async (req,res) =>  {
    try {
        let userId= req.params.user_id;
        let users = await User.findById(userId).select("-password");
        res.json(users);        
    } catch (error) {
    console.error (error.message);
    return res.status (500).send("server error");
        
    }
});




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
    let { name, lastName, userName, email, password } = req.body;
    let user = await User.findOne({ email }).select("-password");
    let fetchedUserNameFromDatabase = await User.findOne({ userName }).select(
      "-password"
    );
    let errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    if (user) return res.status(401).send("User has already been created");

    if (fetchedUserNameFromDatabase === userName)
      return res.status(401).json("User name is already been taken");

    const avatar = gravatar.url(email, {
      r: "pg",
      d: "mm",
      s: "200",
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

    let hashedPassword = await bcryptjs.hash(password, salt);

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
      { expiresIn: 3600 },
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

router.put("/search_by_username", 
[check('userNameFromSearch', "search is empty").not().isEmpty()],
async(req,res) =>{
    try {
        let {userNameFromSearch} = req.body;
        let errors = validationResult(req);

        if(!errors.isEmpty()) 
        return res.status(400).json({errors: errors.array()});

        let users = await User.find().select('-password');
        let findUserbyUsername = users.filter(user => user.userName.toString().toLowerCase().split(" ").join("") === userNameFromSearch.toString().toLowerCase().split(" ").join(""));
        res.json(findUserbyUsername);
    } catch (error) {
        console.error (error.message);
        return res.status (500).send("server error.");
    }
});

router.put("/change_user_data/:user_data_to_change", 
authentication, 
[
    check("changeUserData", "Input is empty").not().isEmpty()
], 
async(req,res) =>{
    try {
        const {changeUserData} = req.body;
        const errors = validationResult(req);
        let user = await User.findById(req.user.id).select('-password');

        if(!errors.isEmpty()) 
        return res.status(400).json({errors: errors.array()});


        if(!user) return res.status(404).json("user not found");

        let userDataToChange = req.params.user_data_to_change.toString();

        if(user[userDataToChange] === changeUserData.toString()) 
        return res
        .status(401)
        .json("This is the same data that is already in the database");

        user[userDataToChange] = changeUserData.toString();
        await user.save();

        res.json("Data is Changed");


    } catch (error) {
        console.error (error);
        return res.status (500).json("server error...");
    }
});

router.put(
    '/check_actual_password',
    authentication,
    [
        check('passwordToCheck', 'Password has to be between and 6 and 12 characters').isLength({min:6, max:12})
    ],
    async(req,res)=>{
        try {
            const {passwordToCheck} = req.body;
            const errors = validationResult(req);
            if(!errors.isEmpty()) 
            return res.status(400).json({errors: errors.array()});
            let user = await User.findById(req.user.id);
            
            let doPasswordsMatch = await bcryptjs.compare(passwordToCheck, user.password );

            if(!doPasswordsMatch) return res.status(401).json("passwords do not match");
            res.json("success");
        } catch (error) {
            console.error (error);
            return res.status (500).json("server error...");
        }
    }
)



router.put(
    '/change_user_password',
    authentication,
    [
        check('newPassword', 'Password has to be between and 6 and 12 characters').isLength({min:6, max:12})
    ],
    async(req,res)=>{
        try {
            const {newPassword} = req.body;
            const errors = validationResult(req);
            if(!errors.isEmpty()) 
            return res.status(400).json({errors: errors.array()});
            let user = await User.findById(req.user.id);   

            const salt = await bcryptjs.genSalt(10);
            
            const hashedPassword = await bcryptjs.hash(newPassword, salt);

            user.password=hashedPassword;
            await user.save();

            res.json("success");


        } catch (error) {
            console.error (error);
            return res.status (500).json("server error...");
        }
    }
)




module.exports = router;