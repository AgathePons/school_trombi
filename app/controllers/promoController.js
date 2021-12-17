//const promos = require('../../data/promos.json');

// définition du client pg pour se co à la bdd
const { Client } = require('pg');
const client = new Client(process.env.PGURL);

client.connect();

module.exports = {
  list: (req, res) => {
    const query = 'SELECT * FROM "promo";';
    // --------- Technique avec promise
    // promesse.then(callback).catch(callbackEnCasDError);
    client.query(query)
      .then((resultat) => {
        res.render('promos/list', {
          promos: resultat.rows
        });
      })
      .catch((error) => {
        console.error('Oupsiii', error);
        return res.send('Something went wrong');
      });

    // --------- Technique avec callback
    /* const resultats = client.query('SELECT * FROM "promo";', (err, resultats) => {
      if(err) {
        console.error('Oupsiii', err);
        return res.send('Something went wrong');
      }
      //console.log(resultats.rows);
      // On gère le res.render dans la callback, sinon le render part avant d'avoir reçu le resultat
      res.render('promos/list', {
        promos: resultats.rows
      });
    }); */

    
  },
  details: (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM "promo" WHERE "id"=${id}`;

    client.query(query)
      .then((resultat) => {
        const promo = resultat.rows[0];
        if (promo) {
          res.render('promos/details', {
            promo
          });
        } else {
          console.log('raté 404');
          next();
        }
      })
      .catch((error) => {
        console.error('Oupsiii', error);
        return res.send('Something went wrong');
      });

    //version array.find
    /* const promo = promos.find((p) => {
      // Number() et parseInt() quasi pareil (ES6 / ES5)
      return p.id === Number(id);
    });

    //version one line
    //promo = promos.find(p => p.id === Number(id));

    if (promo) {
      res.render('promos/details', {
        promo
      });
    } else {
      console.log('raté 404');
      next();
    } */
  },
};