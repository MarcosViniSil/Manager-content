# Documentação api que gerencia conteúdo de páginas estáticas

## EndPoints
 - 1 - `/validate/adm`
 - 2 - `/contents/adm`
 - 3 - `/update/content`
 - 4 - `/content/id`
 - 5 - `/encrypt/password`
 - 6 - `/decrypt/password`
## OBS: todos os endpoints são do tipo `POST`
## Explicação de cada endpoint:
## 1 - `/validate/adm`
### Este endpoint tem como objetivo validar um determinado administrador (`adm`), aquele que pode alterar o contéudo das páginas.

### body da requsição: 
  - ### email: string
  - ### password: string

### Resposta:
  - ### `id` do `adm`  se existir, caso contrário, retorna a mensagem `erro`

## 2 - `/contents/adm`
### Este endpoint retorna todos os conteúdos de uma determinada página que um `adm` tem acesso.

### body da requisição:
  - ### email: string
  - ### password: string
### OBS: email e password referem-se ao `adm`

### Resposta:
- ### uma lista contendo objetos do seguinte formato:`id` e `content`
- ### Exemplo de resposta:
```
[
  {
    "id": 1,
    "content": "novo texto"
  },
  {
    "id": 2,
    "content": "teste para um texto 2"
  },
  {
    "id": 3,
    "content": "teste para um texto 3"
  }
]
```
## 3 - `/update/content`
### Este endpoint tem como objetivo atualizar um conteúdo especifíco baseado em um `id` passado na requisição

### Body da requisição:
- ### id: inteiro
- ### content: string

### Resposta:
- ### nenhuma se tudo der certo, caso aconteça um erro, uma mensagem `vazio` é retornada, indicando falha

## 4 - `/content/id`
### Este endpoint retorna um (somente um) conteúdo baseado em seu `id`

### Body da requisição:
- ### id: inteiro

### Resposta:
- ### O texto correspondente ao id passado

### Exemplo de resposta
- ### `novo texto`

## 4 - `/encrypt/password`
### Este endpoint tem como objetivo criptografar uma senha

### Body da requisição:
- ### password: string

### Resposta:
- ### senha cryptografada

## 4 - `/decrypt/password`
### Este endpoint tem como objetivo descriptografar uma senha

### Body da requisição:
- ### code: string

### Resposta:
- ### senha original

