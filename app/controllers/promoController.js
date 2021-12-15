const promos = require('../../data/promos.json');

module.exports = {
    list: (req, res) => {
        res.render('promos/list',  {
            promos
        });
    },
    details: (req, res) => {
        res.render('promos/details', {
            promos
        })
    },
};