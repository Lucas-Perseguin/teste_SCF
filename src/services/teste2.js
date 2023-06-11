const data = require("../fakeData").fakeData;
const { sessions } = require("../fakeData");
let { lastUserId, lastSessionId } = require("../fakeData");
const jwt = require("jsonwebtoken");

module.exports = function (req, res) {
  const { name, job } = req.body;

  /*Cria o objeto do usuário com os parâmetros recebidos e adiciona o id com base no ultimo id criado
  para simular um banco de dados real com o id sendo um serial number*/
  var newUser = {
    id: lastUserId + 1,
    name: name,
    job: job,
    readsCounter: 0,
  };

  //Adiciona o novo id criado
  lastUserId++;

  //Adiciona o usuário ao array
  data.push(newUser);

  //Criando a sessão do usuário
  const session = { id: lastSessionId + 1, userId: newUser.id };

  //Adicionando a sessão do usuário
  sessions.push(session);

  //Criando o token do usuário que será necessário para modificar ou excluir o usuário
  //Essa não é uma solução perfeita, pois como não há uma maneira de logar esse token irá expirar e então não será mais possível modificar ou excluir o usuário
  const token = jwt.sign({ sessionId: session.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.send({ newUser, token });
};
