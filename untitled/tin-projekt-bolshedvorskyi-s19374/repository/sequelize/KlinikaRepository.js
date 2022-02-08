const Lekarze = require('../../model/sequelize/Lekarz');
const Klinika = require('../../model/sequelize/Klinika');
const Zatrudnienie = require('../../model/sequelize/Zatrudnienie');

exports.getKlinika = () => {
    return Klinika.findAll();
};

exports.getKlinikaById = (klinikaId) =>{
    return Klinika.findByPk(klinikaId,
        {
            include: [{
                model: Zatrudnienie,
                as: 'zatrudnienie',
                include: [{
                    model: Lekarze,
                    as: 'lekarze'
                }]
            }]
        });
};

exports.createKlinika = (newKlinikaData) => {
    return Klinika.create({
        nazwa: newKlinikaData.nazwa,
        adres: newKlinikaData.adres,
        specjalizacja: newKlinikaData.specjalizacja
    });
};

exports.updateKlinika = (klinikaId, klinikaData) => {
    const nazwa = klinikaData.nazwa;
    const adres = klinikaData.adres;
    const specjalizacja = klinikaData.specjalizacja;
    return Klinika.update(klinikaData, {where: {_id: klinikaId}});
};


exports.deleteKlinika = (klinikaId) => {
    return Klinika.destroy ({
        where: { _id: klinikaId }
    });
};
