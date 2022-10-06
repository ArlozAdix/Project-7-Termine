const mongoose = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  pseudo: {type: String, required: true, unique: true, minLength: 3, maxLength: 55},
  email: { type: String, required: true, unique: true, validate: [isEmail], lowercase: true },
  password: { type: String, required: true},
  isAdmin: { type: Boolean, default: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);