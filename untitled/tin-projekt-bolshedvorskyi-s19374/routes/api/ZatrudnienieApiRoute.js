const express = require('express');
const router =  express.Router();

const zatrudnienieApiController = require('../../api/ZatrudnienieApi');

router.get('/', zatrudnienieApiController.getZatrudnienie);
router.get('/:zatrudnienieId', zatrudnienieApiController.getZatrudnienieById);
router.post('/', zatrudnienieApiController.createZatrudnienie);
router.put('/:zatrudnienieId', zatrudnienieApiController.updateZatrudnienie);
router.delete('/:zatrudnienieId', zatrudnienieApiController.deleteZatrudnienie);

module.exports = router;