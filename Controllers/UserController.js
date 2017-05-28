// Referencia para o postgre
var pg = require('pg');
var db = require("../Dao/Conection");
var utils = require('../Utils/UtilsAxan');
let URL = "postgres://postgres:123456@localhost/postgres";

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'postgres', //env var: PGDATABASE
  password: ' 123456', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


var user = {

  logon: function (req, res) {
    // Acessando os parametros enviados pela URL
    const user = req.headers['user'];
    const pass = req.headers['password'];

    var db = new pg.Client(config);

    db.connect(function (err) {

      if (err) {
        return console.error('error fetching client from pool', err);
      }

      let SQL = "SELECT * FROM USUARIO WHERE nm_usuario = '" + user + "' and ds_senha = '" + pass + "';";

      db.query(SQL, null, function (err, result) {
        if (err) {
          db.end(function (err) {
            if (err) {
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

  logoff: function (req, res) {

  },

  signIn: function (req, res) {

    console.log("Executando Sing In");

    var db = new pg.Client(config);

    var sql = "insert into usuario (nm_usuario, ds_senha, dt_nascimento, ds_email, nr_celular, nr_ddd, cd_pais) " +
      "values ('" + req.headers["user"] + "', '" + req.headers["password"] + "', to_date('" + req.headers["birthday_date"] + "', 'dd/mm/yyyy'), '" +
      req.headers["email"] + "', " + req.headers["cellphone"] + ", '" + "47" + "', '" + "+55" + "' ) "

    console.log(sql);

    db.connect(function (err) {
      if (err) throw err;

      db.query(sql, null, function (err, result) {
        if (err) {
          db.end(function (err) {
            if (err) throw err; else console.error("conexão encerra");
          });
          throw err;
        }
        db.end(function (err) {
          if (err) throw err;
          else {
            console.log("conexão encerrada");
            return res.status(200).send({
              id: req.nm_usuario,
              status: "SUCESS",
              mensagens: "Usuario cadastrado com sucesso!"
            });
          }
        });
      });
    });
  },

  preference: function (req, res) {
    var id = 1;
    if (id) {
      var preferenceQuerry = req.query;
      var butchery = preferenceQuerry.butchery || 0;
      var freq = preferenceQuerry.freq || 0;
      var fruit = preferenceQuerry.fruit || 0;
      var bakery = preferenceQuerry.bakery || 0;

      if (freq) {
        var sql = 'insert into preferencia_usuario values (default, $1, $2, $3), (default, $4, $2, $5), (default, $6, $2, $7), (default, $8, $2, $9)';
        db.execute(sql, [1, id, parseInt(preferenceQuerry.freq), 2, parseInt(preferenceQuerry.butchery), 3, parseInt(preferenceQuerry.fruit), 4, parseInt(preferenceQuerry.bakery)], function (err, result) {
          console.log(err);
          if (!err) {
          return res.status(200).send({
              result: [],
              status: "SUCESS",
              message: "Prefência registrada com sucesso!"
            })
          } else {
            return res.status(500).send({
              result: [],
              status: "INTERNAL SERVER ERROR",
              message: "Prefência não registrada!"  
            })
          } 
        });
      }

    } else {
      return res.status(401).send({ 
        result: [], 
        status: "INVALID TOKEN" });
    }
   }

};

module.exports = user;