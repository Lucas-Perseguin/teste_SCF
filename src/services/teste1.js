const data = require("../fakeData").fakeData;

const getUser = (req, res, next) => {
  const { name } = req.query;

  if (name) {
    const userData = data.find((user) => user.name === name); //Encontrar o usuário pelo nome

    //Caso o usuário exista aumenta o contador de leituras e retorna o objeto do usuário
    if (userData) {
      userData.readsCounter = userData.readsCounter
        ? userData.readsCounter + 1
        : 1;
      return res.send(userData);
    } else return res.status(404).send("Usuário não encontrado"); //Caso o usuário não exista retorna o erro 404 (Not Found)
  } else {
    return res.status(400).send("Parâmetro name não recebido"); //Caso o parâmetro de rota name não tenha sido passado retorna o erro 400 (Bad Request)
  }
};

const getUsers = (req, res, next) => {
  return res.send(data);
};

module.exports = {
  getUser,
  getUsers,
};
