const INITIAL_STATE = {
  user: undefined,
  loading: false,
  failure: false,
  failureError: '',
  isLogged: false,
};

export const Types = {
  LOGIN: 'user/LOGIN',
  LOGOUT_SAGA: 'user/LOGOUT_SAGA',
  LOGOUT: 'user/LOGOUT',
  FAILURE: 'user/FAILURE',
  SUCCESS: 'user/SUCCESS',
  LOGGED_USER: 'user/LOGGED_USER',
};

export const Actions = {
  login: payload => ({ type: Types.LOGIN, payload }),
  keepSection: payload => ({ type: Types.SUCCESS, payload }),
  logout: payload => ({ type: Types.LOGOUT_SAGA, payload }),
};

export default function store(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.LOGIN:
      return { ...INITIAL_STATE, loading: true };
    case Types.FAILURE:
      return { ...INITIAL_STATE, failure: true, failureError: payload };
    case Types.SUCCESS:
      return { ...INITIAL_STATE, user: payload, isLogged: true };
    case Types.LOGOUT:
      return { ...state, isLogged: false };
    default:
      return state;
  }
}
