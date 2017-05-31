var db = require("../Dao/Conection");

var user = {

  signUp: function (req, res) {

    const SQL = "insert into usuario (nm_usuario, ds_senha, dt_nascimento, ds_email, nr_celular, nr_ddd, cd_pais) " +
      "values ($1, $2, to_date($3, 'dd/mm/yyyy'), $4, $5, $6, $7);"

    const values = [req.headers["user"], req.headers["password"], req.headers["birthday_date"], req.headers["ds_email"], 
    req.headers["email"], req.headers["cellphone"], "+55"];

    db.execute(SQL, values, function (err, result) {
      if (err) {
        return res.status(400).send({
          result: [],
          status: "ERROR",
          message: [err]
        });
      } else {
        // Verificar se o select executou sem erros
        return res.status(200).send({
          result: [{
            id: userAuth.nm_usuario
          }],
          status: "SUCESS",
          message: ["Usuario cadastrado com sucesso!"]
        });
      }
    });
  },

  logon: function (req, res) {
    // Acessando os parametros enviados pelo Header
    const email = req.headers['user'];
    const pass  = req.headers['password'];

    let SQL = "SELECT * FROM USUARIO WHERE ds_email = '" + email + "' and ds_senha = '" + pass + "';";

    db.execute(SQL, [], function (err, result) {

      const userAuth = result.rows[0];

      // Usuário autenticado com sucesso
      if (userAuth != null) {

        console.log("Usuário: " + userAuth.nm_usuario + ", autenticado com sucesso!");
        
        return res.status(200).send({
          result: [{
            id: userAuth.nm_usuario
          }],
          status: "SUCESS",
          message: ["Usuário autenticado com sucesso!"]
        });

      // Usuário não autenticado
      } else {
        console.log("Usuário ou senha incorretos!");
        return res.status(400).send({
          result: [],
          status: "ERROR",
          message: ["Usuário ou senha incorretos!", err]
        });
      }
    });

  },

  logoff: function (req, res) {

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