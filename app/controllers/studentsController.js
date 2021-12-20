const dataMapper = require('../dataMapper');

module.exports = {
  allList: async (req, res, next) => {
    try {
      const students = await dataMapper.getStudents();
      res.render('students/allStudents', {
        students
      });
    } catch (error) {
      console.error('hmm, an error occured:', error);
    }
  },
  list: async (req, res, next) => {
    const id = req.params.id;
    try {
      //const resultatPromo = await client.query(queryPromo);
      const promo = await dataMapper.getPromoById(id);
      //console.log(promo);
      if (promo) {
        const students = await dataMapper.getStudentsByPromoId(id);
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
    try {
      const student = await dataMapper.getStudentById(id);
      if (student) {
        const promo = await dataMapper.getPromoById(student.promo_id);
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