const db = require('./db');


const Cliente = db.sequelize.define('clientes', {
    CLI_IdCliente: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    CLI_Nome: {
        type: db.Sequelize.STRING
    },
    CLI_NumCPF: {
        type: db.Sequelize.STRING
    },
    CLI_NumRG: {
        type: db.Sequelize.STRING
    },
    CLI_DtdNascimento: {
        type: db.Sequelize.DATE
    },
    CLI_Email: {
        type: db.Sequelize.STRING
    },
    CLI_Telefone: {
        type: db.Sequelize.STRING
    },
    CLI_Endereco: {
        type: db.Sequelize.STRING
    },
    CLI_NumEndereco: {
        type: db.Sequelize.STRING
    },
    CLI_Bairro: {
        type: db.Sequelize.STRING
    },
    CLI_Cidade: {
        type: db.Sequelize.STRING
    }
},{
    timestamps: false
})

module.exports = Cliente;