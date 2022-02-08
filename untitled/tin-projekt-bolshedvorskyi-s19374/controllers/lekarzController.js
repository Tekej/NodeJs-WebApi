const LekarzeRepository = require("../repository/sequelize/LekarzeRepository");

exports.showLekarzList = (req, res, next) => {
    LekarzeRepository.getLekarze().then(lekarze => {
        res.render('pages/lekarz/lekarz-list', {
            lekarze: lekarze,
            navLocation: 'lekarz'
        });
    });
};
exports.showLekarzAdd = (req, res, next) => {
    res.render('pages/lekarz/form', {
        lekarz: {},
        pageTitle: 'Nowy Lekarz',
        formMode: 'CreateNew',
        btnLabel: 'Dodaj lekarza',
        formAction: '/lekarz/add',
        navLocation: 'lekarz',
        validationErrors: []
    });
};
exports.showLekarzEdit = (req, res, next) => {
    const lekarzId = req.params.lekId;
    LekarzeRepository.getLekarzeById(lekarzId)
        .then(lekarz => {
            res.render('pages/lekarz/form', {
                lekarz: lekarz,
                formMode: 'edit',
                pageTitle: 'Edycja Lekarza',
                btnLabel: 'Edytuj Lekarza',
                formAction: '/lekarz/edit',
                navLocation: 'lekarz',
                validationErrors: []
            });
        });
};
exports.showLekarzDetails = (req, res, next) => {
    const lekarzId = req.params.lekId;
    LekarzeRepository.getLekarzeById(lekarzId)
        .then(lekarz => {
            res.render('pages/lekarz/form', {
                lekarz: lekarz,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły pracownika',
                formAction: '',
                navLocation: 'lekarz',
                validationErrors: []
            });
        });
};

exports.addLekarz = (req, res, next) => {
    const lekarzData = {...req.body};
    LekarzeRepository.createLekarz(lekarzData)
        .then(result => {
            res.redirect('/lekarz');
        }).catch(err => {

            res.render('pages/lekarz/form',{
                lekarz: lekarzData,
                pageTitle: 'Nowy lekarz',
                formMode: 'createNew',
                btnLabel: 'Dodaj lekarza',
                formAction: '/lekarz/add',
                navLocation: 'lekarz',
                validationErrors: err.errors
            });
    });
};
exports.updateLekarz = (req, res, next) => {
    const lekarzId = req.body._id;
    const lekarzData = {...req.body};
    LekarzeRepository.updateLekarz(lekarzId, lekarzData)
        .then(result => {
            res.redirect('/lekarz');
        }).catch(err => {
        res.render('pages/lekarz/form',{
            lekarzId: lekarzId,
            lekarz: lekarzData,
            pageTitle: 'Edycja lekarza',
            formMode: 'edit',
            btnLabel: 'Edytuj lekarza',
            formAction: '/lekarz/edit',
            navLocation: 'lekarz',
            validationErrors: err.errors
        });
    });

};
exports.deleteLekarz = (req, res, next) => {
    const lekarzId = req.params.lekId;
    LekarzeRepository.deleteLekarz(lekarzId)
        .then(() => {
            res.redirect('/lekarz');
        });
};