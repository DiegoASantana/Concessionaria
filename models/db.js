const Sequelize = require('sequelize');
//Conexão com o banco de dados MySql
const sequelize = new Sequelize('heroku_c61f56fe42d68dc', 'b30ac26808c0a7', 'd0543e7f', {
        host: "us-cdbr-east-06.cleardb.net",
        dialect: 'mysql',
        query:{raw:true}
    });


    

module.exports= {
    Sequelize: Sequelize,
    sequelize: sequelize,
}

