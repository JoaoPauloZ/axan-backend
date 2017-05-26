var db = require("../Dao/Conection");

var clientController = {

   create: function(req, res) {
      console.log("create client");
   },

   searchProduct: function(req, res) {

      // Acessando os parametros enviados pelo query
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

	getShoppingList: function(req, res) {

		let userId = "2"; // chamar função para acesar JWT
		let SQL = "select a.cd_produto, a.nm_produto, a.ds_picture, a.qt_preco "+
					 "from produto a, produtos_lista_compra b " +
					 "where b.id_usuario = " + userId + " " +
 					 "and b.cd_produto = a.cd_produto;"

		db.execute(SQL, [], function(err, result)  {

			if (err) {
				return res.status(400).json({
					result: [ ],
					status: "ERROR",
					message: [
						err
					]
				});
			}
			
			var myResult = [];
			
			if (result.rowCount > 0) {
				for (var atual in result.rows) {
					if (result.rows.hasOwnProperty(atual)) {
						var element = result.rows[atual];
						myResult.push({
							cod: element.cd_produto,
							name: element.nm_produto,
							picture: element.ds_picture,
							price: element.qt_preco
						});
					}
				}

				return res.status(200).json({
					result: myResult,
					status: "SUCESS",
					message: [ ]
				});

			}
    	});

   },

   addToShoppingList: function(req, res) {
		
		let cod_produto = req.params.id;
    	let qtd_produto = req.params.qtd;
		let userId = "2"; // chamar função para acesar JWT
		let SQL = "insert into produtos_lista_compra (id_usuario, cd_produto, qt_quantidade) values ($1, $2, $3);";
		let values = [userId, cod_produto, qtd_produto];

		db.execute(SQL, values, function(err, result)  {

			if (err) {
				return res.status(400).json({
					result: [ ],
					status: "ERROR",
					message: [
						err
					]
				});
			}
			
			// TODO: Verificar o result

			return res.status(200).json({
				result: [ ],
				status: "SUCESS",
				message: [
					"Produto adicionado com sucesso!"
				]
      	});
    	});
   },

	deleteFromShoppingList: function(req, res) {
		
		let cod_produto = req.params.id;
		let userId = "2"; // chamar função para acesar JWT
		let SQL = "delete from produtos_lista_compra where id_usuario = "+userId+" and cd_produto = "+cod_produto+";";
		
		db.execute(SQL, [], function(err, result)  {

			if (err) {
				return res.status(400).json({
					result: [ ],
					status: "ERROR",
					message: [
						err
					]
				});
			}
			
			// TODO: Verificar o result

			return res.status(200).json({
				result: [ ],
				status: "SUCESS",
				message: [
					"Produto removido com sucesso!"
				]
      	});
    	});
   },

};

module.exports = clientController;