const data = require("../fakeData").fakeData;
const { sessions } = require("../fakeData");

module.exports = function (req, res) {
  const { name } = req.query;
  const { userData } = res.locals;

  if (name) {
    //Caso o nome do usuário a ser deletado seja diferente do nome do usuário do token de autenticação retorna erro 401(Unauthorized)
    if (userData.name !== name)
      return res.status(401).send("Acesso não autorizado");

    //Encontra o index do objeto do usuário no array
    const userIndex = data.findIndex((user) => user.name === name);

    if (userIndex) {
      //Encontra a sessão do usuário
      const sessionIndex = sessions.findIndex(
        (session) => session.userId === data[userIndex].id
      );

      //Remove a sessão do usuário
      sessions.splice(sessionIndex, 1);

      //Remove o objeto do usuário do array
      const deletedUser = data.splice(userIndex, 1);

      /*Para maior performance
      data[userIndex] = null;
      */

      //Enviando status de sucesso e também esotu enviando o objeto do usuário excluído
      return res.status(200).send(deletedUser);
    } else return res.status(404).send("Usuário não encontrado"); //Caso o usuário não exista retorna o erro 404 (Not Found)
  } else {
    return res.status(400).send("Parâmetro name não recebido"); //Caso o parâmetro de rota name não tenha sido passado retorna o erro 400 (Bad Request)
  }
};

/*Seria mais performático apenas deixar o objeto como null em vez de retirar ele do array (splice tem uma complexidade de tempo de O(n)),
porém estou simulando um banco de dados real, onde os dados são realmente deletados */
