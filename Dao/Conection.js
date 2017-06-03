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

var db;

var banco = {
  
	execute: function (queryText, values, onExecute) {
		// É importante iniciar todas as vezes
		db = new pg.Client(config);

		// Conecta com o banco de dados
		db.connect(function(err) {
			if (err) {
				return onExecute("Erro, a conexão com o Banco de Dados não foi estabelecida!", null);
		}
      // Executa o comando SQL
      db.query(queryText, values, function(err, result) {
         if (err) {
            db.end(function (err) {
               if (err) {
                  console.log("Erro, a conexão com o Banco de Dados não foi encerrada!");
                  onExecute(err.message, null);
               } 
            });
               return onExecute(err.message, null);
            } else {
					db.end(function (err) {
						if (err) {
							console.log(err.message);
							return onExecute(err.message, null);
						}
						return onExecute(null, result);
					});
				}
	      });
    	});
  	}
};

module.exports = banco;