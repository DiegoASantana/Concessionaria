const express = require('express');
const router = express.Router();
const Venda = require('../models/Vendas');
const Veiculo = require('../models/Veiculo');
const Cliente = require('../models/Cliente');
const VeiculoVendido = require ('../models/VeiculoVendido');


router.get('/registrar', (req,res)=>{
    Veiculo.findAll().then(function(veiculo){
        Cliente.findAll().then((cliente)=>{
            Venda.findAll().then((venda)=>{
                res.render('vendas', {veiculo: veiculo, cliente: cliente, venda: venda});
                console.log(veiculo[0]);
                console.log(cliente[0]);
                console.log(venda[0]);

            })
        })
        
    });
})

router.post('/addVenda', (req,res)=>{
    //DADOS
    let idVenda = req.body.codVenda;
    let idVeiculo = req.body.codVei;


    //DATAVENDA
    var agora = new Date();
    var dia = ("0" + agora.getDate()).slice(-2);
    var mes = ("0" + (agora.getMonth() + 1)).slice(-2);
    var hora = ("0"+ (agora.getHours())).slice(-2) +":"+ ("0" + (agora.getMinutes())).slice(-2);

    var dataHoje = agora.getFullYear()+"-"+(mes)+"-"+(dia) +" "+(hora);
    console.log(dataHoje);

    //ValorTotal
    let valor = (req.body.valor).slice(3);
    let valorTotalSemPonto = valor.replace('.','');
    let valorTotalSemVirgula = valorTotalSemPonto.replace(',','.');
    console.log(valor)
    console.log(valorTotalSemPonto)
    console.log(valorTotalSemVirgula)


    //valorEntrada
    let entradaOpcao = req.body.entradaOpcao;
    let valorEntrada = (req.body.valorEntrada).slice(3);
    let valorEntradaSemPonto = 0;
    let valorEntradaSemVirgula = 0;
    if(entradaOpcao == "Sim"){
        valorEntradaSemPonto = valorEntrada.replace('.','');
        valorEntradaSemVirgula = valorEntradaSemPonto.replace(',','.');

        console.log("Entrada: "+valorEntradaSemVirgula);
        
    }else{
        valorEntradaSemVirgula = '0.00';
    }



    // VALOR FINANCIAMENTO
    let finOpcao = req.body.financiamento;
    let valorFin = (req.body.valorFin).slice(3);
    let valorFinanciamentoSemPonto = 0;
    let valorFinanciamentoSemVirgula = 0;
    if(finOpcao == "Não"){
        valorFinanciamentoSemVirgula = 0.00;
    }else{
        valorFinanciamentoSemPonto = valorFin.replace('.','');
        valorFinanciamentoSemVirgula = valorFinanciamentoSemPonto.replace(',','.');
    }
    console.log(finOpcao);

    

    // valorParcela
    let qtdParcela = req.body.qtdParcela;
    let valorParcela = (req.body.valorParcela).slice(3);
    let valorParcelaSemPonto = 0;
    let valorParcelaSemVirgula = 0;

    if(qtdParcela == 1){
        valorParcelaSemVirgula = 0.00;
    }else{
        valorParcelaSemPonto = valorParcela.replace('.','');
        valorParcelaSemVirgula = valorParcelaSemPonto.replace(',','.');
    }


    let nota = req.body.notaFiscal;
    console.log(nota);


    Venda.create({
        VEN_IdVenda: idVenda,
        VEN_IdFunc: req.body.codFuncionario,
        VEN_IdCliente: req.body.codCliente,
        VEN_DtdVenda: dataHoje,
        VEN_IdVeiculo: idVeiculo,
        VEN_NumNotaFiscal: req.body.notaFiscal,
        VEN_ValorTotal: valorTotalSemVirgula,
        VEN_Financiamento: finOpcao,
        VEN_ValorFinan: valorFinanciamentoSemVirgula,
        VEN_QtdParcela: qtdParcela,
        VEN_ValorParcela: valorParcelaSemVirgula,
        VEN_ValorEntrada: valorEntradaSemVirgula
    }).then(()=>{
        try{
            Veiculo.update({VEI_Disponibilidade: 0, }, {where: {VEI_IdVeiculo: req.body.codVei}});
        } catch (error){
            res.status(404).send('Deu Ruim na alteração do veículo para indisponível' + error);
        }
        VeiculoVendido.max('VEV_IdVeiculoVendido').then((VEV_IdVeiculoVendido)=>{

            VeiculoVendido.create({
                VEV_IdVeiculoVendido: VEV_IdVeiculoVendido+1,
                VEV_IdVeiculo: idVeiculo,
                VEV_IdVenda: idVenda
            }).then(()=>{
                console.log("Venda Cadastrada com Sucesso!")
                res.redirect('../home')
            }).catch((error)=>{
                res.status(404).send("Deu ruim na tabela VeiculosVendidos: " + error);
            });
        });
    }).catch((erro)=>{
        res.send("Houve um Erro na Criação da Venda: " + erro);
    })

})

/* ANOTAÇÕES

    let valorSemPonto = $('.valorFin').val().replace('.','');
    console.log(valorSemPonto)
    let valorAteaVirgula = valorSemPonto.slice(0,valorSemPonto.indexOf(','));
    console.log(valorAteaVirgula);




router.get('/', (req,res)=>{
    let idCliente = req.query.codCliente;
    Veiculo.findAll().then(function(veiculo){
        Cliente.findAll({where: {CLI_IdCliente: idCliente}}).then((cliente)=>{
            Venda.findAll().then((venda)=>{
                res.render('vendas', {veiculo: veiculo, cliente: cliente, venda: venda});
                console.log(veiculo[0]);
                console.log(cliente[0]);
                console.log(venda[0]);

            })
        })
        
    });
})



router.post('cadVenda', (req,res)=>{
    Venda.max('VEN_IdVenda').then((VEN_IdVenda)=>{
        Venda.create({
            VEN_IdVenda: VEN_IdVenda+1,
            VEN_IdFunc: 
            VEN_IdCliente int 
            VEN_DtdVenda date 
            VEN_IdVeiculo int 
            VEN_NumNotaFiscal int 
            VEN_ValorTotal float 
            VEN_Financiamento bit(1) 
            VEN_ValorFinan float 
            VEN_QtdParcela int 
            VEN_ValorParcela float 
            VEN_ValorEntrada
        })
    })
})
*/

module.exports = router;