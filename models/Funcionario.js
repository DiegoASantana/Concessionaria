const db = require('./db');


const Funcionario = db.sequelize.define('funcionarios', {
    FUN_IdFuncionario: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    FUN_Nome: {
        type: db.Sequelize.STRING
    },
    FUN_NumCPF: {
        type: db.Sequelize.STRING
    },
    FUN_NumRG: {
        type: db.Sequelize.STRING
    },
    FUN_DtdNascimento: {
        type: db.Sequelize.DATE
    },
    FUN_IdCargo: {
        type: db.Sequelize.INTEGER
    },
    FUN_Email: {
        type: db.Sequelize.STRING
    },
    FUN_Endereco: {
        type: db.Sequelize.STRING
    },
    FUN_NumEndereco: {
        type: db.Sequelize.STRING
    },
    FUN_Bairro: {
        type: db.Sequelize.STRING
    },
    FUN_Cidade: {
        type: db.Sequelize.STRING
    },
    FUN_Telefone: {
        type: db.Sequelize.STRING
    },
    FUN_Sexo: {
        type: db.Sequelize.STRING
    },
    FUN_Situacao: {
        type: db.Sequelize.STRING
    }
},{
    timestamps: false
})

module.exports = Funcionario;