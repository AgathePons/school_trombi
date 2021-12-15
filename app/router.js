const express = require('express');
const mainControllers = require('./controllers/mainControllers');

const router = express.Router();


router.get('/', mainControllers.home);

module.exports = router;