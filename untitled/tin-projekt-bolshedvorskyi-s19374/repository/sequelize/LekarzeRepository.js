const Lekarze = require('../../model/sequelize/Lekarz');
const Klinika = require('../../model/sequelize/Klinika');
const Zatrudnienie = require('../../model/sequelize/Zatrudnienie');

exports.getLekarze = () => {
    return Lekarze.findAll();
};

exports.getLekarzeById = (lekarzId) => {
    return Lekarze.findByPk(lekarzId,
        {
            include: [{
                model: Zatrudnienie,
                as: 'zatrudnienie',
                include: [{
                    model: Klinika,
                    as: 'klinika'
                }]
            }]
        });
};

exports.createLekarz = (newLekarzData) => {
    return Lekarze.create({
        firstName: newLekarzData.firstName,
        lastName: newLekarzData.lastName,
        email: newLekarzData.email
    })
}

exports.updateLekarz = (lekarzId, lekarzData) => {
    return Lekarze.update(lekarzData, {where: {_id: lekarzId}});
};


exports.deleteLekarz = (lekarzId) => {
    return Lekarze.destroy({
        where: {_id: lekarzId}
    });
};
