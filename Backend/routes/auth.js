const express = require('express');
const router = express.Router();
const users = require("../models/UserModel")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Nabeel1isagoodboy";
let success ;

// Route 1: Create a user using: POST "/api/auth/createuser". No login Required.
router.post('/createuser', [
    body('username', "username cannot be empty").notEmpty(),
    body('email', "Email format Incorrect").notEmpty(),
    body('password', 'Incorrect Password format').notEmpty().isLength({ min: 5, max: 15 })
], async (req, res) => {
    // const result = validationResult(req);
    // if (result.isEmpty()) {
    //     let user1 = new users(req.body)
    //     user1.save()
    //     console.log(user1)
    //    return res.send(user1)
    // }

    // res.send({ errors: result.array() });

    //If there are errors return bad request and the errors.
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        // check whether the user with this email exists already
        let user = await users.findOne({ email: req.body.email })
        if (user) {
            success = false;
            return res.status(400).json({ success, errors: "Sorry a user with this email already exists." });
        }

        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(req.body.password, salt)

        // create user
        user = await users.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message)
        success = false;
        res.status(500).send(success, "Create User: Internal Server Error.")
    }

})

// Route 2: Authenticating a user using: POST "/api/auth/login". No login Required.
router.post('/login', [
    body('email', "Email format Incorrect").isEmail(),
    body('password', "Password cannot be blank.").notEmpty()
], async (req, res) => {
    //If there are errors return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await users.findOne({ email: email })
        if (!user) {
            success = false;
            return res.status(400).json({success, error: "Invalid email or password" })
        }

        let passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Invalid email or password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message)
        success = false;
        res.status(500).send(success, "Login: Internal Server Error.")
    }
})
 

// Route 3: Get logged in user details using: POST "/api/auth/getuser". login Required.
router.post('/getuser', fetchuser , async (req, res) => {
    
    try {
        let userId = req.user.id;
        const user = await users.findById(userId).select("-password")
        res.send(user)
        
    } catch (error) {
        console.error(error.message)
        success = false;
        res.status(500).send(success, "Get user: Internal Server Error.")
    }
})

module.exports = router