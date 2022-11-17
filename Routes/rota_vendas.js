const express = require('express');
const router = express.Router();
const Venda = require('../models/Vendas');
const Veiculo = require('../models/Veiculo');
const Cliente = require('../models/Cliente');
const VeiculoVendido = require ('../models/VeiculoVendido');

//Veiculo.hasMany(Venda)
//Venda.belongsTo(Veiculo,{foreignKey: 'VEN_IdVeiculo'});
//Venda.belongsTo(Cliente, {foreignKey: 'VEN_IdCliente'});

router.get('/', (req,res)=>{
    res.render('vendas');
})





router.get('/registrar', (req,res)=>{
    Veiculo.findAll({where: {VEI_Disponibilidade: 1}}).then(function(veiculo){
        Cliente.findAll().then((cliente)=>{
            Venda.findAll().then((venda)=>{
                res.render('registrarVenda', {veiculo: veiculo, cliente: cliente, venda: venda});
                console.log(veiculo[0]);
                console.log(cliente[0]);
                console.log(venda[0]);

            })
        })
        
    });
})




router.get('/vendasRealizadas', (req,res)=>{
    Venda.findAll().then((vendas)=>{
        let listaVendas = [];
        let idVeiculoVendido = [];
        let idCliente = [];
        let lista = []
        let lista2 = []

        for(let i =0; i<vendas.length; i++){
            idVeiculoVendido.push(vendas[i].VEN_IdVeiculo);
            idCliente.push(vendas[i].VEN_IdCliente);

            listaVendas.push({
                'IdVenda': vendas[i].VEN_IdVenda,
                'IdFuncionario': vendas[i].VEN_IdFunc,
                'DtdVenda': vendas[i].VEN_DtdVenda,
                'IdCliente': vendas[i].VEN_IdCliente,
                'IdVeiculo': vendas[i].VEN_IdVeiculo,
                'Entrada': vendas[i].VEN_ValorEntrada,
                'Financiamento': vendas[i].VEN_ValorFinan,
                'QtdParcela': vendas[i].VEN_QtdParcela,
                'ValorParcela': vendas[i].VEN_ValorParcela
            });
        }

       

        Veiculo.findAll({where:{VEI_IdVeiculo: idVeiculoVendido}}).then((veiculos)=>{
            for(let i = 0;i<listaVendas.length;i++){
                for(let j=0;j<veiculos.length;j++){
                    if(listaVendas[i].IdVeiculo == veiculos[j].VEI_IdVeiculo){
                        lista.push({
                            'IdVenda': listaVendas[i].IdVenda,
                            'IdFuncionario': listaVendas[i].IdFuncionario,
                            'DtdVenda': listaVendas[i].DtdVenda,
                            'IdCliente': listaVendas[i].IdCliente,
                            'IdVeiculo': listaVendas[i].IdVeiculo,
                            'Entrada': listaVendas[i].Entrada,
                            'Financiamento': listaVendas[i].Financiamento,
                            'QtdParcela': listaVendas[i].QtdParcela,
                            'ValorParcela': listaVendas[i].ValorParcela,
                            'Marca': veiculos[j].VEI_Marca,
                            'Modelo': veiculos[j].VEI_Modelo,
                            'Renavam': veiculos[j].VEI_NumRenavam,
                            'Placa': veiculos[j].VEI_Placa,
                            'Cor': veiculos[j].VEI_Cor,
                            'Ano': veiculos[j].VEI_Ano,
                            'Situacao': veiculos[j].VEI_Novo,
                            'Km': veiculos[j].VEI_Km,
                            'Combustivel': veiculos[j].VEI_Combustivel,
                            'Valor': veiculos[j].VEI_Valor
                        });
                    }
                }lista
            }
            Cliente.findAll({where: {CLI_IdCliente: idCliente}}).then((clientes)=>{
                for(let i = 0;i<lista.length;i++){
                    for(let j=0;j<clientes.length;j++){
                        if(lista[i].IdCliente == clientes[j].CLI_IdCliente){
                            lista2.push({
                                'IdVenda': lista[i].IdVenda,
                                'IdFuncionario': lista[i].IdFuncionario,
                                'DtdVenda': lista[i].DtdVenda,
                                'IdCliente': lista[i].IdCliente,
                                'IdVeiculo': lista[i].IdVeiculo,
                                'Entrada': lista[i].Entrada,
                                'Financiamento': lista[i].Financiamento,
                                'QtdParcela': lista[i].QtdParcela,
                                'ValorParcela': lista[i].ValorParcela,
                                'Marca': lista[i].Marca,
                                'Modelo': lista[i].Modelo,
                                'Renavam': lista[i].Renavam,
                                'Placa': lista[i].Placa,
                                'Cor': lista[i].Cor,
                                'Ano': lista[i].Ano,
                                'Situacao': lista[i].Situacao,
                                'Km': lista[i].Km,
                                'Combustivel': lista[i].Combustivel,
                                'Valor': lista[i].Valor,
                                'NomeCliente': clientes[j].CLI_Nome,
                                'Cpf': clientes[j].CLI_NumCPF
                            });
                        }
                    }
                }

                
                console.log(lista)
                console.log(lista2)
                res.render('vendasRealizadas', {vendas: lista2});
            });
        });   
    });
});










