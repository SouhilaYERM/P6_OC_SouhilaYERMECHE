//Imports
const mongoose = require('mongoose')

//Schema des données sauces 
const modelsSauce= mongoose.Schema({
    userId : {type: String, required: true},
    name : {type: String, required : true},
    manufacturer : {type: String , required: true},
    description : {type: String, required : true},
    mainPepper : {type: String, required:true},
    imageUrl : {type: String, required : true},
    heat : {type: Number, required : true, min: 1, max: 10},
    likes: {type: Number, required: true, default: 0},
    dislikes : {type: Number, required: true, delault: 0},
    usersLiked : {type: [String], required: true, default:[]}, 
    usersDisliked : {type: [String], required: true, default:[]}
})

//Exports
module.exports = mongoose.model("sauce", modelsSauce)