const LekarzeRepository = require("../repository/sequelize/LekarzeRepository");
const KlinikaRepository = require("../repository/sequelize/KlinikaRepository");
const ZatrudnienieRepository = require("../repository/sequelize/ZatrudnienieRepository");


exports.showZatrudnienieList = (req, res, next) => {
    ZatrudnienieRepository.getZatrudnienie().then(zatrudnienie => {
        res.render('pages/zatrudnienie/zatrudnienie-list', {
            zatrudnienie: zatrudnienie,
            navLocation: 'zatrudnienie'
        });
    });
};
exports.showZatrudnienieAdd = (req, res, next) => {
    let allLekarze, allKlinika;
    ZatrudnienieRepository.getZatrudnienie()
        .then(zatrudnienie => {
            allZatrudnienie = zatrudnienie;
            return LekarzeRepository.getLekarze();
        })
        .then(lekarze => {
            allLekarze = lekarze;
            return KlinikaRepository.getKlinika();
        })
        .then(kli => {
            allKlinika = kli;
            res.render('pages/zatrudnienie/form', {
                zatrudnienie: {},
                allLekarze: allLekarze,
                allKlinika: allKlinika,
                pageTitle: 'Nowa informacja zatrudnienia',
                formMode: 'CreateNew',
                btnLabel: 'Dodaj zatrudnienie',
                formAction: '/zatrudnienie/add',
                navLocation: 'zatrudnienie',
                validationErrors: []
            });
        })

};
exports.showZatrudnienieEdit = (req, res, next) => {
    const zatrudnienieId = req.params.zatId;
    let allLekarze, allKlinika, allZatrudninie;

    ZatrudnienieRepository.getZatrudnienie()
        .then(zatrudnienie => {
            allZatrudninie = zatrudnienie;
            return LekarzeRepository.getLekarze();
        })
        .then(lekarze => {
            allLekarze = lekarze;
            return KlinikaRepository.getKlinika();
        })
        .then(klinika => {
            allKlinika = klinika
            return ZatrudnienieRepository.getZatrudnienieById(zatrudnienieId);
        })
        .then(zatrudnienie => {
            console.log(zatrudnienieId);
            res.render('pages/zatrudnienie/form', {
                zatrudnienie: zatrudnienie,
                allLekarze:allLekarze,
                allKlinika:allKlinika,
                allZatrudninie:allZatrudninie,
                formMode: 'edit',
                pageTitle: 'Edycja Zatrudnienia',
                btnLabel: 'Edytuj zatrudnienia',
                formAction: '/zatrudnienie/edit',
                navLocation: 'zatrudnienie',
                validationErrors: []
            });
        });
};
exports.showZatrudnienieDetails = (req, res, next) => {
    const zatrudnienieId = req.params.zatId;
    let allLekarze, allKlinika;
    LekarzeRepository.getLekarze()
        .then(lek => {
            allLekarze = lek;
            return KlinikaRepository.getKlinika();
        })
        .then(kli => {
            allKlinika = kli;
            return ZatrudnienieRepository.getZatrudnienieById(zatrudnienieId);
        })
        .then(zatrudnienie => {
            res.render('pages/zatrudnienie/form', {
                zatrudnienie: zatrudnienie,
                allLekarze: allLekarze,
                allKlinika: allKlinika,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły zatrudnienia',
                formAction: '',
                navLocation: 'zatrudnienie',
                validationErrors: []
            });
        });
};
exports.addZatrudnienie = (req, res, next) => {
    let allLekarze, allKlinika, error;
    const zatrudnienieData = {...req.body};
    ZatrudnienieRepository.createZatrudnienie(zatrudnienieData)
        .then(result => {
            res.redirect('/zatrudnienie');
        }).catch(err => {
            error = err;
        return LekarzeRepository.getLekarze();
    }).then(lek => {
        allLekarze = lek;
        return KlinikaRepository.getKlinika();
    })
        .then(kli => {
            allKlinika = kli;
            if(error!=null){
            res.render('pages/zatrudnienie/form', {
                zatrudnienie: zatrudnienieData,
                allLekarze:allLekarze,
                allKlinika:allKlinika,
                pageTitle: 'Nowa informacja zatrudnienia',
                formMode: 'createNew',
                btnLabel: 'Dodaj zatrudnienie',
                formAction: '/zatrudnienie/add',
                navLocation: 'zatrudnienie',
                validationErrors: error.errors
            });
            }else{
                res.render('pages/zatrudnienie/form', {
                    zatrudnienie: zatrudnienieData,
                    allLekarze:allLekarze,
                    allKlinika:allKlinika,
                    pageTitle: 'Nowa informacja zatrudnienia',
                    formMode: 'createNew',
                    btnLabel: 'Dodaj zatrudnienie',
                    formAction: '/zatrudnienie/add',
                    navLocation: 'zatrudnienie',
                    validationErrors: []
                });
            }
        });
}

exports.updateZatrudnienie = (req, res, next) => {
    const zatrudnienieId = req.body._id;
    let allLekarze, allKlinika, error;
    const zatrudnienieData = { ...req.body };

    ZatrudnienieRepository.updateZatrudnienie(zatrudnienieId, zatrudnienieData)
        .then(result => {
            res.redirect('/zatrudnienie');
        })
        .catch(err => {
            error = err;
            return LekarzeRepository.getLekarze();
        })
        .then(lek => {
            allLekarze = lek;
            return KlinikaRepository.getKlinika();
        })
        .then(kli => {
            allKlinika = kli;
            return ZatrudnienieRepository.getZatrudnienieById(zatrudnienieId);
        })
        .then(zatrudnienie => {
            if(error!=null){
                res.render('pages/zatrudnienie/form', {
                    zatrudnienie: zatrudnienie,
                    allLekarze: allLekarze,
                    allKlinika: allKlinika,
                    pageTitle: 'Edycja zatrudnienia',
                    formMode: 'edit',
                    btnLabel: 'Edytuj zatrudnienia',
                    formAction: '/zatrudnienie/edit',
                    navLocation: 'zatrudnienie',
                    validationErrors: error.errors
                });
            }else{
                res.render('pages/zatrudnienie/form', {
                    zatrudnienie: zatrudnienie,
                    allLekarze: allLekarze,
                    allKlinika: allKlinika,
                    pageTitle: 'Edycja zatrudnienia',
                    formMode: 'edit',
                    btnLabel: 'Edytuj zatrudnienia',
                    formAction: '/zatrudnienie/edit',
                    navLocation: 'zatrudnienie',
                    validationErrors: []
                });
            }
        });
};
exports.deleteZatrudnienie = (req, res, next) => {
    const zatrudnienieId = req.params.zatId;
    ZatrudnienieRepository.deleteZatrudnienie(zatrudnienieId)
        .then(result => {
            res.redirect('/zatrudnienie');
        });
};
