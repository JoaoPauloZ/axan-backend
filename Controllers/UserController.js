var db = require("../Dao/Conection");
var utils = require("../Utils/UtilsAxan");

var user = {

  signUp: function (req, res) {

    const SQL = "select createUser( $1, $2, to_date($3, 'dd/mm/yyyy'), $4, $5, $6, $7) IDUSER";
    const values = [req.headers["user"], req.headers["password"], req.headers["birthday_date"], req.headers["email"], 
    req.headers["cellphone"], "47", "+55"];
    console.log(values);

    db.execute(SQL, values, function (err, result) {
      if (err) {
        return res.status(400).send({
          result: [],
          status: "ERROR",
          message: [err]
        });
      } else {
        console.log(result.rows[0].iduser);
        let token = utils.createToken(result.rows[0].iduser, '1h');
        // Verificar se o select executou sem erros
        return res.status(200).send({
          result: [{
            token: token
          }],
          status: "SUCESS",
          message: ["Usuario cadastrado com sucesso!"]
        });
      }
    });
  },

  logon: function (req, res) {

    console.log(new Date() + " Tentando logon");

    // Acessando os parametros enviados pelo Header
    const email = req.headers['user'];
    const pass  = req.headers['password'];

    let SQL = "SELECT * FROM USUARIO WHERE ds_email = '" + email + "' and ds_senha = '" + pass + "';";

    db.execute(SQL, [], function (err, result) {

      const userAuth = result.rows[0];

      // Usuário autenticado com sucesso
      if (userAuth != null) {

        console.log(new Date() + " Usuário: " + userAuth.nm_usuario + ", autenticado com sucesso!");
         let token = utils.createToken(userAuth.id_usuario, '1h');
        return res.status(200).send({
          result: [{
            token : token
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
            message: ["Usuário ou senha incorretos!", err ? err : ""]
        });
      }
    });

  },

  preference: function (req, res) {
    var id = utils.validateToken(req.headers["token"]);
    console.log("ID: " + id);
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