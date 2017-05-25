* Query_create_table :
	Query de criação das tabelas básicas (Não rodar se o banco já está criado)

----------------------------------------------------------------
* Script01 :
	Adicionado coluna ds_picture para tabela produto.
	Criação das tabelas que contém as questões apresentadas ao usuario e tabela de pesquisa que contém os resultados informados pelo usuário.
	Alterado tabela de log_pesquisa para log_pesquisa_usuario.
	Inserido registros nas tabelas usuario, questao_pesquisa, pesquisa e log_pesquisa_usuario.

----------------------------------------------------------------
* Buscar_produto :
	funcion para busca de produtos / categorias:
	select * from buscar_produto('enl','C') ; -- retornar categorias que contenham a string 'enl'
	select * from buscar_produto('erv','P') ; -- retorna produtos que contenham a string 'erv'
	select * from buscar_produto('e','T') ; -- retorna produtos e categorias que contenham a string 'e'

----------------------------------------------------------------
* sugerir_produtos :
	function que retorna os códigos dos produtos com base nas respostas de pesquisa de preferência do usuário e seus logs de pesquisa.
	select * from sugerir_produtos(codigo_usuario,total_produtos_trazer);
	total_produtos_trazer: limite imposto para não trazer todos os registros, caso queira trazer todos os possíveis, pode-se colocar um número bem alto.

----------------------------------------------------------------
* Script02 :
	Adicionado coluna cd_categoria na tabela questao_preferencia
	Realizado alteração na tabela produtos_lista_compra, tirado PK e inserido fk id_usuario
	Realizado alteração na tabela usuario e adicionado unique key para o ds_email
