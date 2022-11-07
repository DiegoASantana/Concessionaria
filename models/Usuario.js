const db = require('./db');

const Usuario = db.sequelize.define('usuarios', {
    USU_IdUsuario: {
        type: db.Sequelize.STRING,
        primaryKey: true
    },
    USU_NomeUsuario: {
        type: db.Sequelize.STRING
    },
    USU_Senha: {
        type: db.Sequelize.STRING
    },
    USU_IdFuncionario: {
        type: db.Sequelize.INTEGER
    },
    USU_NomeCompleto: {
        type: db.Sequelize.STRING
    },
    USU_Ativo: {
        type: db.Sequelize.BOOLEAN
    },
    USU_Email: {
        type: db.Sequelize.STRING
    }
},{
    timestamps: false
})

module.exports = Usuario;