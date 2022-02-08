const KlinikaRepository = require("../repository/sequelize/KlinikaRepository");
const LekarzeRepository = require("../repository/sequelize/LekarzeRepository");

exports.showKlinikaList = (req, res, next) => {
    KlinikaRepository.getKlinika().then(klinika => {
        res.render('pages/klinika/klinika-list', {
            klinika: klinika,
            navLocation: 'klinika'
        });
    });
};
exports.showKlinikaAdd = (req, res, next) => {
    res.render('pages/klinika/form', {
        klinika: {},
        pageTitle: 'Nowa Klinika',
        formMode: 'CreateNew',
        btnLabel: 'Dodaj kliniku',
        formAction: '/klinika/add',
        navLocation: 'klinika',
        validationErrors: []
    });
};
exports.showKlinikaEdit = (req, res, next) => {
    const klinikaId = req.params.kliId;
    KlinikaRepository.getKlinikaById(klinikaId)
        .then(klinika => {
            res.render('pages/klinika/form', {
                klinika: klinika,
                formMode: 'edit',
                pageTitle: 'Edycja Kliniki',
                btnLabel: 'Edytuj Kliniku',
                formAction: '/klinika/edit',
                navLocation: 'klinika',
                validationErrors: []
            });
        });
};
exports.showKlinikaDetails = (req, res, next) => {
    const klinikaId = req.params.kliId;
    KlinikaRepository.getKlinikaById(klinikaId)
        .then(klinika => {
            res.render('pages/klinika/form', {
                klinika: klinika,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły pracownika',
                formAction: '',
                navLocation: 'klinika',
                validationErrors: []
            });
        });
};
exports.addKlinika = (req, res, next) => {
    const klinikaData = { ...req.body };
    KlinikaRepository.createKlinika(klinikaData)
        .then(result => {
            res.redirect('/klinika');
        }).catch(err => {
        res.render('pages/klinika/form',{
            klinika: klinikaData,
            pageTitle: 'Nowa klinika',
            formMode: 'createNew',
            btnLabel: 'Dodaj kliniku',
            formAction: '/klinika/add',
            navLocation: 'klinika',
            validationErrors: err.errors
        });
    });
};
exports.updateKlinika = (req, res, next) => {
    const klinikaId = req.body._id;

    const klinikaData = { ...req.body };
    KlinikaRepository.updateKlinika(klinikaId, klinikaData)
        .then( result => {
            res.redirect('/klinika');
        })
        .catch(err => {
        res.render('pages/klinika/form',{
            klinikaId: klinikaId,
            klinika: klinikaData,
            pageTitle: 'Edycja kliniki',
            formMode: 'edit',
            btnLabel: 'Edytuj kliniki',
            formAction: '/klinika/edit',
            navLocation: 'klinika',
            validationErrors: err.errors
        });
    });

};
exports.deleteKlinika = (req, res, next) => {
    const klinikaId = req.params.kliId;
    KlinikaRepository.deleteKlinika(klinikaId)
        .then( result => {
            res.redirect('/klinika');
        });
};

