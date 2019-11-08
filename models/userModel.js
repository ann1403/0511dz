const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const SALT = '$2b$10$EeMqPAnuumH5shPmReAm.u';

const UserSchema = new mongoose.Schema({
    mail: String,
    name: String,
    surname: String,
    login: String,
    pwd: String,
    dob: Date,
    phone: String,
});

UserSchema.methods.hashPwd = (pwd) => bcrypt.hash(pwd, SALT);

const Model = mongoose.model('User', UserSchema);
module.exports = Model;