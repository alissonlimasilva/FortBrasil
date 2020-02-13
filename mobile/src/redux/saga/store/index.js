import { call, put } from 'redux-saga/effects';
import { apiAuth } from '../../../services/api';
import { Types } from '../../duck/store';
import endpoints from '../../../services/endpoints';

export function* getStores() {
  try {
    const { data } = yield call(apiAuth, endpoints.getStores);
    yield put({ type: Types.SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    yield put({
      type: Types.FAILURE,
    });
  }
}
