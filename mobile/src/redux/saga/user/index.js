import { call, put } from 'redux-saga/effects';
import { apiNoAuth } from '../../../services/api';
import { Types } from '../../duck/user';
import { Types as StoreType } from '../../duck/store';
import endpoints from '../../../services/endpoints';
import { getLoggedUser, saveLoggedUser } from '../../../utils/user';
import messages from '../../../res/messages';
import contants from '../../../res/contants';
/**
 * action.payload => {email, password}
 */
export function* login(action) {
  try {
    const { email, password } = action.payload;
    if (!email && !password) {
      console.log('Campos não preenchidos');
      yield put({
        type: Types.FAILURE,
        payload: messages.invalidFields,
      });
    } else {
      const { data } = yield call(
        apiNoAuth.post,
        endpoints.login,
        action.payload
      );
      yield call(saveLoggedUser, data);
      yield put({ type: StoreType.CLEAR });
      yield put({ type: Types.SUCCESS, payload: data });
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield put({
      type: Types.FAILURE,
      payload: error.response.data.message || messages.errorLogin,
    });
  }
}

export function* logout(action) {
  try {
    const { navigation } = action.payload;
    let user = yield call(getLoggedUser);
    // apagando token do usuário e deixando dados para usar no campo email
    user = { ...user, token: undefined };
    yield call(saveLoggedUser, user);
    // alterando estado de login do usuário
    yield put({ type: Types.LOGOUT });
    // saindo para login
    yield navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{ type: 'Navigate', routeName: contants.ROUTE_LOGIN }],
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: Types.FAILURE,
      payload: messages.logoutError,
    });
  }
}
