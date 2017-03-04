var express = require('express');
// Criando uma instância do express
var app = express();
// Porta do server
var port = 3000;

// http://expressjs.com/pt-br/guide/error-handling.html

// http://localhost:3000/api/security/logon/JoaoPauloSG/123456
app.post('/api/security/logon', function (req, res) {
	// Acessando os parametros enviados pela URL
	const user = req.headers['user'];
	const pass = req.headers['password'];

   if (user == "JoaoPauloSG" && pass == "123456") {
      // Exibindo os dados no console do Servidor
	   console.log("Usuario: " + user + " Senha: " + pass + " autenticado com sucesso!")
	   // Retornando uma mensagem de OK para o Cliente
	   return res.status(200).send({
         result: {
            usuario: { 
               nome: "João Paulo",
               id: 001
            }
         },
         message: "Usuario autenticado com sucesso!" 
      });
   } else {
      console.log("Usuario: " + user + " Senha: " + pass + " Incorretos!")
      return res.status(400).send({
         result: {
            },
         message: "Usuario ou senha incorretos!" 
      });
   }
	
});

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