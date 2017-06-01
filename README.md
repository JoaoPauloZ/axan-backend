# axan-backend
Backend do aplicativo AXAN para a disciplina de Projeto de Software II.

##################################################

Exemplo Cadastro Usuário:

URL: http://localhost:3000/api/users/signin/

method: 'POST'


headers params:

user: "Comprador 01"

password: "123456"

birthday_date: 10-01-1980

ds_email: "email@email.com"

email: 900000000

cellphone: 47


RESULT EXEMPLO:

{

  "result" : [

      {
            
            "id" : nm_usuario  
        
      }
  
  ],
  
  "status": SUCESS,
  
  "mensagens":[
  
    "Usuario cadastrado com sucesso!"
  
  ]
  
}

##################################################

Exemplo Busca Produto :

URL: http://localhost:3000/api/product/search

method: 'GET'


Query param:

q : "Banana"


RESULT EXEMPLO:

{

  "result": [

    {
        "name": "batata",
  
        "picture": "https://maxcdn.icons8.com/Share/icon/Plants//potato1600.png",
      
        "cod": 1,
      
        "price": "2.00"
    
    }
  
  ]

}

##########################################


Exemplo Cadastro de Preferências :

URL: http://localhost:3000/api/user/preference

method: 'POST'


Query param:

freq: 1,

butchery: 1,

fruit: 2,

bakery: 3

TIPOS DE FREQUENCIA IDA AO MERCADO: Um vez por semana (1), Um vez por mês (2), Um vez a cada três meses(3)
TIPOS DE FREQUENCIA COMPRA DE PRODUTO: Toda vez (1), Vez sim, vez não (2), Raramente (3)

RESULT EXEMPLO:

{

  "result": [ ],
  
  "status": SUCESS,
  
  "message":[
  
    "Prefência registrada com sucesso!"
  
  ]

}

##########################################


Exemplo Adicionar produtos lista de compras :

URL: http://localhost:3000/api/user/shopping-list/product/1/quantity/2

method: 'POST'


Path param:

id-product: 1

RESULT EXEMPLO:

{

  "result": [ ],
  
  "status": SUCESS,
  
  "message":[
  
    "Produto adicionado com sucesso!"
  
  ]

}


##########################################


Exemplo Remover produtos lista de compras :

URL: http://localhost:3000/api/user/shopping-list/product/1

method: 'DELETE'


Path param:

id-product: 1

RESULT EXEMPLO:

{

  "result": [ ],
  
  "status": SUCESS,
  
  "message":[
  
    "Produto removido com sucesso!"
  
  ]

}




##########################################


Exemplo Listar produtos lista de compras :

URL: http://localhost:3000/api/user/shopping-list

method: 'GET'

RESULT EXEMPLO:

{

  "result": [ 
  
  {
        "name": "batata",
  
        "picture": "https://maxcdn.icons8.com/Share/icon/Plants//potato1600.png",
      
        "cod": 1,
      
        "price": "2.00"
    
    }
  
  ]

}
