// définition du client pg pour se co à la bdd
const { Client } = require('pg');
const client = new Client(process.env.PGURL);
client.connect();

module.exports = {
  list: async (req, res, next) => {
    const id = req.params.id;
    const queryPromo = `SELECT * FROM "promo" WHERE "id"=${id}`;
    const queryStudents = `SELECT * FROM "student" WHERE "promo_id"=${id}`;

    const resultatPromo = await client.query(queryPromo);
    const promo = resultatPromo.rows[0];
    console.log(promo);
    if(promo) {
      const resultatStudents = await client.query(queryStudents);
      res.render('students/list', {
        promo,
        students: resultatStudents.rows
      });
    } else {
      next();
    }
  },
};