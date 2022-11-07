const db = require('./db');

const Modelo = db.sequelize.define('modelos',{
    MOD_IdModelo: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    MOD_IdMarca: {
        type: db.Sequelize.STRING
    },
    MOD_Modelo: {
        type: db.Sequelize.STRING
    }
},{
    timestamps: false
});

module.exports = Modelo;