# Personal Stores
Foi utilizado a seguinte Stack no projeto.

Backend => NodeJS

Database => MongoDB

Mobile => React-Native

Problema 2 => Java

O aplicativo está em produção. Foi utilizado Cloud Functions do Firebase para hospedar o serviço.

### ESTABELECIMENTOS
+ **POST** - /store/add

> Adiciona um estabelecimento

> Espera receber um JSON contendo os campos

```
 name *
 razaoSocial *
 logo
 address *
 description *
 latitude *
 longitude *
```

+ **GET** - /store/listNear

> Lista todas os estabelecimentos em uma determinada distancia

+ **GET** - /store/listNear

> Espera receber os seguintes Query params

```
 latitude *
 longitude *
 range
```

> Lista todas os estabelecimentos do usuário passado no token de autenticação

+ **DELETE** - /store/remove

> Remove um estabelecimento 

> Espera receber um campo do tipo Query Param de nome storeId

+ **PUT** - /store/edit
> Faz alterações no estabelecimento
```
 storeId *
 name *
 razaoSocial *
 logo
 address *
 description *
 latitude *
 longitude *
```

### USUÁRIO
+ **POST** - /users/add

> Adiciona um novo usuário

> Espera receber um JSON contendo os campos

```
 name *
 email *
 password *
 avatar
```

### AUTENTICAÇÃO
+ **POST** - /auth

> Realiza login do usuário e retorna um token que autoriza o uso do webservice

> Espera receber um JSON contendo os campos

```
 email *
 password *
```

> O token de autorização deve ser enviado no cabeçalho de todas requisições, exceto **/auth** e **/users/add**, pelo campo Authorization
