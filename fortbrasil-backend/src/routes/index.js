const { Router } = require("express");
const checkTokenJWT = require("../security");

const routes = Router();
const StoreController = require("../controllers/StoreController");
const UserController = require("../controllers/UserController");

/** Rotas para notas */
routes.post("/store/add", checkTokenJWT, StoreController.createStore);
routes.delete("/store/remove", checkTokenJWT, StoreController.delete);
routes.get(
  "/store/listStoresByUser",
  checkTokenJWT,
  StoreController.listStoresByUser
);
routes.get(
  "/store/listNear",
  checkTokenJWT,
  StoreController.listNearStoresByUser
);
routes.put("/store/edit", checkTokenJWT, StoreController.updateStore);

/** Rotas para usuário */
routes.post("/users/add", UserController.store);
routes.get("/users", UserController.index); // so para testes, retirar

/** Rotas para autenticação */
routes.post("/auth", UserController.login);

module.exports = routes;
