const UserModel = require('../models/user');
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/errorHandler')

function generateToken(id){
	return 	jwt.sign({id:id}, process.env.JWT_SECRET);
}

module.exports.login = async (req,res,next)=>{
	try {
		const {email,password} = req.body;
		let user  =await UserModel.findOne({email:email}).select('+password');
		if(!user) next(new ErrorHandler('Invalid credential',401));
		const isPasswordCorrect = await user.comparePassword(password);
		if(isPasswordCorrect){
			const token = generateToken(user._id);
			res.json({
				token:token,
			})
		}
		else{
			next(new ErrorHandler('Invalid credential',401));
		}
	} catch (error) {
		next(new ErrorHandler(error,500));
	}
}

module.exports.signup = async (req,res,next)=>{
	try {
		const {name,password,email} = req.body;
		const newUser = await UserModel.create({name,email,password});
		const token = generateToken(newUser._id);
		res.json({
			token:token,
		})
	} catch (error) {
		next(new ErrorHandler(error,500));
	}
}