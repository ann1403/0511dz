const express = require('express');
const router = express.Router();

const Ajv = require('ajv');
const ajv = new Ajv();
const usersSchema = require('../schemas/userSchema');
const UserModel = require("../models/userModel");


router.get('/', function(req, res, next) {
    UserModel.find()
        .then(data => {
            res.render('index', { users: data });
        })
        .catch(err => { if (err) throw err });
});
router.post('/', async(req, res) => {
    const new_user = await new UserModel({});

    new_user.pwd = await new_user.hashPwd(req.body.pwd);
    console.log(new_user.pwd)
    const new_user1 = await new UserModel({
        mail: req.body.mail,
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login,
        dob: req.body.dob,
        pwd: new_user.pwd,
        phone: req.body.phone,
    });
    await new_user1.save();
    res.redirect('/');
});

router.post('/login', async(req, res) => {

    const { login, pwd } = req.body;

    const user = await UserModel.findOne({ login });

    if (!user) {
        res.render('index', { err: 'User not found!' });
        return;
    }

    const hashed = await user.hashPwd(pwd);
    if (hashed === user.pwd) {
        res.render('index', { err: user.name });
    } else {
        res.render('index', { err: 'Login or password is incorrect!' });
    }

});


module.exports = router;