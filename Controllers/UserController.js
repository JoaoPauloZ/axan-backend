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

var user = {

   logon: function(req, res) {
      // Acessando os parametros enviados pela URL
      const user = req.headers['user'];
      const pass = req.headers['password'];

      var db = new pg.Client(config);

      db.connect(function(err) {
         
         if (err) {
            return console.error('error fetching client from pool', err);
         }
         
         let SQL = "SELECT * FROM USUARIO WHERE nm_usuario = '"+user+"' and ds_senha = '"+pass+"';";
         
         db.query(SQL, null, function(err, result) {
            if (err) {
               db.end(function (err) {
                  if (err){
                     return console.log("error encerrando a conexão");
                  } else {
                     console.log("conexão encerrada");
                  }
               });
               return console.error('error runnig query', err);
            }
            console.log(result.rows[0]);
            var auth = false;

            if (result.rows[0] != null) {
               auth = true;
            }
            
            db.end(function (err) {
               if (err) {
                  return console.log("error encerrando a conexão");
               } else {
                  console.log("conexão encerrada");
               }
            });

            if (auth) {
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
      });

   },

   logoff: function(req, res) {
      
   }

};

module.exports = user;