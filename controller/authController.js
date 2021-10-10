const Users = require("../Model/Users");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    // if errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errores: errors.array() })
    }
    const { email, password } = req.body;

    try {
        // Checking if user is registered 
        let user = await Users.findOne({ email });
        if(!user) {
            return res.status(400).json({msg: 'This user does not exist'});
        }
        //console.log(user);
        // checking the pass
        const passCorrect = await bcrypt.compare(password, user.password);
        if(!passCorrect) {
            return res.status(400).json({msg: 'Password Incorrect' })
        }

        //JWT
         const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hour
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}
//get user
exports.userAuth = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'There was an error'});
    }
}