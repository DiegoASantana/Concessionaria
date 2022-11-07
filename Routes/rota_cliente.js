const express = require('express');
const router = express.Router();
const db = require('../models/db');
const Cliente = require('../models/Cliente');



router.get('/', (req, res) =>{
    Cliente.findAll().then(function(clientes){ // TUDO QUE ESTÁ DENTRO DO findAll() SÓ PRECISA COLCOAR QUANDO QUISER MUDAR A ORDEM QUE SERÁ SALVO NA VARIÁVEL POST. NESTE CASO ELE APRESENTARÁ EM ORDEM DECRESCENTE PELO ID
        res.render('consultarCliente', {clientes: clientes})
    })
});

router.post('/addCliente', (req,res)=>{
    Cliente.max('CLI_IdCliente').then(function(CLI_IdCliente){

        Cliente.create({
            CLI_IdCliente: CLI_IdCliente+1,
            CLI_Nome: req.body.nome,
            CLI_NumCPF: req.body.cpf,
            CLI_NumRG: req.body.rg,
            CLI_DtdNascimento: req.body.dtdNascimento,
            CLI_Endereco: req.body.endereco,
            CLI_NumEndereco: req.body.numEnd,
            CLI_Bairro: req.body.bairro,
            CLI_Cidade: req.body.cidade,
            CLI_Telefone: req.body.telefone,
            CLI_Email: req.body.email
        }).then(()=>{
            res.redirect('/home');
        }).catch((erro) =>{
            res.send("Houve um erro: " + erro);
        })

    });

    
});


router.get('/cadastrarClientes', (req,res)=>{
    res.render('cadastrarClientes')
})


router.get('/:codCliente', (req,res)=>{
    var dados = req.params;
    Cliente.findAll({where: {CLI_IdCliente: dados.codCliente}
    }).then((clientes)=>{
        res.render('clientes', {clientes: clientes});
    }).catch((error)=>{
        res.send("Deu Ruim" + error);
    });
});


router.get('/cadastrarClientes', (req,res)=>{
    res.render('cadastrarClientes')
});


router.get('/excluir/:id', (req,res)=>{
    let id = req.params.id
    Cliente.destroy({where:{CLI_IdCliente: id}}).then(()=>{
        res.status(201).redirect('../');
    }).catch((error)=>{
        res.status(404).send('Deu Ruim...' + error);
    });
    
});

router.post('/alterarCliente/:id', (req,res)=>{
    let dados = req.body;
    try{
        Cliente.update({
            CLI_Nome: dados.nome,
            CLI_NumCPF: dados.cpf,
            CLI_NumRG: dados.rg,
            CLI_DtdNascimento: dados.dtdNascimento,
            CLI_Endereco: dados.endereco,
            CLI_NumEndereco: dados.numEnd,
            CLI_Bairro: dados.bairro,
            CLI_Cidade: dados.cidade,
            CLI_Telefone: dados.telefone,
            CLI_Email: dados.email
        }, {where: {CLI_IdCliente: dados.codigo}})
        res.redirect('../../clientes/'+dados.codigo);
    } catch(error){
        res.status(404).send('Deu Ruim...' + error);
    }
    
})


module.exports = router;