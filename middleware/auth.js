const jws = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    //console.log(token);
    if(!token){
        res.status(401).json({"msg": "invalid token"});
    }
    try {
        const cifrated = jws.verify(token, process.env.SECRET);
        req.user = cifrated.user;
        next();
    } catch (error) {
        res.status(401).json({"msg": "invalid token"});
    }
}