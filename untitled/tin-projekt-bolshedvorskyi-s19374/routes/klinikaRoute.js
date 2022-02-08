const klinikaController = require('../controllers/klinikaController');
const express = require('express');
const router = express.Router();

router.get('/', klinikaController.showKlinikaList);
router.get('/add', klinikaController.showKlinikaAdd);
router.get('/edit/:kliId', klinikaController.showKlinikaEdit);
router.get('/details/:kliId', klinikaController.showKlinikaDetails);
router.post('/add', klinikaController.addKlinika);
router.post('/edit', klinikaController.updateKlinika);
router.get('/delete/:kliId', klinikaController.deleteKlinika);
module.exports = router;