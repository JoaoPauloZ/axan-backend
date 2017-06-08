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

// http://localhost:3000/api/security/logon
app.post('/api/security/logon', user.logon);

// http://localhost:3000/api/product/search
app.get('/api/product/search', client.searchProduct);

// http://localhost:3000/api/user/sign-up/
app.post('/api/user/sign-up/', user.signUp);

// http://localhost:3000/api/user/preferences
app.post('/api/user/preferences/', user.preference);

// http://localhost:3000/api/user/shopping-list/
app.get('/api/user/shopping-list/', client.getShoppingList);

// http://localhost:3000/api/user/shopping-list/product/1/quantity/1
app.post('/api/user/shopping-list/product/:id/quantity/:qtd', client.addToShoppingList);

// http://localhost:3000/api/user/shopping-list/product/1
app.delete('/api/user/shopping-list/product/:id', client.deleteFromShoppingList);

// Iniciando o servidor
app.listen(port, function () {
	console.log('Servidor escutando na porta ' + port + '!');
});