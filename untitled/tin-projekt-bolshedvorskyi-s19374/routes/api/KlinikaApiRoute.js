const express = require('express');
const router =  express.Router();

const klinikaApiController = require('../../api/KlinikaApi');

router.get('/', klinikaApiController.getKlinika);
router.get('/:klinikaId', klinikaApiController.getKlinikaById);
router.post('/', klinikaApiController.createKlinika);
router.put('/:klinikaId', klinikaApiController.updateKlinika);
router.delete('/:klinikaId', klinikaApiController.deleteKlinika);

module.exports = router;