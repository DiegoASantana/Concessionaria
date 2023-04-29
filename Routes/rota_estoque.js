const express = require('express');
const router = express.Router();
const Veiculo = require('../models/Veiculo');
const Marca = require('../models/Marca');
const Modelo = require('../models/Modelo');



router.get('/consultarVeiculos', (req, res) =>{
    Veiculo.findAll({where: {VEI_disponibilidade: 1}}).then(function(veiculos){ // TUDO QUE ESTÁ DENTRO DO findAll() SÓ PRECISA COLCOAR QUANDO QUISER MUDAR A ORDEM QUE SERÁ SALVO NA VARIÁVEL POST. NESTE CASO ELE APRESENTARÁ EM ORDEM DECRESCENTE PELO ID
        Marca.findAll().then((marcas)=>{
            Modelo.findAll().then((modelos)=>{
                res.render('consultarVeiculos', {veiculos: veiculos, marcas: marcas, modelos: modelos});
            })
        });
    })
});


router.get('/cadastrarVeiculos', (req, res) =>{
    Marca.findAll().then((marcas)=>{
        Modelo.findAll().then((modelos)=>{
            res.render('cadastrarVeiculos', {modelos:modelos, marcas:marcas});
        })
    })
    
});


router.get('/:id', (req,res)=>{
    let id = req.params.id;

    Veiculo.findAll({where: {'VEI_IdVeiculo': id}}).then(function(veiculos){ // TUDO QUE ESTÁ DENTRO DO findAll() SÓ PRECISA COLCOAR QUANDO QUISER MUDAR A ORDEM QUE SERÁ SALVO NA VARIÁVEL POST. NESTE CASO ELE APRESENTARÁ EM ORDEM DECRESCENTE PELO ID
        res.render('estoque', {veiculos: veiculos});			
    })

})

router.post('/addVeiculo', (req,res)=>{
    Veiculo.max('VEI_IdVeiculo').then(function(VEI_IdVeiculo){
    
        Veiculo.create({
            VEI_IdVeiculo: VEI_IdVeiculo+1,
            VEI_Marca: req.body.marca,
            VEI_Modelo: req.body.modelo,
            VEI_NumRenavam: req.body.renavam,
            VEI_Placa: req.body.placa,
            VEI_Ano: req.body.ano,
            VEI_Cor: req.body.cor,
            VEI_Valor: req.body.valor,
            VEI_Novo: novo(),
            VEI_Km: req.body.km,
            VEI_Combustivel: req.body.combustivel,
            VEI_Disponibilidade: 1,
            VEI_Observacoes: req.body.observacao
        }).then(()=>{
            console.log("Veiculo Cadastrado com Sucesso!")
            res.redirect('../estoque/consultarVeiculos');
        }).catch((erro) =>{
            res.send("Houve um erro: " + erro);
        })
        function novo(){
            var sitNovo = req.body.sit1
            var sitSemiNovo = req.body.sit2
            var sit = 0
            if(sitNovo == 'on'){
                sit = 1;
            }else{
                if(sitSemiNovo = 'on'){
                    sit = 0;
                }
                
            }
            return sit;
        }
    });
});

router.post('/alterarVei/:id', (req,res)=>{
    let id = req.params.id;
    Veiculo.destroy({where:{VEI_IdVeiculo: id}}).then(()=>{

        Veiculo.create({
            VEI_IdVeiculo: id,
            VEI_Marca: req.body.marca,
            VEI_Modelo: req.body.modelo,
            VEI_NumRenavam: req.body.renavam,
            VEI_Placa: req.body.placa,
            VEI_Ano: req.body.ano,
            VEI_Cor: req.body.cor,
            VEI_Valor: req.body.valor,
            VEI_Novo: novo(),
            VEI_Km: req.body.km,
            VEI_Combustivel: req.body.combustivel,
            VEI_Disponibilidade: 1,
            VEI_Observacoes: req.body.observacao
        }).then(()=>{
            console.log("Veiculo Alterado com Sucesso!")
            res.redirect('../../estoque/'+id);
        }).catch((erro) =>{
            res.send("Houve um erro: " + erro);
        })
        function novo(){
            var sitNovo = req.body.sit1
            var sitSemiNovo = req.body.sit2
            var sit = 0
            if(sitNovo == 'on'){
                sit = 1;
            }else{
                if(sitSemiNovo = 'on'){
                    sit = 0;
                }
                
            }
            return sit;
        }
    }).catch((error)=>{
        res.status(404).send('DEU RUIM');
    })

})

router.get('/excluir/:id', (req,res)=>{
    let id = req.params.id
    Veiculo.destroy({where:{VEI_IdVeiculo: id}}).then(()=>{
        res.status(201).redirect('../../estoque/consultarVeiculos');
    }).catch((error)=>{
        res.status(404).redirect('../../estoque/consultarVeiculos');
    })
})


router.get('/consultarVeiculos/:codVei', (req,res)=>{
    var dados = req.params;
    Veiculo.findAll({where: {VEI_IdVeiculo: dados.codVei}
    }).then((veiculos)=>{
        res.render('consultarVeiculos', {veiculos: veiculos});
    }).catch((error)=>{
        res.send("Deu Ruim" + error);
    });

    
})

module.exports = router;
