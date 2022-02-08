const LekarzeRepository = require('../repository/sequelize/LekarzeRepository');
const {then} = require("pg/lib/native/query");
const e = require("express");
const Console = require("console");

exports.getLekarze = (req, res, next) => {
    LekarzeRepository.getLekarze()
        .then(lekarze => {
            res.status(200).json(lekarze);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLekarzeById = (req, res, next) => {
    const lekarzId = req.params.lekarzId;
    LekarzeRepository.getLekarzeById(lekarzId)
    .then(lekarz => {
        if(!lekarz){
            res.status(404).json({
                message: 'Lekarz with id: '+ lekarzId +' not found'
            })
        }else {
            res.status(200).json(lekarz);
        }
    });
};

exports.createLekarz = (req, res, next) => {
    LekarzeRepository.createLekarz(req.body)
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

exports.updateLekarz = (req, res, next) => {
    const lekarzId = req.params.lekarzId;
    LekarzeRepository.updateLekarz(lekarzId, req.body)
        .then(result => {
            res.status(200).json({message: 'Lekarz updated!', lekarz: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteLekarze = (req, res, next) => {
    const lekarzId = req.params.lekarzId;
    LekarzeRepository.deleteLekarz(lekarzId)
        .then(result => {
            res.status(200).json({message: 'Removed lekarz', lek: result});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next.statusCode(err);
        });
};

