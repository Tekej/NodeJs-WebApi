const lekarzController = require('../controllers/lekarzController');
const express = require('express');
const router = express.Router();

router.get('/', lekarzController.showLekarzList);
router.get('/add', lekarzController.showLekarzAdd);
router.get('/edit/:lekId', lekarzController.showLekarzEdit);
router.get('/details/:lekId', lekarzController.showLekarzDetails);
router.post('/add', lekarzController.addLekarz);
router.post('/edit', lekarzController.updateLekarz);
router.get('/delete/:lekId', lekarzController.deleteLekarz);
module.exports = router;