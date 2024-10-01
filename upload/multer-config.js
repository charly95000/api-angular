const multer = require('multer');

// Définir les types MIME autorisés
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({
  // Destination pour stocker les fichiers
  destination: (req, file, callback) => {
    callback(null, 'images');  // Le répertoire où les fichiers seront stockés
  },
  // Génération du nom de fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];  // Nettoyage du nom
    const extension = MIME_TYPES[file.mimetype];  // Récupérer l'extension du fichier
    if (extension) {
      callback(null,Date.now() + '.' + extension);  // Générer un nom unique
    } else {
      callback(new Error('Invalid file type'));  // Gestion des types de fichiers non supportés
    }
  }
});

// Export du middleware avec gestion d'un fichier unique nommé 'image'
module.exports = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024  // Limite la taille du fichier à 5MB
  },
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPES[file.mimetype];  // Vérifie si le type MIME est valide
    if (isValid) {
      callback(null, true);
    } else {
      callback(new Error('Unsupported file type'), false);
    }
  }
}).single('image');