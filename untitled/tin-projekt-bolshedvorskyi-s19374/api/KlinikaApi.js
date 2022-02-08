const KlinikaRepository = require('../repository/sequelize/KlinikaRepository');
const {then} = require("pg/lib/native/query");
const e = require("express");
const Console = require("console");

exports.getKlinika = (req, res, next) => {
    KlinikaRepository.getKlinika()
        .then(klinika => {
            res.status(200).json(klinika);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getKlinikaById = (req, res, next) => {
    const klinikaId = req.params.klinikaId;
    KlinikaRepository.getKlinikaById(klinikaId)
        .then(klinika => {
            if(!klinika){
                res.status(404).json({
                    message: 'Klinika with id: '+ klinikaId +' not found'
                })
            }else {
                res.status(200).json(klinika);
            }
        });
};

exports.createKlinika = (req, res, next) => {
    KlinikaRepository.createKlinika(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateKlinika = (req, res, next) => {
    const klinikaId = req.params.klinikaId;
    KlinikaRepository.updateKlinika(klinikaId, req.body)
        .then(result => {
            res.status(200).json({message: 'Klinika updated!', klinika: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteKlinika = (req, res, next) => {
    const klinikaId = req.params.klinikaId;
    KlinikaRepository.deleteKlinika(klinikaId)
        .then(result => {
            res.status(200).json({message: 'Removed klinika', klinika: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next.statusCode(err);
        });
};

