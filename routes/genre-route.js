const express = require('express');
const auth = require('../security/auth');
const router = express.Router();
const multer = require('../upload/multer-config');

const genreCtrl = require('../controllers/genre-ctrl');

router.get('/', genreCtrl.getAllGenres);
router.post('/',genreCtrl.createGenre);
router.get('/:id', genreCtrl.getOneGenre);
router.put('/:id',  genreCtrl.modifyGenre);
router.delete('/:id', genreCtrl.deleteGenre);

module.exports = router;