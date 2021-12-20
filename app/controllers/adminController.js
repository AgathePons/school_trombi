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
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const githubUsername = req.body.github_username;
    const promoID = req.body.promo;
    try {
      await dataMapper.addStudent(firstName, lastName, githubUsername, promoID);
      const promo = await dataMapper.getPromoById(promoID); 
      if(promo) {
        res.render('promos/details', {
          promo
        });
      } else {
        console.log('raté 404');
        next();
      }
    } catch (error) {
      console.error('OOOOOPSIII', error);
    }
  }
};