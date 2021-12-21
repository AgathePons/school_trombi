const dataMapper = require('../dataMapper');

module.exports = {
  addStudentPage: async (req, res, next) => {
    if(req.session && req.session.login === 'Nicole') { // if it's Nicole
      try {
        const promos = await dataMapper.getPromos();
        res.render('admin/add_student', {
          promos
        });
      } catch(error) {
        console.error('hmm, an error occured:', error);
      }
    } else if(req.session.login != null) { // if there is a login in session (user is logged)
      res.send(req.session.login + ' you\'re not an admin!');
    } else { // else, user not logged, redirect on login page
      res.redirect('/login');
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