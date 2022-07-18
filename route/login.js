const express = require('express');
const router = express.Router();
const path = require('path');
const UserModel = require('../model/User');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', `views/login.html`));
})

router.post('/register', async (req, res) => {
    const email = req.body.email;
    let user = await UserModel.findOne({email});
    if(user){
        console.log('error')
        res.sendStatus(400)
    }else{
        const hashedPsw = await bcrypt.hash(req.body.password, 12)
        user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPsw,
            birthDate: req.body.birthDate
        })
        await user.save()
        console.log('Account created successfully')
        res.sendStatus(200)
    }
})

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await UserModel.findOne({email});

    if(!user){
        console.log('error')
        res.sendStatus(400)
    }else{
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            req.session.isAuth = true;
            res.sendStatus(200)
        }else{
            res.sendStatus(400)
        }
    }
})

module.exports = router