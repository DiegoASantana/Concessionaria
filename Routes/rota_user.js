const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Funcionario = require('../models/Funcionario');
const bcrypt = require('bcrypt');




router.get('/', (req, res) =>{
    if(req.session.usu){
        res.render('index')

    }else{
        res.render('index');
    }
});
/*
router.get('/:user', (req, res) =>{

    if(req.query.user == 5){
        res.redirect('home')

    }else{
        res.render('index');
    }
});
*/

router.post('/', (req,res)=>{
    let usu = req.body.usuario;
    let senha = req.body.senha;
    Usuario.findAll({where: {'USU_NomeUsuario': usu}}).then((result)=>{
        console.log(result);
        console.log(result[0].USU_Senha);
        if(result.length > 0){
                const same = bcrypt.compareSync(senha, result[0].USU_Senha);
                if(same){
                    if(result[0].USU_Ativo == 1){
                        req.session.usu = usu;
                        let idFunc = result[0].USU_IdFuncionario;
                        console.log(idFunc)
                        res.redirect('/home?user='+ idFunc)
                    }else{
                        res.send({message: "Este Usuário Encontra-se Desativado"})
                    }    
                }else{
                    console.log("Senha no banco: " +result[0].USU_Senha + " não confere com senha colocada: " +senha);
                    return res.send({message: 'Senha não confere'});
                } 
        }else{
           res.send({message: "Usuário não Cadastrado"})
        }
    })

    
    

});

router.get('/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/');
})



module.exports = router;