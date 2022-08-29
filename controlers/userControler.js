const user = require('../models/User')

exports.signUp = (req,res,next)=>{
    const User = new user({
        ...req.body
    })
    user.save()
        .then(()=>res.status(201).json({}))
        .catch(error => res.status(400).json({error}))
}

exports.logIn = (req,res,next)=>{
    const User = new user({
        ...req.body
    })
    user.save()
        .then(()=>res.status(201).json({}))
        .catch(error => res.status(400).json({error}))
}