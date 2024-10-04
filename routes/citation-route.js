const express = require('express');
const auth = require('../security/auth');
const router = express.Router();
const multer = require('../upload/multer-config');

const citationCtrl = require('../controllers/citation-ctrl');

router.get('/', citationCtrl.getAllCitations);
router.post('/',citationCtrl.createCitation);
router.get('/:id', citationCtrl.getOneCitation);
router.put('/:id',  citationCtrl.modifyCitation);
router.delete('/:id', citationCtrl.deleteCitation);

module.exports = router;