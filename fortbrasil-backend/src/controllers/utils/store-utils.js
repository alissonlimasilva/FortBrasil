const Store = require("../../models/Store");

/** retorna true para STORE EXISTE e false para inexistente ou ObjectId inválido */
async function checkIfStoreExists(storeId) {
  try {
    const store = await Store.findById(storeId);
    return !!store;
  } catch (error) {
    return false;
  }
}

// recebe lista com atributo location e retorna latitude e longitude separadas
function formatStore(list = []) {
  return list.map(item => {
    const store = item.toObject();
    let latitude = "";
    let longitude = "";
    if (store.location) {
      [longitude, latitude] = store.location.coordinates;
    }
    delete store.location;
    return { ...store, latitude, longitude };
  });
}

module.exports = { formatStore, checkIfStoreExists };
