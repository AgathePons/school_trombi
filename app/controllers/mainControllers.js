module.exports = {
  home: (req, res) => {
    // create a cookie
    //res.cookie('ecritCoteServer', 'Miam');
    console.log(req.headers.cookie);
    console.log('SESSION LOGIN:', req.session.login);
    console.log('REQ.SESSION:', req.session);
    const loginUser = req.session.login;
    res.render('home', {
      loginUser
    });
  }
};