module.exports = {
  // display login form
  showLogin: (req, res) => {
    res.render('auth/login');
  },
  // handle connexion
  postLogin: (req, res) => {
    const userLogin = req.body.login;
    if (userLogin === 'azerty') {
      req.session.login = 'Michel';
    } else if (userLogin === '123456') {
      req.session.login = 'Nicole';
    }
    console.log(`>>>>>> Hello ${req.session.login}`);
    res.redirect('/');
  }
};