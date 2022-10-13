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
		if(!user) return next(new ErrorHandler('Invalid credential',401));
		const isPasswordCorrect = await user.comparePassword(password);
		if(isPasswordCorrect){
			const token = generateToken(user._id);
			res.json({
				token:token,
				email:user.email,
				name:user.name,
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
			name,email,
		})
	} catch (error) {
		console.log(error);
		next(new ErrorHandler(error,500));
	}
}

module.exports.getProfile = async (req,res,next)=>{
	try {
		const userId = req.user;
		const user = await UserModel.findById(userId).lean();
		res.json({
			data:user
		})
	} catch (error) {
		next(new ErrorHandler(error,500));
	}
}