// Referencia para o postgre
var pg = require('pg');
let URL = "postgres://postgres:123456@localhost/axan";

var config = {
   user: 'postgres', //env var: PGUSER
   database: 'axan', //env var: PGDATABASE
   password: '123456', //env var: PGPASSWORD
   host: 'localhost', // Server hosting the postgres database
   port: 5432, //env var: PGPORT
   max: 10, // max number of clients in the pool
   idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var clientController = {

   create: function(req, res) {
      console.log("create client");
   },

   searchProduct: function(req, res) {

      // Acessando os parametros enviados pelo HEADER
      const produto = req.query.q || "";

      var db = new pg.Client(config);

      db.connect(function(err) {
         
         if (err) {
            return res.status(400).json({
               messagens: "Erro, a conexão com o Banco de Dados não foi estabelecida!" 
            });
         }
         
         let SQL = "select * from produto where upper(nm_produto) like upper('%"+produto+"%')";
         
         db.query(SQL, null, function(err, result) {
            // Se ocorreu algum erro
            if (err) {
               db.end(function (err) {
                  if (err) {
                     console.log("Erro, a conexão com o Banco de Dados não foi encerrada!");
                     return res.status(400).json({
                        menssagens: "Erro, a conexão com o Banco de Dados não foi encerrada!" 
                     });
                  }
               });
               return console.error('error runnig query', err);
            } 
            // Se não ocorreu nenhum erro
            var produtos = [];
            for (var i = 0; i < result.rows.length; i++) {
               var p = result.rows[i];
               produtos.push({
                  cod: p.cd_produto,
                  name: p.nm_produto,
                  price: p.qt_preco,
                  picture: p.ds_picture
               });
            }

            db.end(function (err) {
              if (err) {
                  console.log("Erro, a conexão com o Banco de Dados não foi encerrada!");
                  return res.status(400).json({
                     menssagens: "Erro, a conexão com o Banco de Dados não foi encerrada!" 
                    });
                  }
            });

            return res.status(200).json({produtos});

         });
      });
   },

   createList: function(req, res) {

   },

   updateWishList: function(req, res) {

   },

   updateList: function(req, res) {

   }

};

module.exports = clientController;