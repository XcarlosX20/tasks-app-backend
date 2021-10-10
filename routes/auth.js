const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const {check} = require("express-validator");
const auth = require("../middleware/auth");
router.post('/', 
    [
        check('email', 'the email is required').isEmail(),
        check('password', 'the name is required').isLength({min: 6})
    ],
    authController.authUser
);
router.get('/', auth, authController.userAuth);
module.exports = router;