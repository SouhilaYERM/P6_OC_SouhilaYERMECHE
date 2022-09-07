//Imports
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//Schema des données pour les utilisateurs 
const modelsUser = mongoose.Schema({
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}
})

//Implémentation du plugin "uniqueValidator" 
modelsUser.plugin(uniqueValidator)

//exports
module.exports = mongoose.model("user", modelsUser);