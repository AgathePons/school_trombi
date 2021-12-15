require('dotenv').config();
const express = require('express');
const router = require('./app/router');

const app = express();
const PORT = process.env.PORT || 5050;

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use(router);

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}, visit http://localhost:${PORT} ...`);
});