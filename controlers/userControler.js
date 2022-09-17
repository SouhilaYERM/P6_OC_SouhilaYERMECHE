//Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/User')

//Export de la fonction signUp pour la création du compte utilisateur
exports.signUp = (req,res,next)=>{
    bcrypt.hash(req.body.password, 10) //hash du mot de passe 
        .then(hash => {
            const User = new user({
                email: req.body.email,
                password: hash
            })
            User.save()
                .then(()=> res.status(201).json({message:'Utilisateur crée'}))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}

//export de la fonction logIn pour la connexion sur le site 
exports.logIn = (req,res,next)=>{
    user.findOne({email: req.body.email}) //Reconnaissance de l'utilisateur grace à sa boite mail
        .then(User => {
            if(User === null){
                // Envoie d'un message d'erreur si aucun utilisateur n'est inscrit avec cette boite mail
               res.status(401).json({message : "Utilisateur non retrouvé !"}) 
            }else{
                bcrypt.compare(req.body.password, User.password) //Comparaison du password du corp de la requette avec le password de l'utilisateur 
                    .then(valid => {
                        if (!valid){
                            res.status(401).json({message : 'Paire identifiant/mot de passe incorrecte'})
                        }else{
                            res.status(200).json({
                                userId: User._id,
                                token: jwt.sign(
                                    {userId: User._id},
                                    'RANDOM_TOKEN_SECRET', 
                                    {expiresIn: '24h'}
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({error}))
            }
            
        })
        .catch(error => res.status(500).json({error}))
}