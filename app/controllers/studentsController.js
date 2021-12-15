//const promos = require('../../data/promos.json');
const students = require('../../data/students.json');

module.exports = {
  list: (req, res) => {
    console.log('id de la promo:',req.params.id);
    const promoId = req.params.id;
    const studentsOfPromo = students.filter(student => {
      return student.promo == promoId;
    });
    console.log(studentsOfPromo.length);
    res.render('students/list', {
      studentsOfPromo
    });
  },
};