//Imports
const jwt = require('jsonwebtoken');

// Export de module d'authentification
module.exports = (req,res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]; //On récupère le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //On vérifie le token 
        const userId = decodedToken.userId; //On récupère le userId depuis l'objet decodedToken

        req.auth = {userId: userId}; 
        if(req.body.userId && req.body.userId !== userId){ //si le userId de la requette ne conrespond pas au userId de la requete 
            throw 'Invalid userId ! '
        }else{
            next()
        }
    }catch(error){
        res.status(401).json({error})
    }
}