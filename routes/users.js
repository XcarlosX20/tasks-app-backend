const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const {check} = require("express-validator");
router.post('/', 
    [
        check('name', 'the name is required').not().isEmpty(),
        check('email', 'the email is required').isEmail(),
        check('password', 'the password is required').isLength({min: 6})
    ],
    userController.createUser
);
module.exports = router;