const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../schemas/user');
const bcrypt = require('bcrypt');

 async  function generateToken (user) {

    return jwt.sign({
        email: user.email
    }, config.secret_key, {
        expiresIn: '72h'
    });
}

exports.ValidateUser = async (req, res, next) => {
     const user = await User.findOne({email:req.query.email});
     if(user !== null){
        const verify_password = await bcrypt.compare(req.query.password,user.password);
        if(verify_password){
            const token = await generateToken(user);
            res.header("x-auth-token",token).send({
                token:token
            });
        }else{
            res.status(400).send({message:'Wrong email or password.'});
        }
    }else{
         res.status(404).send({message:"User not found."})
     }
}

exports.getProfile = async (req,res) => {
     const user = await User.findOne({email:req.user.email},{password:0,_v:0});
     res.status(200).send(user);
};
