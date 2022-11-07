const db = require('./db');

const Marca = db.sequelize.define('marcas',{
    MAR_IdMarca: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    MAR_Marca: {
        type: db.Sequelize.STRING
    }
},{
    timestamps: false
});

module.exports = Marca;