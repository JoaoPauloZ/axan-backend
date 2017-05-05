# axan-backend
Backend do aplicativo AXAN para a disciplina de Projeto de Software II.

##################################################
Exemplo Cadastro Usuário(Post):
http://localhost:3000/api/users/signin/
nm_usuario: "Comprador 01"
ds_senha: "123456"
dt_nascimento: 10-01-1980
ds_email: "email@email.com"
nr_celular: 900000000
nr_ddd: 47
ie_tipo_user: 0
salt: "dsldjskaldlksa"
cd_pais: "BR"

result : {
             msg : "Usuario cadastrado com sucesso!",
             id_Nm : req.nm_usuario  
        }
##########################################

##################################################
Exemplo Busca Produto(Get) :
http://localhost:3000/api/product/search
q : "Banana"

{
  "result": [
    {
      "name": "batata",
      "picture": "https://maxcdn.icons8.com/Share/icon/Plants//potato1600.png",
      "cod": 1,
      "price": "2.00"
    }
  ],
  "status": null,
  "messages": null
}
##########################################
