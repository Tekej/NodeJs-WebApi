const zatrudnienieController = require('../controllers/zatrudnienieController');
const express = require('express');
const router = express.Router();

router.get('/', zatrudnienieController.showZatrudnienieList);
router.get('/add', zatrudnienieController.showZatrudnienieAdd);
router.get('/edit/:zatId', zatrudnienieController.showZatrudnienieEdit);
router.get('/details/:zatId', zatrudnienieController.showZatrudnienieDetails);
router.post('/add', zatrudnienieController.addZatrudnienie);
router.post('/edit', zatrudnienieController.updateZatrudnienie);
router.get('/delete/:zatId', zatrudnienieController.deleteZatrudnienie);
module.exports = router;