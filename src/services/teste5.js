const data = require("../fakeData").fakeData;

module.exports = function (req, res) {
  const { name } = req.query;

  //Encontra o usuário com base no nome recebido e pega seu contador de leituras
  const { readsCounter } = data.find((user) => user.name === name);

  if (readsCounter) {
    return res.send(
      "Usuário " + name + " foi lido " + readsCounter + " vezes."
    );
  } else return res.status(404).send("Usuário não encontrado"); //Caso o usuário não exista retorna o erro 404 (Not Found)
};
