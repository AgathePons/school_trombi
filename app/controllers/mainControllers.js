module.exports = {
  home: (req, res) => {
    // create a cookie
    //res.cookie('ecritCoteServer', 'Miam');
    console.log(req.headers.cookie);
    res.render('home');
  }
};