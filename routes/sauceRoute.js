//Imports
const express = require('express')
const sauceControler = require('../controlers/sauceControler')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

//Création du router 
const router = express.Router()

//Routes sauces 
router.post("/", auth, multer, sauceControler.createSauce)
router.post("/:id/like",auth, sauceControler.createSauceLike)
router.get("/",auth, sauceControler.getAllSauces)
router.get("/:id",auth, sauceControler.getOneSauce)
router.put("/:id",auth, multer, sauceControler.modifyOneSauce)
router.delete('/:id',auth, sauceControler.deleteOneSauce);

//Exports
module.exports = router;