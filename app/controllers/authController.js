module.exports = {
  // display login form
  showLogin: (req, res) => {
    res.render('auth/login');
  },
  // handle connexion
  postLogin: (req, res) => {
    const userLogin = req.body.login;
    if (userLogin === 'azerty') {
      console.log('hello Michel');
      req.session.login = 'Michel';
    } else if (userLogin === '123456') {
      console.log('hello Nicole');
      req.session.login = 'Nicole';
    }
    res.redirect('/');
  }
};