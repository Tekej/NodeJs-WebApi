const Sequelize = require('sequelize');
const Lekarze = require('../../model/sequelize/Lekarz');
const Klinika = require('../../model/sequelize/Klinika');
const Zatrudnienie = require('../../model/sequelize/Zatrudnienie');

exports.getZatrudnienie = () => {
    return Zatrudnienie.findAll({
        include: [
            {
                model: Lekarze,
                as: 'lekarze'
            },
            {
                model: Klinika,
                as: 'klinika'
            }]
    });
};

exports.getZatrudnienieById = (zatrudnienieId) => {
    return Zatrudnienie.findByPk(zatrudnienieId,
        {
            include: [
        {
            model: Lekarze,
            as: 'lekarze'
        },
        {
            model: Klinika,
            as: 'klinika'
        }]
    });
};

exports.createZatrudnienie = (newZatrudnienieData) => {
    return Zatrudnienie.create({
        lekarzId: newZatrudnienieData.lekarzId,
        klinikaId: newZatrudnienieData.klinikaId,
        salary: newZatrudnienieData.salary,
        dateFrom: newZatrudnienieData.dateFrom,
        dateTo: newZatrudnienieData.dateTo
    });
};

exports.updateZatrudnienie = (zatrudnienieId, data) => {
    return Zatrudnienie.update(data, {where: {_id: zatrudnienieId}});
}

exports.deleteZatrudnienie = (zatrudnienieId) => {
    return Zatrudnienie.destroy({
        where: {_id: zatrudnienieId}
    });
}

exports.deleteManyZatrudnienie = (zatrudnienieIds) => {
    return Zatrudnienie.find({ _id: { [Sequelize.Op.in]: zatrudnienieIds}})
}