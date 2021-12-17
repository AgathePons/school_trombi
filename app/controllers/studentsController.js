// définition du client pg pour se co à la bdd
const { Client } = require('pg');
const client = new Client(process.env.PGURL);

client.connect();

module.exports = {
  list: (req, res, next) => {
    console.log('id de la promo:', req.params.id);
    const id = req.params.id;
    const query = `SELECT * FROM "promo" WHERE "id"=${id}`;
    const queryStudents = `SELECT * FROM "student" WHERE "promo_id"=${id}`;

    client.query(query)
      .then((resultats) => {
        const promo = resultats.rows[0];
        console.log(promo);
        if (promo) {
          client.query(queryStudents)
            .then((results) => {
              res.render('students/list', {
                promo,
                students: results.rows
              });
            })
            .catch((err) => {
              console.error('Oupsiii', err);
              return res.send('Something went wrong');
            });
        } else {
          next();
        }
      })
      .catch((error) => {
        console.error('Oupsiii', error);
        return res.send('Something went wrong');
      });
  },
};