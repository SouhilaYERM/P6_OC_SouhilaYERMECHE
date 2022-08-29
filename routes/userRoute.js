const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

const userControler = require('../controlers/userControler')
router.post("/signup", auth, userControler.signUp)
router.post("/login", auth, userControler.logIn)

module.exports = router;