const Store = require("../models/Store");
const { responses, errors } = require("../global/messages");
const status = require("../global/statuscode");
const checkLatLongIsValid = require("../utils/checkLatLong");
const errorResponse = require("../utils/errorResponse");
const checkIfUserExists = require("./utils/user-utils");
const { checkIfStoreExists, formatStore } = require("./utils/store-utils");

module.exports = {
  async listStoresByUser(request, response) {
    try {
      const { loggedUser } = request;
      if (!(await checkIfUserExists(loggedUser))) {
        throw errorResponse(status.BAD_REQUEST, errors.userNotFound);
      }
      const stores = await Store.find({ user: loggedUser });
      return response.json(formatStore(stores));
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  },
  async listNearStoresByUser(request, response) {
    try {
      const { latitude, longitude, range } = request.query;
      const { loggedUser } = request;

      /** verificando se latitude e longitude estão preenchidos */
      if (!checkLatLongIsValid(latitude, longitude)) {
        throw errorResponse(status.BAD_REQUEST, errors.badRequest);
      }

      /** verificando se usuário existe */
      if (!(await checkIfUserExists(loggedUser))) {
        throw errorResponse(status.BAD_REQUEST, errors.userNotFound);
      }

      const stores = await Store.find({
        user: {
          $in: loggedUser
        },
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: range || 10000
          }
        }
      });
      return response.json(formatStore(stores));
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  },
  async delete(request, response) {
    try {
      const { storeId } = request.query;
      const { loggedUser } = request;
      if (!storeId || !(await checkIfStoreExists(storeId))) {
        throw errorResponse(status.BAD_REQUEST, errors.storeNotFound);
      }
      const store = await Store.findById(storeId);
      if (store.user.toString() !== loggedUser) {
        throw errorResponse(status.FORBBIDEN, errors.noPermition);
      }

      const deletedStore = await Store.findOneAndDelete({ _id: storeId });
      if (deletedStore) {
        return response.json({ message: responses.deleteStore });
      }
      throw errorResponse(status.BAD_REQUEST, errors.storeNotFound);
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  },
  async createStore(request, response) {
    try {
      const {
        name,
        razaoSocial,
        logo,
        address,
        description,
        latitude,
        longitude
      } = request.body;
      const { loggedUser } = request;

      /** Checando se campos requeridos estão devidamente preenchidos */
      if (
        !name ||
        !razaoSocial ||
        !address ||
        !description ||
        !checkLatLongIsValid(latitude, longitude)
      ) {
        throw errorResponse(status.BAD_REQUEST, errors.badRequest);
      }
      /** Checando se usuário existe, não é possível criar uma store referenciando um usuário que não existe */
      if (!checkIfUserExists(loggedUser)) {
        throw errorResponse(status.BAD_REQUEST, errors.userNotFound);
      }

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const store = await Store.create({
        name,
        razaoSocial,
        logo,
        address,
        description,
        location,
        user: loggedUser
      });
      if (!store) throw errorResponse(status.SERVER_ERROR, errors.saveStore);
      return response.json(store);
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  },
  async updateStore(request, response) {
    try {
      const {
        storeId,
        name,
        razaoSocial,
        logo,
        address,
        description,
        latitude,
        longitude
      } = request.body;

      const { loggedUser } = request;

      /** Checando se campos requeridos estão devidamente preenchidos */
      if (
        !name ||
        !razaoSocial ||
        !address ||
        !description ||
        !checkLatLongIsValid(latitude, longitude)
      ) {
        throw errorResponse(status.BAD_REQUEST, errors.badRequest);
      }

      if (!checkIfUserExists(loggedUser)) {
        throw errorResponse(status.BAD_REQUEST, errors.userNotFound);
      }

      if (!storeId || !(await checkIfStoreExists(storeId))) {
        throw errorResponse(status.BAD_REQUEST, errors.storeNotFound);
      }

      let store = await Store.findById(storeId);
      if (!store) {
        throw errorResponse(status.BAD_REQUEST, errors.storeNotFound);
      }

      if (store.user.toString() !== loggedUser) {
        throw errorResponse(status.FORBBIDEN, errors.noPermition);
      }

      if (store.user.toString() !== loggedUser) {
        throw errorResponse(status.FORBBIDEN, errors.noPermition);
      }

      store = { ...store.toObject() };

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      store = await Store.updateOne(
        { _id: storeId },
        {
          $set: {
            name,
            razaoSocial,
            location,
            logo: logo || store.logo,
            address,
            description
          }
        }
      );
      if (!store) {
        throw errorResponse(status.SERVER_ERROR, errors.update);
      }
      return response.json(await Store.findById(storeId));
    } catch (error) {
      response.statusCode = error.code || 400;
      return response.json(error);
    }
  }
};
