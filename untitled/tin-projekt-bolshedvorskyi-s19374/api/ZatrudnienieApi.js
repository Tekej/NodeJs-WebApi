const ZatrudnienieRepository = require('../repository/sequelize/ZatrudnienieRepository');
const {then} = require("pg/lib/native/query");
const e = require("express");
const Console = require("console");

exports.getZatrudnienie = (req, res, next) => {
    ZatrudnienieRepository.getZatrudnienie()
        .then(zatrudnienie => {
            res.status(200).json(zatrudnienie);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getZatrudnienieById = (req, res, next) => {
    const zatrudnienieId = req.params.zatrudnienieId;
    ZatrudnienieRepository.getZatrudnienieById(zatrudnienieId)
        .then(zatrudnienie => {
            if(!zatrudnienie){
                res.status(404).json({
                    message: 'Zatrudnienie with id: '+ zatrudnienieId +' not found'
                })
            }else {
                res.status(200).json(zatrudnienie);
            }
        });
};

exports.createZatrudnienie = (req, res, next) => {
    ZatrudnienieRepository.createZatrudnienie(req.body)
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

exports.updateZatrudnienie = (req, res, next) => {
    const zatrudnienieId = req.params.zatrudnienieId;
    ZatrudnienieRepository.updateZatrudnienie(zatrudnienieId, req.body)
        .then(result => {
            res.status(200).json({message: 'Zatrudnienie updated!', zatrudnienie: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteZatrudnienie = (req, res, next) => {
    const zatrudnienieId = req.params.zatrudnienieId;
    ZatrudnienieRepository.deleteZatrudnienie(zatrudnienieId)
        .then(result => {
            res.status(200).json({message: 'Removed zatrudnienie', lek: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next.statusCode(err);
        });
};

