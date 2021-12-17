// définition du client pg pour se co à la bdd
const {
  Client
} = require('pg');
const client = new Client(process.env.PGURL);
client.connect();

module.exports = {
  list: async (req, res) => {
    const query = 'SELECT * FROM "promo";';

    const resultats = await client.query(query);
    res.render('promos/list', {
      promos: resultats.rows
    });
  },

  details: async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM "promo" WHERE "id"=${id}`;

    const resultat = await client.query(query);
    const promo = resultat.rows[0];
    if (promo) {
      res.render('promos/details', {
        promo
      });
    } else {
      console.log('raté 404');
      next();
    }
  },
};