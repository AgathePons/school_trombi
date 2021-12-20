const express = require('express');
const mainControllers = require('./controllers/mainControllers');
const promoController = require('./controllers/promoController');
const studentsController = require('./controllers/studentsController');

const router = express.Router();


router.get('/', mainControllers.home);

router.get('/promos', promoController.list);

router.get('/promos/:id', promoController.details);

router.get('/promos/:id/students', studentsController.list);

router.get('/students', studentsController.allList);

router.get('/students/:id', studentsController.details);

module.exports = router;