/*
router.get('/vendasRealizadas', (req,res)=>{
    Venda.findAll({
        attributes: ['VEN_IdVenda'],
        include: [{model: Veiculo, attributes: ['VEI_Modelo'], required: false}],            
        where:{VEN_IdVenda: 9}
    }).then((venda)=>{
        console.log(JSON.stringify(venda, null, 2))
        res.render('vendasRealizadas',{vendas: venda})
        let idVeiculoVendido = []
        for(let i =0; i<vendas.length; i++){
            idVeiculoVendido.push(vendas[i].VEV_IdVeiculo)
        }
        let idCliente = []
        for(let i =0; i<vendas.length; i++){
            idVeiculoVendido.push(vendas[i].idCliente)
        }

        console.log(idVeiculoVendido);
        Veiculo.findAll({where:{VEI_IdVeiculo: idVeiculoVendido}}).then((veiculos)=>{
            Cliente.findAll({where: {CLI_IdCliente: idCliente}}).then((clientes)=>{
                res.render('vendasRealizadas', {vendas: vendas, veiculos: veiculos, clientes: clientes});
            })
        })
    })

})









router.get('/vendasRealizadas', (req,res)=>{
    VeiculoVendido.findAll().then((vendas)=>{ 

        let idVeiculoVendido = []
            for(let i =0; i<vendas.length; i++){
                idVeiculoVendido.push(vendas[i].VEV_IdVeiculo)
            }
            console.log(idVeiculoVendido);

        Veiculo.findAll({where: {VEI_IdVeiculo: idVeiculoVendido}}).then(function(veiculo){
          //  console.log(veiculo[0]);
            Cliente.findAll().then((cliente)=>{
               // console.log(cliente[0]);
                Venda.findAll().then((venda)=>{
                   // console.log(venda[0]);
                    let listaVendas = []
                    for(let i=0;i<venda.length;i++){
                        listaVendas.push({
                            'IdVenda': venda[i].VEN_IdVenda,
                            'IdFuncionario': venda[i].VEN_IdFunc,
                            'DtdVenda': venda[i].VEN_DtdVenda,
                            'IdCliente': venda[i].VEN_IdCliente,
                            'NomeCliente': cliente[i].CLI_Nome,
                            'Cpf': cliente[i].CLI_NumCPF,
                            'IdVeiculo': venda[i].VEN_IdVeiculo,
                            'Marca': veiculo[i].VEI_Marca,
                            'Modelo': veiculo[i].VEI_Modelo,
                            'Renavam': veiculo[i].VEI_NumRenavam,
                            'Placa': veiculo[i].VEI_Placa,
                            'Cor': veiculo[i].VEI_Cor,
                            'Ano': veiculo[i].VEI_Ano,
                            'Situacao': veiculo[i].VEI_Novo,
                            'Km': veiculo[i].VEI_Km,
                            'Combustivel': veiculo[i].VEI_Combustivel,
                            'Valor': veiculo[i].VEI_Valor,
                            'Entrada': venda[i].VEN_ValorEntrada,
                            'Financiamento': venda[i].VEN_ValorFinan,
                            'QtdParcela': venda[i].VEN_QtdParcela,
                            'ValorParcela': venda[i].VEN_ValorParcela
                        })
                    }
                    //console.log(listaVendas)
                    res.render('vendasRealizadas', {vendas: listaVendas});
                })
            })
            
        });
    })
})*/

