const responses = {
  deleteStore: "Estabelecimento deletado com sucesso"
};

const errors = {
  noAuthDefault: "Usuário não encontrado ou senha inválida",
  noAuthPassword: "Senha inválida",
  noAuthUser: "Usuário não encontrado",
  authBadRequest: "E-mail ou senha não informados",
  noToken: "Token não informado",
  tokenError: "Ocorreu um erro durante a autenticação",
  invalidToken: "Token inválido",
  badRequest: "Existem campos não informados",
  userAlready: "Já existe um usuário com este e-mail",
  userNotFound: "Usuário não encontrado",
  storeNotFound: "Estabelecimento não encontrado",
  saveStore: "Ocorreu um erro ao salvar estabelecimento",
  noPermition: "Sem permissão para acessar esse recurso",
  update: "Ocorreu um erro desconhecido durante a atualização"
};

module.exports = { responses, errors };
