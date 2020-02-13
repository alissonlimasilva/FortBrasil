const INITIAL_STATE = {
  data: [],
  loading: false,
  failure: false,
  nearStores: {
    loading: false,
    failure: false,
    data: [],
  },
};

export const Types = {
  CLEAR: 'store/CLEAR',
  REQUEST: 'store/REQUEST',
  FAILURE: 'store/FAILURE',
  SUCCESS: 'store/SUCCESS',
};

export const Actions = {
  getStores: () => ({ type: Types.REQUEST }),
};

export default function store(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return { ...state, loading: true, failure: false };
    case Types.FAILURE:
      return { ...state, loading: false, failure: true };
    case Types.SUCCESS:
      return { ...state, loading: false, failure: false, data: action.payload };
    case Types.CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
}
