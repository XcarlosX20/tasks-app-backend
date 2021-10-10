const Users = require("../Model/Users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
exports.createUser = async(req,res) => {
    //errors 
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    const {name, email, password} = req.body;
    try {
        //if email is already exists
        let user = await Users.findOne({email});
        if(user) res.status(400).json({"msg":"This user already exists"});
        user = new Users(req.body);
        //hash the pass
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.SECRET,{
            expiresIn: 3600
        }, (err, token)=>{
            if(err) throw err
            res.json({token});
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).send("error")
    }
    
}