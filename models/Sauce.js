'use strict'

const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema({
    userId : { type : String, required : true},
    name : { type : String, trim: true, required : true},
    manufacturer : { type : String, trim: true, required : true},
    description : { type : String, trim: true, required : true},
    mainPepper : { type : String, trim: true, required : true},
    imageUrl : { type : String, required : true},
    heat : { type : Number, required : true },
    likes : { type : Number},
    dislikes : { type : Number},
    usersLiked : { type : Array},
    usersDisliked : { type : Array},
})

module.exports = mongoose.model('Sauce', sauceSchema)