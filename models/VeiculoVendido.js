const db = require('./db');

const VeiculoVendido = db.sequelize.define('veiculosvendidos',{
    VEV_IdVeiculoVendido: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    VEV_IdVeiculo: {
        type: db.Sequelize.INTEGER
    },
    VEV_IdVenda: {
        type: db.Sequelize.INTEGER
    }
},{
    timestamps: false
});

module.exports = VeiculoVendido;