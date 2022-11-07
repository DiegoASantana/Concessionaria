const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Funcionario = require('../models/Funcionario');
const bcrypt = require('bcrypt');
const transporter = require('../models/email');




router.get('/', (req, res) =>{
    if(req.session.usu){
        res.render('index')

    }else{
        res.render('index');
    }
});

router.get('/:user', (req, res) =>{

    if(req.query.user == 5){
        res.redirect('home')

    }else{
        res.render('index');
    }
});


router.post('/', (req,res)=>{
    let usu = req.body.usuario;
    let senha = req.body.senha;
    Usuario.findAll({where: {'USU_NomeUsuario': usu}}).then((result)=>{
        console.log(result);
        console.log(result[0].USU_Senha);
        if(result.length > 0){
                const same = bcrypt.compareSync(senha, result[0].USU_Senha);
                if(same){
                    console.log(result[0].USU_IdFuncionario);

                    req.session.usu = usu;
                    validaCargo(result[0].USU_IdFuncionario);
                    
                }else{
                    console.log("Senha no banco: " +result[0].USU_Senha + " não confere com senha colocada: " +senha);
                    return res.send({message: 'Senha não confere'});
                } 
        }else{
           res.send({message: "Usuário não Cadastrado"})
        }
    })

    function validaCargo(idFunc){
        Funcionario.findAll({where: {FUN_IdFuncionario: idFunc}}).then((resultFUN)=>{
            console.log("Cargo ID: ", resultFUN[0].FUN_IdCargo);
            res.render(`home`, {result: resultFUN});
        });

    }

});

router.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/index');
})



module.exports = router;