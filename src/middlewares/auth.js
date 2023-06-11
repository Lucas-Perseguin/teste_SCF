const jwt = require("jsonwebtoken");
const data = require("../fakeData").fakeData;
const { sessions } = require("../fakeData");

//Estou usando jwt para validar o acesso de modo que apenas o próprio usuário possa modificar ou excluir seus dados
module.exports = function (req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send("Acesso não autorizado"); //Caso não haja o token nos headers da requisição

  const token = authorization.replace("Bearer ", "");

  try {
    //Vaidar o token e receber o id da sessão do usuário
    const { sessionId } = jwt.verify(token, process.env.JWT_SECRET);

    if (sessionId) {
      //Encontrar o id do usuário com base no id da sessão
      const userId = sessions.find(
        (session) => session.id === sessionId
      ).userId;

      if (userId) {
        const userData = data.find((user) => user.id === userId);

        if (userData) {
          console.log(userData);
          res.locals.userData = userData;
          return next();
        } else throw new Error("Acesso não autorizado"); //Caso o usuário da sessão recebida não exista
      } else throw new Error("Acesso não autorizado"); //Caso a sessão recebida no token não exista
    } else throw new Error("Acesso não autorizado"); //Caso o token não seja válido
  } catch (error) {
    return res.status(401).send(error);
  }
};
