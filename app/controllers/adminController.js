const dataMapper = require('../dataMapper');

module.exports = {
  addStudentPage: async (req, res, next) => {
    try {
      const promos = await dataMapper.getPromos();
      res.render('admin/add_student', {
        promos
      });
    } catch (error) {
      console.error('hmm, an error occured:', error);
    }
  },
  addStudent: async (req, res, next) => {
    console.log('take my body:',req.body);
    const promo = req.body.promo;
    try {
      const result = await dataMapper.addStudent(req.body);
      if(result) {
        res.redirect(`/promos/${promo}/students`);
      } else {
        console.log('raté 500');
        return res.status(500).send('Huum, aucun enregistrement créé...');
      }
    } catch (error) {
      console.error('OOOOOPSIII', error);
    }
  }
};