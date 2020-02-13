import { combineReducers } from 'redux';
import store from '../duck/store';
import user from '../duck/user';

export default combineReducers({ store, user });
