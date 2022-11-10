const express = require('express');
const router = express.Router();
const db = require('../models/db');
const Funcionario = require('../models/Funcionario');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');


// INICIO
    router.get('/registros', (req, res) =>{
        Funcionario.findAll().then((funcionarios)=>{
            res.render('registroFuncionarios', {funcionarios: funcionarios});
        })
    });

    router.get('/cadastrarFuncionarios', (req,res)=>{
        res.render('cadastrarFuncionarios')
    })


// ADICIONAR FUNCIONARIO
    router.post('/addFuncionario', (req,res)=>{

        let nome = req.body.nome;
        let cpf = req.body.cpf
        let email = req.body.email;
        
        
        Funcionario.max('FUN_IdFuncionario').then(function(FUN_IdFuncionario){
            let idFunc = FUN_IdFuncionario+1;
            
            Funcionario.create({
                FUN_IdFuncionario: idFunc,
                FUN_Nome: nome,
                FUN_NumCPF: cpf,
                FUN_NumRG: req.body.rg,
                FUN_DtdNascimento: req.body.dtdNascimento,
                FUN_IdCargo: req.body.cargo,
                FUN_Email: email,
                FUN_Endereco: req.body.endereco,
                FUN_NumEndereco: req.body.numEnd,
                FUN_Bairro: req.body.bairro,
                FUN_Cidade: req.body.cidade,
                FUN_Telefone: req.body.telefone,
                FUN_Sexo: req.body.sexo
            }).then(()=>{
                criarUsuario();
                res.redirect('/home');
            }).catch((erro) =>{
                res.send("Houve um erro: " + erro);
            });

        


            let usuario = email.slice(0,email.indexOf('@'));
            var passw = req.body.cpf;
            let passw2 = String(passw.slice(0,3));
            let senha = passw2 + String(passw.slice(4,7));

            let senhacriptografada = bcrypt.hashSync(senha,10);
            let senhaCrip =  senhacriptografada;
        
        
            
            
            function criarUsuario(){
                Usuario.create({
                    USU_IdUsuario: idFunc,
                    USU_NomeUsuario: usuario,
                    USU_Senha: senhaCrip,
                    USU_IdFuncionario: idFunc,
                    USU_NomeCompleto: nome,
                    USU_Ativo: 1,
                    USU_Email: email
                }).then(()=>{
                    console.log('Usuario Criado com Sucesso!');
                }).catch((erro)=>{
                    console.log("Houve um erro: " +erro);
                })
            }
        });

    });



// SELECIONAR FUNCIONARIO NA LISTA
    router.get('/:codFuncionario', (req,res)=>{
        var dados = req.params;
        Funcionario.findAll({where: {FUN_IdFuncionario: dados.codFuncionario}
        }).then((funcionario)=>{
            res.render('funcionarios', {funcionario: funcionario});
        }).catch((error)=>{
            res.send("Deu Ruim" + error);
        });
    });



// EXLUIR FUNCIONARIO

    router.get('/excluir/:id', (req,res)=>{
        let id = req.params.id
        try{
            Usuario.update({USU_IdFuncionario: null , USU_Ativo: 0}, {where: {USU_IdFuncionario: id}})
            Funcionario.destroy({where:{FUN_IdFuncionario: id}}).then(()=>{
                res.status(201).redirect('../');
            }).catch((error)=>{
                res.status(404).send('Deu Ruim...' + error);
            });
        } catch(error){
            res.status(404).send('Deu Ruim...' + error);
        }
    });


// ALTERAR FUNCIONARIO

router.post('/alterarFuncionario/:id', (req,res)=>{
    let dados = req.body;
    try{
        Funcionario.update({
            FUN_Nome: dados.nome,
            FUN_NumCPF: dados.cpf,
            FUN_NumRG: dados.rg,
            FUN_DtdNascimento: dados.dtdNascimento,
            FUN_Endereco: dados.endereco,
            FUN_NumEndereco: dados.numEnd,
            FUN_Bairro: dados.bairro,
            FUN_Cidade: dados.cidade,
            FUN_Telefone: dados.telefone,
            FUN_Email: dados.email,
            FUN_Sexo: dados.sexo,
            FUN_IdCargo: dados.cargo
        }, {where: {FUN_IdFuncionario: dados.codigo}})
        res.redirect('../../funcionarios/'+dados.codigo);
    } catch(error){
        res.status(404).send('Deu Ruim...' + error);
    }
    
})

    module.exports = router;