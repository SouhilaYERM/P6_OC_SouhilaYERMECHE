const sauce = require('../models/ModelsSauce');

exports.createSauce = (req,res,next)=>{
    const Sauce = new sauce({
        ...req.body
    })
    sauce.save()
        .then(()=>res.status(201).json())
        .catch(error => res.status(400).json({error}))}; 

exports.createSauceLike = (req,res,next)=>{
    const Sauce = new sauce({
        ...req.body
    })
    sauce.save()
        .then(()=>res.status(201).json())
        .catch(error => res.status(400).json({error}))};

exports.getAllSauces = (req,res, next) =>{
    sauce.find()
    .then(sauces => res.status(200).json({}))
    .catch(error => res.status(400).json({ error }))}; 

exports.getOneSauce = (req,res, next)=>{
    sauce.findOne({_id: req.params.id})
    .then(product => res.status(200).json())
    .catch(error => res.status(400).json({ error }))};

exports.modifyOneSauce = (req,res, next) => {
    sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ }))
    .catch(error => res.status(400).json({ error }))};

exports.deleteOneSauce = (req, res, next) => {
    sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ }))
      .catch(error => res.status(400).json({ error }));
}