// Le rôle du dataMapper est de respecter la SOC: les requêtes SQL ici, la gestion de la requête dans le controller
const client = require('./dbClient');

const dataMapper = {
  getPromos: async () => {
    const queryPromos = 'SELECT * FROM "promo";';
    return (await client.query(queryPromos)).rows;
  },
  getPromoById: async (id) => {
    const queryPromo = `SELECT * FROM "promo" WHERE "id"=${id}`;
    return (await client.query(queryPromo)).rows[0];
  },
  getStudents: async () => {
    const queryStudents = 'SELECT * FROM "student";';
    return (await client.query(queryStudents)).rows;
  },
  getStudentById: async (id) => {
    const queryStudent = `SELECT * FROM "student" WHERE "id"=${id}`;
    return (await client.query(queryStudent)).rows[0];
  },
  getStudentsByPromoId: async (id) => {
    const queryStudents = `SELECT * FROM "student" WHERE "promo_id"=${id}`;
    return (await client.query(queryStudents)).rows;
  },
  addStudent: async (studentInfos) => {
    // it is the standard to 
    // destructuration of the req.body object with just what we need
    const {
      first_name,
      last_name,
      github_username,
      promo
    } = studentInfos;
    // to avoid some issues, + sql injection, thanks to pg, we split the request and the VALUES
    // https://node-postgres.com/features/queries
    const queryAddStudent = 'INSERT INTO student ( "first_name", "last_name", "github_username", "profile_picture_url", "promo_id" ) VALUES ($1, $2, $3, $4, $5);';
    // --> has to respect the order of $x
    const values = [first_name, last_name, github_username, `https://github.com/${github_username}.png`, Number(promo)];

    return (await client.query(queryAddStudent, values));
  }
};

module.exports = dataMapper;