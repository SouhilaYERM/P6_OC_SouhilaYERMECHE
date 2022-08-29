const express = require('express')
const router = express.Router()
const sauceControler = require('../controlers/sauceControler')
router.get('/toto', (req,res)=>{
    console.log("Bonjour")
    res.send('hello world')
})

router.post("/", sauceControler.createSauce)
router.post("/:id/like", sauceControler.createSauceLike)
router.get("/", sauceControler.getAllSauces)
router.get("/:id", sauceControler.getOneSauce)
router.put("/:id", sauceControler.modifyOneSauce)
router.delete('/:id', sauceControler.deleteOneSauce);

module.exports = router;