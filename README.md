# projeto-PrepWise


## Sobre o Projeto

A API **Prep Wise** é uma plataforma  que visa diminuir a lacuna da diversidade em grandes empresas, preparando  as pessoas candidatas para os processos seletivos.




## Tecnologias utilizadas:
| Ferramenta | Descrição |
| --- | --- |
| `javascript` | Linguagem de programação |
| `nestjs` | Framework para construção de aplicações Node.js com suporte a TypeScript, baseado em módulos e focado em escalabilidade e manutenção. |
| `dotenv` | Dependência para proteger dados sensíveis do projeto|
| `typeorm` | ORM que facilita a interação com o PostgreSQL, permitindo a criação de entidades e gerenciamento de relações de forma simplificada |
| `pg` |  Dependência que interage com o PostgreSQL para a conexão da database, criação de modelos e das tabelas|
| `npm ou yarn` | Gerenciador de pacotes|
| `amazon lightsail` | Serviço da AWS que oferece uma maneira simples e econômica de implantar e gerenciar servidores virtuais (instâncias) na nuvem, com recursos como armazenamento, redes e banco de dados, ideal para aplicações e sites de pequeno a médio porte|
 `Insomnia ou Postman` | Interface gráfica para realizar os testes|

<br>
<br>

## 📁 Arquitetura 

```
PrepWise
   |
   |-  📁 src
   |    |
   |    |- 📁 adapters
   |    |     |- 📄 database.adapter.ts
   |
   |    |- 📁 controllers
   |    |     |- 📄 account.controller.ts
   |    |     |- 📄 practice.controller.ts
   |    |     |- 📄 question.controller.ts
   |    |     |- 📄 user.controller.ts
   |    |
   |    |- 📁 application
   |    |     |- 📁 modules
   |    |     |     |- 📄 account.module.ts
   |    |     |     |- 📄 gemini.module.ts
   |    |     |     |- 📄 practice.module.ts
   |    |     |     |- 📄 question.module.ts
   |    |     |     |- 📄 user.module.ts
   |    |
   |    |- 📁 ports
   |    |     |- 📄 account-abs.repository.ts
   |    |     |- 📄 account.repository.ts
   |    |     |- 📄 generic.repository.ts
   |    |     |- 📄 practice.repository.ts
   |    |     |- 📄 question.repository.ts
   |    |     |- 📄 user.repository.ts
   |    |
   |    |- 📁 services
   |    |     |- 📄 account.service.ts
   |    |     |- 📄 gemini.service.ts
   |    |     |- 📄 practice.service.ts
   |    |     |- 📄 question.service.ts
   |    |     |- 📄 user.service.ts
   |    |
   |    |- 📁 domain
   |    |     |- 📁 entities
   |    |     |     |- 📄 account.entity.ts
   |    |     |     |- 📄 practice.entity.ts
   |    |     |     |- 📄 question.entity.ts
   |    |     |     |- 📄 user.entity.ts
   |    |
   |    |- 📁 infrastructure
   |    |     |- 📁 gemini
   |    |     |     |- 📄 gemini.adapter.ts
   |
   |- 📁 migrations
   |    |- 📄 1729180467496-CreateQuestionsAndPracticeTables.ts
   |
   |- 📄 app.controller.ts
   |- 📄 app.module.ts
   |- 📄 app.service.ts
   |- 📄 main.ts


```

<br>
<br>

## Contrato

### Requisitos e rotas usuários

### Requisitos e rotas contas
- [x ]  **[GET] "/account"** Deverá retornar todas as contas cadastradas
- [x ]  **[POST] "/account** Deverá cadastrar uma nova conta
- [x ]  **[DELETE] "account/[ID]"** Deverá deletar uma conta por id específico e retornar uma mensagem de confirmação

- [x ]  **[GET] "/users"** Deverá retornar todos os usuários cadastrados
- [x ]  **[GET] "/users/[ID]"** Deverá retornar todos os usuários cadastrados pelo id
- [x ]  **[PUT] "/users/[ID]"** Deverá atualizar informação específica  de um usuários por id e retornar o   cadastro alterado.
- [x ]  **[DELETE] "/users/[ID]"** Deverá deletar um usuário id específico e retornar uma mensagem de confirmação