router.get('/vendaRegistrada/:id', (req,res)=>{
    let idVenda = req.params.id
    Venda.findAll({where:{VEN_IdVenda: idVenda}}).then((vendas)=>{
        let listaVendas = [];
        let idVeiculoVendido = [];
        let idCliente = [];
        let lista = []
        let lista2 = []

        for(let i =0; i<vendas.length; i++){
            idVeiculoVendido.push(vendas[i].VEN_IdVeiculo);
            idCliente.push(vendas[i].VEN_IdCliente);

            listaVendas.push({
                'IdVenda': vendas[i].VEN_IdVenda,
                'IdFuncionario': vendas[i].VEN_IdFunc,
                'DtdVenda': vendas[i].VEN_DtdVenda,
                'IdCliente': vendas[i].VEN_IdCliente,
                'IdVeiculo': vendas[i].VEN_IdVeiculo,
                'Entrada': vendas[i].VEN_ValorEntrada,
                'Financiamento': vendas[i].VEN_ValorFinan,
                'QtdParcela': vendas[i].VEN_QtdParcela,
                'ValorParcela': vendas[i].VEN_ValorParcela
            });
        }

       

        Veiculo.findAll({where:{VEI_IdVeiculo: idVeiculoVendido}}).then((veiculos)=>{
            for(let i = 0;i<listaVendas.length;i++){
                for(let j=0;j<veiculos.length;j++){
                    if(listaVendas[i].IdVeiculo == veiculos[j].VEI_IdVeiculo){
                        lista.push({
                            'IdVenda': listaVendas[i].IdVenda,
                            'IdFuncionario': listaVendas[i].IdFuncionario,
                            'DtdVenda': listaVendas[i].DtdVenda,
                            'IdCliente': listaVendas[i].IdCliente,
                            'IdVeiculo': listaVendas[i].IdVeiculo,
                            'Entrada': listaVendas[i].Entrada,
                            'Financiamento': listaVendas[i].Financiamento,
                            'QtdParcela': listaVendas[i].QtdParcela,
                            'ValorParcela': listaVendas[i].ValorParcela,
                            'Marca': veiculos[j].VEI_Marca,
                            'Modelo': veiculos[j].VEI_Modelo,
                            'Renavam': veiculos[j].VEI_NumRenavam,
                            'Placa': veiculos[j].VEI_Placa,
                            'Cor': veiculos[j].VEI_Cor,
                            'Ano': veiculos[j].VEI_Ano,
                            'Situacao': veiculos[j].VEI_Novo,
                            'Km': veiculos[j].VEI_Km,
                            'Combustivel': veiculos[j].VEI_Combustivel,
                            'Valor': veiculos[j].VEI_Valor
                        });
                    }
                }lista
            }
            Cliente.findAll({where: {CLI_IdCliente: idCliente}}).then((clientes)=>{
                for(let i = 0;i<lista.length;i++){
                    for(let j=0;j<clientes.length;j++){
                        if(lista[i].IdCliente == clientes[j].CLI_IdCliente){
                            lista2.push({
                                'IdVenda': lista[i].IdVenda,
                                'IdFuncionario': lista[i].IdFuncionario,
                                'DtdVenda': lista[i].DtdVenda,
                                'IdCliente': lista[i].IdCliente,
                                'IdVeiculo': lista[i].IdVeiculo,
                                'Entrada': lista[i].Entrada,
                                'Financiamento': lista[i].Financiamento,
                                'QtdParcela': lista[i].QtdParcela,
                                'ValorParcela': lista[i].ValorParcela,
                                'Marca': lista[i].Marca,
                                'Modelo': lista[i].Modelo,
                                'Renavam': lista[i].Renavam,
                                'Placa': lista[i].Placa,
                                'Cor': lista[i].Cor,
                                'Ano': lista[i].Ano,
                                'Situacao': lista[i].Situacao,
                                'Km': lista[i].Km,
                                'Combustivel': lista[i].Combustivel,
                                'Valor': lista[i].Valor,
                                'NomeCliente': clientes[j].CLI_Nome,
                                'Cpf': clientes[j].CLI_NumCPF
                            });
                        }
                    }
                }

                
                console.log(lista)
                console.log(lista2)
                res.render('vendaRegistrada', {vendas: lista2});
            });
        });   
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
                res.redirect('../vendas')
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