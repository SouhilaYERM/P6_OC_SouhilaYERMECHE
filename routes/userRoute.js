const express = require('express')
const router = express.Router()
// const auth = require('../models/User')
const authControler = require('../controlers/userControler')
router.post("/signup", authControler.signUp)
router.post("/login", authControler.logIn)

module.exports = router;