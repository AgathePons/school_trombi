const client = require('../dbClient');

module.exports = {
  list: async (req, res, next) => {
    const id = req.params.id;
    const queryPromo = `SELECT * FROM "promo" WHERE "id"=${id}`;
    const queryStudents = `SELECT * FROM "student" WHERE "promo_id"=${id}`;
    try {
      //const resultatPromo = await client.query(queryPromo);
      const promo = (await client.query(queryPromo)).rows[0];
      console.log(promo);
      if (promo) {
        const students = (await client.query(queryStudents)).rows;
        res.render('students/list', {
          promo,
          students
        });
      } else {
        next();
      }
    } catch (error) {
      console.error('hmm, an error occured:', error);
    }

  },
  details: async (req, res, next) => {
    const id = req.params.id;
    const queryStudent = `SELECT * FROM "student" WHERE "id"=${id}`;
    
    try {
      const resultat = await client.query(queryStudent);
      const student = resultat.rows[0];
      if (student) {
        const queryPromo = `SELECT "name" FROM "promo" WHERE "id"=${student.promo_id}`;
        const promo = (await client.query(queryPromo)).rows[0];
        res.render('students/details', {
          student,
          promo
        });
      } else {
        console.log('raté 404');
        next();
      }
    } catch(error) {
      console.error('hmm, an error occured:', error);
    }
  }
};