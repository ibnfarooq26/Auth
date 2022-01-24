const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { isEmail } = validator;

const { Schema } = mongoose;
const schema = new Schema({
  email: {
    type: String,
    required: [true, "Email should not be empty"],
    validate: [isEmail, "Invalid Email"],
    lowercase: true,
    unique: [true, "Mail already exists"],
  },
  password: {
    type: String,
    required: [true, "password cannot be empty"],
    minlength: [4, "password should have atleast four letters"],
  },
});

schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
schema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const res = await bcrypt.compare(password, user.password);
    if (res){
        return user
    } else {
        throw Error('incorrect password')
    }
  } else {
    throw Error("incorrect Email");
  }
};
const User = mongoose.model("User", schema);
module.exports = User;
