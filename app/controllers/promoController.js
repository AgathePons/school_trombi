const promos = require('../../data/promos.json');

module.exports = {
  list: (req, res) => {
    res.render('promos/list', {
      promos
    });
  },
  details: (req, res, next) => {
    const id = req.params.id;

    //version "boucle"
    //let promo;
    // for (const p of promos) {
    //   if (p.id === Number(id)) {
    //     promo = p;
    //     break;
    //   }
    // }

    //version array.find
    const promo = promos.find((p) => {
      // Number() et parseInt() quasi pareil (ES6 / ES5)
      return p.id === Number(id);
    });

    //version one line
    //promo = promos.find(p => p.id === Number(id));

    if (promo) {
      res.render('promos/details', {
        promo
      });
    } else {
      console.log('raté 404');
      next();
    }
  },
};