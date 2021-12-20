const client = require('../dbClient');

module.exports = {
  list: async (req, res) => {
    const query = 'SELECT * FROM "promo";';
    try {
      const resultats = await client.query(query);
      res.render('promos/list', {
        promos: resultats.rows
      });
    } catch (error) {
      console.error('hmm, an error occured:', error);
    }
  },
  details: async (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM "promo" WHERE "id"=${id}`;
    try {
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
    } catch(error) {
      console.error('hmm, an error occured:', error);
    }
  },
};