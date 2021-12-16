const promos = require('../../data/promos.json');
const students = require('../../data/students.json');

module.exports = {
  list: (req, res, next) => {
    console.log('id de la promo:', req.params.id);
    const promoId = Number(req.params.id);

    const promo = promos.find((p) => {
      return p.id === promoId;
    });

    if (promo) {
      const studentsOfPromo = students.filter(student => {
        return student.promo === promoId;
      });
      console.log(promo);
      res.render('students/list', {
        students: studentsOfPromo,
        promo
      });
    } else {
      next();
    }
  },
};