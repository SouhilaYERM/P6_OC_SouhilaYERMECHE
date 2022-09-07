//Imports 
const express = require('express')
const userControler = require('../controlers/userControler')

//création du router
const router = express.Router()

//Routes d'authentification des utilisateurs 
router.post("/signup", userControler.signUp)
router.post("/login", userControler.logIn)

//Exports
module.exports = router;