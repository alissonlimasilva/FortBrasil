import { takeEvery, all } from 'redux-saga/effects';
import { Types as StoreTypes } from '../duck/store';
import { Types as UserTypes } from '../duck/user';
import { getStores } from './store';
import { login, logout } from './user';

export default function* rootSaga() {
  yield all([
    takeEvery(StoreTypes.REQUEST, getStores),
    takeEvery(UserTypes.LOGIN, login),
    takeEvery(UserTypes.LOGOUT_SAGA, logout),
  ]);
}