### Requisitos e rotas questões
- [x ]  **[GET] "/question"** Deverá retornar todas as questões cadastradas
- [x ]  **[POST] "/question"** Deverá cadastrar uma nova questão
- [x ]  **[PUT] "/question/[ID]"** Deverá atualizar informação específica de uma questão por id e retornar a questão alterada
- [x ]  **[DELETE] "/question/[ID]"** Deverá deletar uma questão por id específico e retornar uma mensagem de confirmação

### Requisitos e rotas praticar
- [x ]  **[GET] "/practice"** Deverá retornar todas as questões cadastradas com feedback
- [x ]  **[POST] "/practice"** Deverá cadastrar uma nova solução para a questão questão
- [x ]  **[PUT] "/practice/[ID]"** Deverá atualizar informação específica de uma  resposta para a questão por id e retornar a resposta alterada.
- [x ]  **[DELETE] "/practice/[ID]"** Deverá deletar uma solução por id específico e retornar uma mensagem de confirmação.







<br>
<br>

### Dados para Collection conta

- id: autogerado e obrigatório
- nome: texto e obrigatório
- email: texto e obrigatório
- password: texto e obrigatório


### API deve retornar seguinte JSON:

```jsx
[
  {
    "id": "3129e956-6a93-47dd-a204-c67aa56d3786",
	"password": "1457754",
	"email": "emailjoana@email",
	"name": "Joana"
}
]
```
<br>
<br>



### Dados para Collection questões

- id: autogerado e obrigatório
- description: texto e obrigatório
- topic: texto e obrigatório

### API deve retornar seguinte JSON:

```jsx

{
	"description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
	"topic": "Array",
	"id": "2cdd83c5-d18d-4e3c-b305-8f81461d01d2"
}
      


```
<br>
<br>

### Dados para Collection pratica

- id: autogerado e obrigatório
- solution: texto e obrigatório
- question: texto e obrigatório

### API deve retornar seguinte JSON:

```jsx

{
	"id": "2873ec75-31bd-48db-bc01-5a8cbeb27096",
	"solution": "var twoSum = function(nums, target) { for(let i = 0; i < nums.length; i++) {for(let j =  i + 1; j < nums.length; j++){ if(nums[i] + nums[j] === target){return  [i, j] }}}  };",
	"data": "2024-10-18T13:55:06.630Z",
	"question": {
		"id": "2cdd83c5-d18d-4e3c-b305-8f81461d01d2",
		"description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order.",
		"topic": "Array"
	},
	"status": "processed",
	"feedback": "**Feedback:**\n\n**Pontos Positivos:**\n\n* A solução do usuário é **correta** e resolve o problema conforme solicitado.\n* Ele usa loops aninhados para iterar sobre o array e verificar todas as combinações possíveis de dois elementos, o que é uma abordagem comum para este problema.\n\n**Pontos a Melhorar:**\n\n* **Complexidade**:** A solução do usuário tem complexidade de tempo O(n^2), onde n é o tamanho do array. Isso pode ser ineficiente para arrays grandes. Existem abordagens mais eficientes, como um mapa hash, que podem reduzir a complexidade do tempo para O(n).\n* **Leitura**:** A solução é um pouco difícil de ler e entender, especialmente para loops aninhados. Considerar refatorar o código para torná-lo mais legível, como usando funções auxiliares ou nomes de variáveis mais descritivos.\n* **Gerenciamento de Erros:** A solução não verifica se a entrada é válida ou se existe uma solução. É recomendável adicionar verificações de erro para garantir que o programa não falhe em casos de entrada inválida.\n* **Estilo do Código:** A solução não segue as convenções comuns de estilo de código, como recuo e nomenclatura de variáveis. Isso pode dificultar a leitura e manutenção do código.\n\n**Recomendações:**\n\n* Explore soluções mais eficientes, como usar um mapa hash para armazenar os elementos e seus índices.\n* Refatore o código para torná-lo mais legível e fácil de entender.\n* Adicione verificações de erro para garantir que o programa funcione corretamente com entradas inválidas.\n* Siga as convenções de estilo de código para melhorar a legibilidade e manutenção do código.\n\n**Exemplo de Solução Otimizada:**\n\n```javascript\nvar twoSum = function(nums, target) {\n  const numMap = {}; // Mapa para armazenar elementos e seus índices\n\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i]; // Complementar do número atual\n\n    if (complement in numMap) {\n      return [numMap[complement], i]; // Retorna os índices\n    } else {\n      numMap[nums[i]] = i; // Adiciona o número ao mapa\n    }\n  }\n\n  return []; // Nenhuma solução encontrada\n};\n```"
}

