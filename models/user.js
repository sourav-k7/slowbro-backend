const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function (email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
  };

const UserSchema = Schema({
	name:{
		type:String,
		required:true,
		minlength: [3, "Minimum length should be 5"],
    maxlength: [60, "Maximum length should be 60"],
	},
	email:{
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validateEmail, "Please fill a valid email address"],
	  },
	password: {
		type: String,
		set: (password) => {
		  if (password.length > 60 || password.length < 5) {
			return password;
		  }
		  const salt = bcrypt.genSaltSync(10);
		  const hash = bcrypt.hashSync(password, salt);
		  return hash;
		},
		minlength: [5, "Minimum length should be 5"],
		maxlength: [60, "Maximum length should be 60"],
		select: false,
	  },
});
UserSchema.methods.comparePassword = async function (pass) {
	return await bcrypt.compare(pass, this.password);
  };

module.exports = mongoose.model("User", UserSchema);
