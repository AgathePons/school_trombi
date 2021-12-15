const express = require('express');
const mainControllers = require('./controllers/mainControllers');
const promoController = require('./controllers/promoController');

const router = express.Router();


router.get('/', mainControllers.home);

router.get('/promos', promoController.list);

router.get('/promos/:id', promoController.details);

module.exports = router;