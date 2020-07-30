/* Imports */
const User = require('../schemas/user');

/*User Controllers*/

exports.getUsers = async (req,res,next) => {
    const users = await User.find({},{password:0,__v:0});
    res.status(200).send({users:users});
};

exports.getUser = async (req,res,next) => {
    const user = await User.findOne({email:req.params.id},{password:0,__v:0})
    if(user !== null){
        res.status(200).send({user:user});
    }else {
        res.status(404).send({message:"User not found with email: " + req.params.id});
    }
};

exports.createUser = async (req,res,next) => {

}
