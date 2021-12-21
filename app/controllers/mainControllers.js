module.exports = {
  home: (req, res) => {
    res.cookie('ecritCoteServer', 'Miam');
    console.log(req.headers.cookie);
    res.render('home');
  }
};