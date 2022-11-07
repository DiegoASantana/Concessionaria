const db = require('./db');

const Veiculo = db.sequelize.define('veiculos', {
    VEI_IdVeiculo: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    VEI_Marca: {
        type: db.Sequelize.STRING
    },
    VEI_Modelo: {
        type: db.Sequelize.STRING
    },
    VEI_NumRenavam: {
        type: db.Sequelize.INTEGER
    },
    VEI_Placa: {
        type: db.Sequelize.STRING
    },
    VEI_Ano: {
        type: db.Sequelize.INTEGER
    },
    VEI_Cor: {
        type: db.Sequelize.STRING
    },
    VEI_Valor: {
        type: db.Sequelize.FLOAT
    },
    VEI_Novo: {
        type: db.Sequelize.BOOLEAN
    },
    VEI_Km: {
        type: db.Sequelize.INTEGER
    },
    VEI_Combustivel: {
        type: db.Sequelize.STRING
    },
    VEI_Disponibilidade: {
        type: db.Sequelize.BOOLEAN
    },
    VEI_Observacoes: {
        type: db.Sequelize.TEXT
    }

    
},{
    timestamps: false
})

module.exports = Veiculo;