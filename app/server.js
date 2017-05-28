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

// http://localhost:3000/api/security/logon
app.post('/api/security/logon', user.logon);

// http://localhost:3000/api/product/search
app.get('/api/product/search', client.searchProduct);

// http://localhost:3000/api/users/signUp/
app.post('/api/users/sign-up/', user.signIn);

// http://localhost:3000/api/users/preferences
app.post('/api/users/preferences/', user.preference);

// http://localhost:3000/api/client/wish-list/
app.get('/api/user/shopping-list/', client.getShoppingList);

// http://localhost:3000/api/client/wish-list/
app.post('/api/user/shopping-list/product/:id/quantity/:qtd', client.addToShoppingList);

// http://localhost:3000/api/user/shopping-list/product/
app.delete('/api/user/shopping-list/product/:id', client.deleteFromShoppingList);

// Iniciando o servidor
app.listen(port, function () {
	console.log('Servidor escutando na porta ' + port + '!');
});