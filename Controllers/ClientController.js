var db = require("../Dao/Conection");
var utils = require("../Utils/UtilsAxan");

var clientController = {

   searchProduct: function(req, res) {
		 // Acessando os parametros enviados pelo query
      const produto = req.query.q || "";
		const point = {};
		point.lat = parseFloat(req.query.lat) || 0;
		point.lon = parseFloat(req.query.lon) || 0;
      
		let userId = utils.validateToken(req.headers["token"]); // chamar função para acesar JWT
		if (userId) {

			let SQL = "select * from listar_produto('" + produto + "',"+userId+");";
			
			db.execute(SQL, [], function(err, result)  {

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
						picture: p.ds_picture,
						cnpj: p.cnpj_varejista,
						coord: {
							lat: p.latitude ? p.latitude : 0,
							lon: p.longitude ? p.longitude : 0
						}
					});
				}

				// Se informou a localização ordenar pela distância
				if (point.lat !== 0 && point.lon !== 0) {
					// ordenar pela distância
					produtos = sortByDistance(point, produtos);
					// remover propriedade coord
					produtos.forEach(function(element) {
						delete element.coord;
					}, this);
				}

				res.status(200).json({
					result:produtos,
					status: "SUCCESS"
				});
			});
		} else {
			return res.status(401).send({
				result: [],
				status: "INVALID TOKEN"
			});
		}
   },

	getShoppingList: function(req, res) {

		let userId = utils.validateToken(req.headers["token"]);; // chamar função para acesar JWT
		if (userId) {
			let SQL = "select a.cd_produto, a.nm_produto, a.ds_picture, a.qt_preco::money::numeric::float8 " +
				"from produto a, produtos_lista_compra b " +
				"where b.id_usuario = " + userId + " " +
				"and b.cd_produto = a.cd_produto;"

			db.execute(SQL, [], function (err, result) {

				if (err) {
					return res.status(400).json({
						result: [],
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
						message: []
					});

				}
			});
		} else {
			return res.status(401).send({
				result: [],
				status: "INVALID TOKEN"
			});
		}

   },

   addToShoppingList: function (req, res) {

	   let cod_produto = req.params.id;
	   let qtd_produto = req.params.qtd;
	   let userId = utils.validateToken(req.headers["token"]);; // chamar função para acesar JWT
	   if (userId) {

		   let SQL = "select alterar_produto_lista("+userId+","+cod_produto+", 'I');";
		   let values = [userId, cod_produto, qtd_produto];

		   db.execute(SQL, values, function (err, result) {

			   if (err) {
				   return res.status(400).json({
					   result: [],
					   status: "ERROR",
					   message: [
						   err
					   ]
				   });
			   }

			   // TODO: Verificar o result

			   return res.status(200).json({
				   result: [],
				   status: "SUCESS",
				   message: [
					   "Produto adicionado com sucesso!"
				   ]
			   });
		   });
	   } else {
		   return res.status(401).send({
			   result: [],
			   status: "INVALID TOKEN"
		   });
	   }
   },

	deleteFromShoppingList: function(req, res) {
		
		let cod_produto = req.params.id;
		let userId = utils.validateToken(req.headers["token"]);; // chamar função para acesar JWT
		if (userId) {
			let SQL = "select alterar_produto_lista("+userId+","+cod_produto+", 'D');";

			db.execute(SQL, [], function (err, result) {

				if (err) {
					return res.status(400).json({
						result: [],
						status: "ERROR",
						message: [
							err
						]
					});
				}

				// TODO: Verificar o result

				return res.status(200).json({
					result: [],
					status: "SUCESS",
					message: [
						"Produto removido com sucesso!"
					]
				});
			});
		} else {
			return res.status(401).send({
				result: [],
				status: "INVALID TOKEN"
			});
		}
   },

	getSuggestionsList: function(req, res) {
		let userId = utils.validateToken(req.headers["token"]); // chamar função para acesar JWT
		const point = {};
		point.lat = parseFloat(req.query.lat) || 0;
		point.lon = parseFloat(req.query.lon) || 0;
		if (userId) {
			let SQL = "select distinct cd_produto, nm_produto, ds_picture, qt_preco, latitude, longitude from sugerir_produtos("+userId+", 100);";

			db.execute(SQL, [], function (err, result) {

				if (err) {
					return res.status(400).json({
						result: [],
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
							var p = result.rows[atual];
							myResult.push({
								cod: p.cd_produto,
								name: p.nm_produto,
								picture: p.ds_picture,
								price: p.qt_preco,
								coord: {
									lat: p.latitude ? p.latitude : 0,
									lon: p.longitude ? p.longitude : 0
								}
							});
						}
					}

					if (point.lat !== 0 && point.lon !== 0) {
						// ordenar pela distância
						myResult = sortByDistance(point, myResult);
						// remover propriedade coord
						myResult.forEach(function(element) {
							delete element.coord;
						}, this);
					}

					return res.status(200).json({
						result: myResult,
						status: "SUCESS",
						message: []
					});

				}
			});
		} else {
			return res.status(401).send({
				result: [],
				status: "INVALID TOKEN"
			});
		}
	}

};

module.exports = clientController;

// Utilizado como base: 
	
	// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
	/**
	 * 
	 * @param {lat, lon} coordA 
	 * @param {lat, lon} coordB 
	 * @return distance in meters
	 */
	function distanceBetween (coordA, coordB) {
		var R = 6378.1; // Radius of the earth in km
		var PI_180 = (Math.PI/180);
		var dLat = PI_180 * (coordB.lat-coordA.lat);  // deg2rad below
		var dLon = PI_180 * (coordB.lon-coordA.lon); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(PI_180 * (coordA.lat)) * Math.cos(PI_180 * (coordB.lat)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return parseFloat((d * 1000).toFixed(2)); // Distance in m
	}

	/**
	 * Ordena os produtos pela distancia entre a propriedade coord e point
	 * @param {*} point 
	 * @param {*} products ordenados e sem a propriedade coord
	 */
	function sortByDistance (point, products) {
		var aux;
		for(var j = 0; j < products.length; j++) {
			for(var i = 0; i < products.length -1; i++) {
				if(!products[i].distance) {
					products[i].distance = distanceBetween(point, products[i].coord);
				}
				if(!products[i+1].distance) {
					products[i+1].distance = distanceBetween(point, products[i+1].coord);
				}
				if(products[i].distance > products[i+1].distance) {
					aux = products[i+1];
					products[i+1] = products[i];
					products[i] = aux;
				}
			}
		}
		return products;
	}