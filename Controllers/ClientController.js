var db = require("../Dao/Conection");

var clientController = {

   create: function(req, res) {
      console.log("create client");
   },

   searchProduct: function(req, res) {

      // Acessando os parametros enviados pelo HEADER
      const produto = req.query.q || "";
         
      let SQL = "select * from produto where upper(nm_produto) like upper('%"+produto+"%')";
         
         db.execute(SQL, null, function(err, result)  {

          if (err) {
            return res.status(400).json({
                messages: [err]
            });
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
          return res.status(200).json({result:produtos});
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