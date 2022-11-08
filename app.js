const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const Usuario = require('./models/Usuario');
const transporter = require('./models/email');
const Funcionario = require('./models/Funcionario');




// Config
	// Template Engine
		app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
		app.set('view engine', 'handlebars');


	//Body Parser
		app.use(bodyParser.urlencoded({extended: false}));
		app.use(bodyParser.json());
		app.use(express.static(__dirname + '/views'));
		app.use(express.static(__dirname + '/public'));
		app.use(session({secret:'asdkjnsdijuhsdfiouhsdfj'}));
		


		app.use('/estoque',require('./Routes/rota_estoque'));
		app.use('/index',require('./Routes/rota_user'));
		app.use('/clientes',require('./Routes/rota_cliente'));
		app.use('/funcionarios',require('./Routes/rota_funcionario'));
		app.use('/vendas',require('./Routes/rota_vendas'));
		



//Rotas

	
	app.get('/home', (req,res)=>{
		res.render('home')
	})
	

	app.get('/fornecedores', (req, res) =>{
		res.render('fornecedores');
	});


	app.get('/funcionarios', (req, res) =>{
		res.render('funcionarios');
	});





	// RECUPERAR SENHA

	app.get('/enviaEmail/:login', (req,res)=>{
		let usuario = req.params.login
		Usuario.findAll({where: {USU_NomeUsuario: usuario}}).then((result)=>{
			if(result.length > 0){
				trazSenha(result[0].USU_IdFuncionario);
			}else{
				console.log('Usuário não encontrado!')
			}
		}).catch(error=>{
			res.send('Usuário não encontrado: ' + error)
		})

		function trazSenha(idFunc){
			Funcionario.findAll({where: {FUN_IdFuncionario: idFunc}}).then((funcCPF)=>{
				let cpf = funcCPF[0].FUN_NumCPF;
				var passw = String(cpf.slice(0,3));
				var senha = passw + String(cpf.slice(4,7));
				enviaEmail(funcCPF[0].FUN_Email, senha);
			}).catch(error =>{
				console.log('Deu Eroo na Função de trazer o cpf: ' +error);
			})
			
		}
		
	
		function enviaEmail(email, senha){
			transporter.sendMail({
				from: "HighStreet Concessionaria <highstreetconcessionaria@hotmail.com>",
				to: email,
				subject: "HighStreet Concessionária - Senha para acesso ao Sistema",
				text: "Aqui estou testando o texto",
				html: `Sua senha para acesso ao sistema é: <strong>${senha}</strong><br>
				<a href='http://localhost:8081/index'>Clique aqui</a> para ser redirecionado ao sistema HighStreet Concessionaria`
			}).then(message => {
				console.log(message);
			}).catch (err =>{
				console.log(err);
			})
		}
	
		res.render('index');
	
		
	})



app.listen(port, function(){
	console.log("Projeto executando na porta: " + port);
});

module.exports = app;