const sequelize = require('./sequelize');

const Lekarze = require('../../model/sequelize/Lekarz');
const Klinika = require('../../model/sequelize/Klinika');
const Zatrudnienie = require('../../model/sequelize/Zatrudnienie');

module.exports = () => {
    Lekarze.hasMany(Zatrudnienie, {
        as: 'zatrudnienie',
        foreignKey: {name: 'lekarzId', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Zatrudnienie.belongsTo(Lekarze, {as: 'lekarze', foreignKey: {name: 'lekarzId', allowNull: false}});
    Klinika.hasMany(Zatrudnienie, {
        as: 'zatrudnienie',
        foreignKey: {name: 'klinikaId', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Zatrudnienie.belongsTo(Klinika, {as: 'klinika', foreignKey: {name: 'klinikaId', allowNull: false}});

    let allLekarze, allKlinika;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Lekarze.findAll();
        })
        .then(lekarze => {
            if (!lekarze || lekarze.length == 0) {
                return Lekarze.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@acme.com'},
                    {firstName: 'Olek', lastName: 'Jegorow', email: 'lekagorow@gmail.com'},
                    {firstName: 'Alex', lastName: 'Stepanenko', email: 'Alekarz@gmail.com'}
                ])
                    .then(() => {
                        return Lekarze.findAll();
                    });
            } else {
                return lekarze;
            }
        })
        .then(lekarze => {
            allLekarze = lekarze;
            return Klinika.findAll();
        })
        .then(klinika => {
            if (!klinika || klinika.length == 0) {
                return Klinika.bulkCreate([
                    {nazwa: 'Sant Jan', adres: 'Kowalski street', specjalizacja: 'Rentgenologia'},
                    {nazwa: 'Sant Olek', adres: 'Jegorow street', specjalizacja: 'Stomatologia'},
                    {nazwa: 'Sant Alex', adres: 'Stepanenko street', specjalizacja: 'Stomatologia'}

                ])
                    .then(() => {
                        return Lekarze.findAll();
                    });
            }else {
                return klinika;
            }
        })
        .then(klinika => {
            allKlinika = klinika;
            return Zatrudnienie.findAll();
        })
        .then(zatrudnienie => {
            if(!zatrudnienie || zatrudnienie.length == 0){
                return Zatrudnienie.bulkCreate([
                    {lekarzId: allLekarze[0]._id, klinikaId: allKlinika[0]._id, salary: 3500, dateFrom: '2000-12-02', dateTo: null},
                    {lekarzId: allLekarze[1]._id, klinikaId: allKlinika[0]._id, salary: 4500, dateFrom: '2000-12-02', dateTo: null},
                    {lekarzId: allLekarze[0]._id, klinikaId: allKlinika[1]._id, salary: 5500, dateFrom: '2000-12-02', dateTo: null}
                ]);
            }else {
                return zatrudnienie;
            }
        });
};
