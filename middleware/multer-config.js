//Imports 
const multer = require('multer'); 

//création de MIME_TYPES comprenant les extensions de fichiers 
const MIME_TYPES = {
    'image/jpg': 'jpg', 
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

//Objet de configuration pour 'multer'
const storage = multer.diskStorage({
    destination: (req,file, callback)=>{ //destination ou l'image importée sera enregistrée
        callback(null, 'images')
    },
    //Création du nom de fichier 
    filename:(req, file, callback) =>{
        const name = file.originalname.split(' ').join('_'); //On récupère le nom d'origine en remplaçant les espaces par des _
        const extension = MIME_TYPES[file.mimetype] //On crée l'extension du fichiers 
        callback(null, name + Date.now() + '.' + extension)
    }
})

//exports 
module.exports = multer({storage}).single('image');