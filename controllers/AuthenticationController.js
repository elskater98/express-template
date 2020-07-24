const jwt = require('jsonwebtoken');
const config = require('../config');
const mongoose = require('mongoose');
const User = require('../schemas/user');
const bcrypt = require('bcrypt');


 async  function generateToken (user) {

    return jwt.sign({
        email: user.email,
    }, config.secret_key, {
        expiresIn: '72h'
    });
}

exports.ValidateUser = async (req, res, next) => {
     const user = await User.findOne({email:req.query.email});

    if(user.length !== 0){
        const verify_password = await bcrypt.compare(req.query.password,user.password);
        if(verify_password){
            const token = await generateToken(user);
            res.header("x-auth-token",token).send({
                'first name': user.first_name,
                'last name': user.last_name,
                email:user.email,
                success:true,
                token:token
            });
        }else{
            res.status(400).send({message:'Wrong email or password.'});
        }
    }
}
