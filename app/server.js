var express = require('express');
// Criando uma instância do express
var app = express();
// Porta do server
var port = 3000;
// Criando uma instância do UserController
var user = require('../Controllers/UserController');
// Criando uma instância do ClientController
var client = require('../Controllers/ClientController');
// Criando uma instância do RetailerController
var retailer = require('../Controllers/RetailerController');

// http://expressjs.com/pt-br/guide/error-handling.html

// http://localhost:3000/api/users/create
app.get('/api/users/create', client.create);

// http://localhost:3000/api/security/logon/JoaoPauloSG/123456
app.post('/api/security/logon', user.logon);

//http://localhost:3000/api/client/get-lista-compras
app.get('/api/lista-compras', function (req, res) {
	// Retornando um Objeto JSON com uma lista de produtos
	return res.json({
		result: {
			produtos:[
				{
					nome: "Batata",
					preco: 12.00,
				},
				{
					nome: "Arroz",
					preco: 8.00,
				},
				{
					nome: "Feijão",
					preco: 13.50,
				},
				{
					nome: "Maça",
					preco: 5.80,
				},
				{
					nome: "Banana",
					preco: 3.86,
				},
				{
					nome: "Picanha",
					preco: 38.00,
				},
				{
					nome: "Macarrão",
					preco: 3.20,
				}]
		}
	});
});

// Iniciando o servidor
app.listen(port, function () {
	console.log('Servidor escutando na porta ' + port + '!');
});