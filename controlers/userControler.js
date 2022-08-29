const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');

const user = require('../models/User')

exports.signUp = (req,res,next)=>{
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const User = new user({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(()=> res.status(201).json({message:'Utilisateur crée'}))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}

exports.logIn = (req,res,next)=>{
    user.findOne({email: req.body.mail})
        .then(User => {
            if(User === null){
               res.status(401).json({message : 'Paire identifiant/mot de passe incorrecte'}) 
            }else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid){
                            res.status(401).json({message : 'Paire identifiant/mot de passe incorrecte'})
                        }else{
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    {userId: user._id},
                                    'RANDOM_TOKEN_SECRET', 
                                    {expiration: '24h'}
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({error}))
            }
            
        })
        .catch(error => res.status(500).json({error}))
}