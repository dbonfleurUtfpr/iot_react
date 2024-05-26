import { combineReducers } from 'redux';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_PESSOAS_SUCCESS,
  FETCH_GATEWAYS_SUCCESS,
  FETCH_DISPOSITIVOS_SUCCESS,
  FETCH_SENSORES_SUCCESS,
  FETCH_ATUADORES_SUCCESS,
  FETCH_LEITURAS_SUCCESS,
} from './actions';

const initialState = {
  token: localStorage.getItem('token') || '',
  userId: localStorage.getItem('userId') || '',
  pessoas: [],
  gateways: [],
  dispositivos: [],
  sensores: [],
  atuadores: [],
  leituras: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload.userId);
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return {
        ...state,
        token: '',
        userId: '',
      };
    default:
      return state;
  }
};

const pessoasReducer = (state = initialState.pessoas, action) => {
  switch (action.type) {
    case FETCH_PESSOAS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const gatewaysReducer = (state = initialState.gateways, action) => {
  switch (action.type) {
    case FETCH_GATEWAYS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const dispositivosReducer = (state = initialState.dispositivos, action) => {
  switch (action.type) {
    case FETCH_DISPOSITIVOS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const sensoresReducer = (state = initialState.sensores, action) => {
  switch (action.type) {
    case FETCH_SENSORES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const atuadoresReducer = (state = initialState.atuadores, action) => {
  switch (action.type) {
    case FETCH_ATUADORES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const leiturasReducer = (state = initialState.leituras, action) => {
  switch (action.type) {
    case FETCH_LEITURAS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  pessoas: pessoasReducer,
  gateways: gatewaysReducer,
  dispositivos: dispositivosReducer,
  sensores: sensoresReducer,
  atuadores: atuadoresReducer,
  leituras: leiturasReducer,
});

export default rootReducer;
