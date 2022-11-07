const db = require('./db');


const Venda = db.sequelize.define('vendas',{
    VEN_IdVenda:{
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    VEN_IdFunc:{
        type: db.Sequelize.INTEGER
    },
    VEN_IdCliente:{
        type: db.Sequelize.INTEGER
    },
    VEN_DtdVenda:{
        type: db.Sequelize.DATE
    },
    VEN_IdVeiculo:{
        type: db.Sequelize.INTEGER
    },
    VEN_NumNotaFiscal:{
        type: db.Sequelize.INTEGER
    },
    VEN_ValorTotal:{
        type: db.Sequelize.FLOAT
    },
    VEN_Financiamento:{
        type: db.Sequelize.BOOLEAN
    },
    VEN_ValorFinan:{
        type: db.Sequelize.FLOAT
    },
    VEN_QtdParcela:{
        type: db.Sequelize.INTEGER
    },
    VEN_ValorParcela:{
        type: db.Sequelize.FLOAT
    },
    VEN_ValorEntrada:{
        type: db.Sequelize.FLOAT
    }
},{
    timestamps: false
});

module.exports = Venda;