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

var db = new pg.Client(config);

var banco = {
  
	 execute: function (queryText, values, callback) {
		   db.connect(function(err) {
         
         if (err) {
           callback(null, err);
         }
         
        db.query(queryText, values, function(err, result) {
            if (err) {
                db.end(function (err) {
                  if (err) {
                      callback(null, err);
                  } 
                });
                return callback(null, err);
            }
            
            db.end(function (err) {
                if (err) {
                  return callback(null, err);
                } else {
                  return callback(result, null);
                }
            });
	      });
    });
  }
};

module.exports = banco;