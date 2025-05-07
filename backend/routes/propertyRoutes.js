const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/propertyController');

router.post('/', PropertyController.createProperty);
router.get('/', PropertyController.getProperties);
router.get('/:id', PropertyController.getPropertyById);
router.put('/:id', PropertyController.updateProperty);
router.delete('/:id', PropertyController.deleteProperty);

module.exports = router;
