// Le rôle du dataMapper est de respecter la SOC: les requêtes SQL ici, la gestion de la requête dans le controller
const client = require("./dbClient");

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
  }
};

module.exports = dataMapper;