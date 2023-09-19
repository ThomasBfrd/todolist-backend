const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')
const { authMiddleware } = require('../middleware/auth');

router.use(authMiddleware)

router.post('/', authMiddleware, stuffCtrl.createThing)
router.get('/:id', authMiddleware, stuffCtrl.getOneThing)
router.put('/:id', authMiddleware, stuffCtrl.updateThing)
router.delete('/:id', authMiddleware, stuffCtrl.deleteThing)
router.get('', authMiddleware, stuffCtrl.getAllThings)

module.exports = router;