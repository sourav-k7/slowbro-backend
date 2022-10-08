const ErrorHandler = require("../utils/errorHandler")
const jwt = require('jsonwebtoken');
const tokenCheck = (req,res,next)=>{
	try {
		const authorization = req.headers.authorization;
		if (!authorization)
		  next( new ErrorHandler("'Authorization' header not found"));
		  const token = authorization.replace("Bearer", "").trim();
		if(!token)  next(new ErrorHandler('Authorization header incorrect',400));
		const decoded = jwt.verify(token,process.env.JWT_SECRET);
		if (!decoded) throw new ErrorHandler("Authorization header incorrect",400);
		
		req.user = decoded.id;
		next();
	} catch (error) {
		next(new ErrorHandler(error,500));
	}
}
module.exports = tokenCheck;