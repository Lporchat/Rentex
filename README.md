# Cadastro de Carro

**Requisitos Funcionais**
Deve ser possivel cadastrar um novo carro.
Deve ser possivel lista todos as categorias.

**Regras de negocios**
Não deve ser possivel cadastrar um novo carro ja cadastrada.
Não deve ser possivel alterar a placa de um carro ja cadastrado.
O carro deve ser cadastrado como Disponivel.
Para cadastrar tem que ser um usuario nivel ADM.

# listagem de carros

**Requisitos Funcionais**
Deve ser possivel listar os carros disponiveis.
Deve ser possivel listar os carros disponiveis pela categoria.
Deve ser possivel listar os carros disponiveis pela marca.
Deve ser possivel listar os carros disponiveis pelo nome do carro.

**Regras de negocios**
Não deve esta logado para ver a listagem.

# Cadastro de Especificação no carro

**Requisitos Funcionais**
Deve ser possivel cadastrar uma especificação para um carro.
Deve ser possivel lista todas as especificações.
Deve ser possivel lista todos os carros

**Regras de negocios**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação ja existente no mesmo carro.
Para cadastrar tem que ser um usuario nivel ADM.

# Cadastro de Imagens do carro

**Requisitos Funcionais**
Deve ser possivel cadastrar uma imagem para um carro.
Deve ser possivel listar todos os carros.

**Regras Não Funcionais**
Utilizar o multer para fazer o upload da imagem;

**Regras de negocios**
deve ser possivel cadastrar mais de uma imagem para o mesmo carro
Para cadastrar tem que ser um usuario nivel ADM.

# Aluguel de carro

**Requisitos Funcionais**
Deve ser possivel cadastrar um Aluguel.

**Regras de negocios**
O aluguel deve ter no minimo 24 horas de duração.
Não deve ser possivel cadastrar um novo aluguel caso ja tenha um aberto para o usuario.
Não deve ser possivel cadastrar um novo aluguel caso ja tenha um aberto para o carro.
O usuario deve estar logado na aplicação.
Ao realizar um aluguel, o status devera se mudado para indisponível.

# Devolução do carros

**Requisitos Funcionais**
Deve ser possivel Realizar a devolução de um carro.

**Regras de negocios**
Se o carro for devolvido com menos de 24h, devera ser cobrado o valor da diaria.
Ao realizar a devolução, o carro devera ser liberado para outro aluguel.
Ao realizar a devolução, o usuario devera ser liberado para outro aluguel.
Ao realizar a devolução, devera ser calculado o valor total do aluguel.
Caso o horario de devolução seja superior ao horario previsto da entrega, devera ser cobrado uma taxa proporcional.
Em caso de multa devera ser adicionado ao valor do aluguel.
O usuario deve estar logado na aplicação.


# Listagem de alugueis para o usuario

**Requisitos Funcionais**
Deve ser possivel realizar a busca de todos os alugueis de um determinado usuario 

**Regras de negocios**
O usuario deve estar logado na aplicação;
