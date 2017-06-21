![axan logo](https://github.com/JoaoPauloZ/axan-backend/blob/master/axan%20logo.PNG)

### Backend do aplicativo AXAN para a disciplina de Projeto de Software II.
#
### Projeto: AXAN
### Integrantes: Gabriel Zanluca, Hélinton Pereira, Tamires K., João Paulo Serodio
### Nº Projeto: 11.
#
## Configuração do Ambiente

#### Requisitos:
- ##### [Node.js](https://nodejs.org/en/) v6.11.0 LTS ou superior
- ##### [PostgreSQL](https://www.bigsql.org/postgresql/installers.jsp/) v9.6.3 ou superior
- ##### [VS Code](https://code.visualstudio.com) v1.12 ou superior (recomendado)

#### Configurar e executar:

- ##### Clonar este repositório
- ##### Seguir os passos no [README](https://github.com/JoaoPauloZ/axan-backend/blob/master/Scripts/README.md) dos Scripts do Banco de Dados 
- ##### Abrir a pasta local do repositório com o **Vs Code**
- ##### Abrir o [Integrated Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) do **Vs Code**
- ##### Executar o comando `npm install` (isto instalará todas as depêndencias do projeto)
- ##### Executar o comando `node ./app/server` (isto executará o projeto)
#
## Especificação dos Serviços

####  Cadastro Usuário
- #### Resquest:
    - #### method: POST
    - #### url: http://localhost:3000/api/users/signin/
    - #### headers params:
    
        Key | Value
        --- | ---
        **user** | `Cliente 01`
        **password** | `123456`
        **birthday_date** | `10-01-1980`
        **ds_email** | `email@email.com`
        **email** | `900000000`
        **cellphone** | `47`

- #### Response:
    ```json
    {
        "result": [{
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
        }],
        "status": "SUCCESS",
        "mensagens":[
            "Usuário cadastrado com sucesso!"
        ]
    }    
    ```

####  Login Usuário
- #### Resquest:
    - #### method: POST
    - #### url: http://localhost:3000/api/security/logon
    - #### headers params:
        
        Key | Value
        --- | ---
        **user** | `email@email.com`
        **password** | `123456`

- #### Response:
 
    ```json
    {
        "result": [{
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
        }],
        "status": "SUCCESS",
        "mensagens":[
            "Usuário autenticado com sucesso!"
        ]
    }    
    ```

####  Buscar Produto
- #### Resquest:
    - #### method: GET
    - #### url: http://localhost:3000/api/product/search
    - #### headers params:
      
        Key | Value
        --- | ---
        **token** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
    - #### query params:
       
        Key | Value
        --- | ---
        **q** (opicional) | `bat`
        **lat** (opicional) | `-26.856554`
        **lon** (opicional) | `-49.2391875`

- #### Response:
  
    ```json
    {
        "result": [{
            "name":"batata",
            "picture":"https://maxcdn.icons8.com/Share/icon/Plants//potato1600.png",
            "cod":1,
            "price":"2.00",
            "distance": 100
        }]
    }    
    ```
####  Buscar Sugestões de Produtos
- #### Resquest:
    - #### method: GET
    - #### url: http://localhost:3000/api/user/sugestion-list
    - #### headers params:
      
        Key | Value
        --- | ---
        **token** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
    - #### query params:
       
        Key | Value
        --- | ---
        **lat** (opicional) | `-26.856554`
        **lon** (opicional) | `-49.2391875`

- #### Response:

    ```json
    {
        "result": [{
            "name":"batata",
            "picture":"https://maxcdn.icons8.com/Share/icon/Plants//potato1600.png",
            "cod":1,
            "price":"2.00",
            "distance": 100
        }]
    }    
    ```    

####  Cadastro de Preferências
- #### Resquest:
    - #### method: POST
    - #### url: http://localhost:3000/api/user/preferences
    - #### headers params:
       
        Key | Value
        --- | ---
        **token** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
    - #### query params:
       
        Key | Value
        --- | ---
        **freq** | `1`
        **butchery** | `1`
        **fruit** | `2`
        **bakery** | `3`
    - #### Obs: 
        Tipos de frequência de ida ao mercado:
       
        freq | Value
        --- | ---
        **1** | `Uma vez por semana`
        **2** | `Uma vez por mês`
        **3** | `Uma vez a cada três meses`
        
        Tipos de frequência de compra de produto:
       
        freq | Value
        --- | ---
        **1** | `Todas vez`
        **2** | `Vez sim, vez não`
        **3** | `Raramente`
- #### Response:
   
    ```json
    {
        "result": [],
        "status": "SUCCESS",
        "message":[ 
            "Prefência registrada com sucesso!"
        ]
    }    
    ```

####  Adicionar produtos a lista de compras
- #### Resquest:
    - #### method: POST
    - #### url: http://localhost:3000/api/user/shopping-list/product/{id}/quantity/{qtd}
    - #### headers params:
        
        Key | Value
        --- | ---
        **token** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
    - #### path params:
        
        Key | Value
        --- | ---
        **id** | `1`
        **quantity** | `1`
    
- #### Response:
    
    ```json
    {
        "result": [],
        "status": "SUCCESS",
        "message":[ 
            "Produto adicionado com sucesso!"
        ]
    }    
    ```

####  Remover produtos da lista de compras
- #### Resquest:
    - #### method: DELETE
    - #### url: http://localhost:3000/api/user/shopping-list/product/{id-product}
    - #### headers params:
        
        Key | Value
        --- | ---
        **token** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
    - #### path params:
        
        Key | Value
        --- | ---
        **id-product** | `1`
    
- #### Response:
    
    ```json
    {
        "result": [],
        "status": "SUCCESS",
        "message":[ 
            "Produto removido com sucesso!"
        ]
    }    
    ```
    
####  Listar produtos da lista de compras 
- #### Resquest:
    - #### method: GET
    - #### url: http://localhost:3000/api/user/shopping-list
    - #### headers params:
        
        Key | Value
        --- | ---
        **token** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

- #### Response:
   
    ```json
    {
        "result": [{ 
            "name": "batata",
            "picture": "https://maxcdn.icons8.com/Share/icon/Plants//potato1600.png",
            "cod": 1,
            "price": "2.00"
        }]
    }    
    ```
####  Consultar valor total da lista de compras
- #### Resquest:
    - #### method: GET
    - #### url: http://localhost:3000/api/user/shopping-list/price
    - #### headers params:
      
        Key | Value
        --- | ---
        **token** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

- #### Response:
  
    ```json
    {
        "result": [{
            "price": "150,00"
        }]
    }    
    ```
####  Consultar local indicado para realizar a compra dos produtos da lista de compras
- #### Resquest:
    - #### method: GET
    - #### url: http://localhost:3000/api/user/shopping-list/place
    - #### headers params:
      
        Key | Value
        --- | ---
        **token** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

- #### Response:
  
    ```json
    {
        "result": [{
            "latitude": 40.7143528,
            "longitude": -74.0059731
        }]
    }    
    ```
