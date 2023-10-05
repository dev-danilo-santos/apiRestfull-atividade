const express = require('express');
const router = express.Router();
const proprietarioController = require('../controllers/proprietarioController');


router.get('/proprietarios', proprietarioController.getAll);

router.get('/proprietarios/:id', proprietarioController.getById);   

router.post('/proprietarios', proprietarioController.create);

router.put('/proprietarios/:id', proprietarioController.update);

router.delete('/proprietarios/:id', proprietarioController.delete);



module.exports = router;
