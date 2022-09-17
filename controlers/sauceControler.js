//Imports 
const sauce = require('../models/ModelsSauce');
const fs = require('fs')
const jwt = require('jsonwebtoken');

//Export de la fonction createSauce 
exports.createSauce = (req,res,next)=>{
    const sauceObj = JSON.parse(req.body.sauce)
    //Supression de l'id du corp de la requette 
    delete sauceObj._id
    //création d'une nouvelle instance de la méthode 'sauce'
    let Sauce = new sauce({
        ...sauceObj,
        likes:0, 
        dislikes:0, 
        usersDisliked: [], 
        usersLiked:[],
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`//enregistrement image et création url dynamique
    })
    Sauce.save()
        .then(()=>res.status(201).json({message: "Sauce enregistrée !"}))
        .catch(error => res.status(400).json({error})) 
}; 

// Export de la fonction getAllSauces qui récupère toutes les sauces présentes 
exports.getAllSauces = (req,res, next) =>{
    sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))};

// Export de la fonction getOneSauce qui récupère une sauce via son id 
exports.getOneSauce = (req,res, next)=>{
    sauce.findOne({_id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }))};

//Export de la fonction modifyOneSauce pour la requette put qui modifie une sauce 
exports.modifyOneSauce = (req,res, next) => {
    //Si nouveau fichier image, 
    const sauceObj = req.file ? {
        ...JSON.parse(req.body.sauce), 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }: {...req.body}

    sauce.updateOne({_id: req.params.id}, {...sauceObj, _id: req.params.id})
        .then(() => res.status(200).json({message: "Sauce modifiée" }))
        .catch(error => res.status(400).json({ error }))};

//Export de la fonction delete pour la suppression des sauces 
exports.deleteOneSauce = (req, res, next) => {
    sauce.findOne({_id: req.params.id})
        .then(Sauce =>{
            if(Sauce.userId !== req.auth.userId){
                res.status(401).json({message: 'Unauthorized'})
            }else{
                const filename = Sauce.imageUrl.split('/images')[1]
                fs.unlink(`images/${filename}`, ()=> {
                    sauce.deleteOne({_id: req.params.id})
                        .then(()=>{res.status(200).json({message: 'Sauce supprimée !'})})
                        .catch(error => res.status(401).json({error}))
                })
            }
        })
        .catch(error => res.status(500).json({error}))}

//Expression de la fonction qui renvoie les likes et dislikes 
exports.createSauceLike = (req,res,next)=>{
    const sauceId = req.params.id;
    const userId = req.body.userId;
    const like = req.body.like;
    if(userId !== req.auth.userId){
        res.status(401).json({message: 'Unauthorized'})
    }else{
        if (like === 1) {
            sauce.updateOne({ _id: sauceId },{$inc: { likes: like },$push: { usersLiked: userId }})
                .then((sauce) => res.status(200).json({ message: "Sauce appréciée" }))
                .catch((error) => res.status(500).json({ error }));
        }else if (like === -1) {
            sauce.updateOne({ _id: sauceId }, {$inc: { dislikes: -1 *like }, $push: { usersDisliked: userId }})
                .then((sauce) => res.status(200).json({ message: "Sauce dépréciée" }))
                .catch((error) => res.status(500).json({ error }))
        } else {
            sauce.findOne({ _id: sauceId })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(userId)) {
                    sauce.updateOne({ _id: sauceId },{ $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                        .then((sauce) => {res.status(200).json({ message: "Sauce dépréciée" })})
                        .catch((error) => res.status(500).json({ error }));
                    } else if (sauce.usersDisliked.includes(userId)) {
                    sauce.updateOne({ _id: sauceId },{$pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
                        .then((sauce) => {res.status(200).json({ message: "Sauce appréciée" })})
                        .catch((error) => res.status(500).json({ error }));
                    }})
                .catch((error) => res.status(401).json({ error }));
        }
    }
        
};