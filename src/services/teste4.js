const data = require("../fakeData").fakeData;

module.exports = function (req, res) {
  const id = Number(req.query.id);
  const { name, job } = req.body;
  const { userData } = res.locals;

  //Se todos os parâmetros foram recebidos procura pelo usuário no array
  if (id && name && job) {
    //Caso o nome do usuário a ser atualizado seja diferente do nome do usuário do token de autenticação retorna erro 401(Unauthorized)
    if (userData.name !== name)
      return res.status(401).send("Acesso não autorizado");

    const user = data.find((user) => user.id === id);

    //Caso o usuário tenha sido encontrado modifica os valores passados e retorna o novo objeto
    if (user) {
      user.name = name;
      user.job = job;

      return res.send(user);
    } else return res.status(404).send("Usuário não encontrado"); //Caso o usuário não exista retorna o erro 404 (Not Found)
  }

  return res
    .status(400)
    .send("Algum dos parâmetros necessários não foi recebido"); //Caso algum dos parâmetros de rota não tenha sido passado retorna o erro 400 (Bad Request)
};
