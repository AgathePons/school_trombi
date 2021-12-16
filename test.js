const {
  Client
} = require('pg');

// ^ on va chercher direct Client de base
// const pg = require('pg');
// const client = pg.client;


// on crée un client de connexion à la bdd avec une connection string
//<protocol>://<user>:<pswd>@<host>:<port>/<database>
const client = new Client('postgresql://etudiant:js4life@pg.oclock.lan:5432/trombi');

client.connect();

const resultats = client.query('SELECT * FROM "promo" LIMIT 3', (err, resultats) => {
  if(err) {
    return console.error('Oupsiii', err);
  }
  //console.log(resultats.rows);

});

const check = () => {
  console.log(resultats);
};