const express = require('express');
const router =  express.Router();

const lekarzApiController = require('../../api/LekarzeApi');

router.get('/', lekarzApiController.getLekarze);
router.get('/:lekarzId', lekarzApiController.getLekarzeById);
router.post('/', lekarzApiController.createLekarz);
router.put('/:lekarzId', lekarzApiController.updateLekarz);
router.delete('/:lekarzId', lekarzApiController.deleteLekarze);

module.exports = router;