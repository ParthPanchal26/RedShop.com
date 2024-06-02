const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://killer:mongo123@cluster0.je7tdms.mongodb.net/?retryWrites=true&w=majority"
const bcrypt = require('bcrypt')

mongoose.set('strictQuery', false);
mongoose.connect(db, err =>{
    if(err){
        console.error('Error!' + err)
    }else{
        console.log('Connected to mongoDb')
    }
})

router.get('/register', (req, res)=>{
    res.send('This is SignUp API') 
})
router.get('/login', (req, res)=>{
    res.send('This is SignIn API') 
})

router.post('/register', (req, res)=>{
    let userData = req.body
    let user = new User(userData)

    user.save((error, registredUser) => {
        if(error){
            console.log(error)
        }else{
            let payload = { subject: registredUser._id }
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res)=>{
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error)
        }else if(!user){
            res.status(401).send('Invalid email')
        }else if(user.password !== userData.password){
            res.status(401).send('Invalid password')
        }
        else{
            let payload = { subject: user._id}
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).send({token})
        }
    })
})

module.exports = router

