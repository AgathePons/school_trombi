require('dotenv').config();
const express = require('express');
const session = require('express-session');
const router = require('./app/router');

const app = express();
const PORT = process.env.PORT || 5050;

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(session({
  // doc express-session : npmjs.com/package/express-session
  // secret: generate the tokens
  secret: 'DearPrincessCelesti@YourF4ithfullyStud3ntTwilightSparkle',
  // session auto save at the end of the request
  resave: true,
  // even if empty, save the session
  saveUninitialized: true,
  cookie : {
    // define option for cookies, for example lifetime
    // we can leave empty to keep default settings
  }
}));

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}, visit http://localhost:${PORT} ...`);
});