const promos = require('../../data/promos.json');
const students = require('../../data/students.json');

module.exports = {
  list: (req, res) => {
    console.log('id de la promo:',req.params.id);
    const promoId = Number(req.params.id);
    const studentsOfPromo = students.filter(student => {
      return student.promo === promoId;
    });
    const currentPromo = promos.filter(promo => {
      return promo.id === promoId;
    });
    const promoName = currentPromo[0].name;
    console.log(promoName);
    res.render('students/list', {
      studentsOfPromo,
      promoName
    });
  },
};