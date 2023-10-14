const express = require('express')
// const jwt = require('jwt')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { registerValidation }  = require('./validation/Auth');
const { validationResult } = require('express-validator');
const UserModel = require('./models/User')

mongoose
.connect('mongodb+srv://nurdauletitemgen20:nurdau___002@database.ctulckv.mongodb.net/')
.then(() => console.log('DB ok'))
.catch((err) => console.log('db error',err));
const app = express();

app.use(express.json());

app.post('/auth/register',registerValidation, async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    };

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = UserModel({
       email: req.body.email,
       fullname: req.body.fullname,
       avatarUrl: req.body.avatarUrl,
       passwordHash,
    });

    const user = await doc.save();

    res.json(user);
});


app.listen(4321,(err) => {
    if(err) {
        return console.log(err)
    }
    console.log('Server is runnig')
});