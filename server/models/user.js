const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    FirstName: String,
    LastName: String,
    DOB: String,
    city: String,
    state: String,
    country: String,
    email: String,
    password: String,
})
module.exports = mongoose.model('user', userSchema, 'users')