import api from '../services/api';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const FETCH_PESSOAS_SUCCESS = 'FETCH_PESSOAS_SUCCESS';
export const FETCH_GATEWAYS_SUCCESS = 'FETCH_GATEWAYS_SUCCESS';
export const FETCH_DISPOSITIVOS_SUCCESS = 'FETCH_DISPOSITIVOS_SUCCESS';
export const FETCH_SENSORES_SUCCESS = 'FETCH_SENSORES_SUCCESS';
export const FETCH_ATUADORES_SUCCESS = 'FETCH_ATUADORES_SUCCESS';
export const FETCH_LEITURAS_SUCCESS = 'FETCH_LEITURAS_SUCCESS';

// Action Creators
export const loginSuccess = (token, userId) => ({
  type: LOGIN_SUCCESS,
  payload: { token, userId },
});

export const logout = () => ({
  type: LOGOUT,
});

export const fetchPessoasSuccess = (pessoas) => ({
  type: FETCH_PESSOAS_SUCCESS,
  payload: pessoas,
});

export const fetchGatewaysSuccess = (gateways) => ({
  type: FETCH_GATEWAYS_SUCCESS,
  payload: gateways,
});

export const fetchDispositivosSuccess = (dispositivos) => ({
  type: FETCH_DISPOSITIVOS_SUCCESS,
  payload: dispositivos,
});

export const fetchSensoresSuccess = (sensores) => ({
  type: FETCH_SENSORES_SUCCESS,
  payload: sensores,
});

export const fetchAtuadoresSuccess = (atuadores) => ({
  type: FETCH_ATUADORES_SUCCESS,
  payload: atuadores,
});

export const fetchLeiturasSuccess = (leituras) => ({
  type: FETCH_LEITURAS_SUCCESS,
  payload: leituras,
});

// Thunk Actions
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await api.login(email, password);
    const token = response.data.token;
    localStorage.setItem('token', token);
    dispatch(loginSuccess(token));
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const fetchPessoas = () => async (dispatch) => {
  try {
    const response = await api.getPessoas();
    dispatch(fetchPessoasSuccess(response.data));
  } catch (error) {
    console.error('Fetching pessoas failed:', error);
  }
};

export const fetchGateways = () => async (dispatch) => {
  try {
    const response = await api.getGateways();
    dispatch(fetchGatewaysSuccess(response.data));
  } catch (error) {
    console.error('Fetching gateways failed:', error);
  }
};

export const fetchDispositivos = () => async (dispatch) => {
  try {
    const response = await api.getDispositivos();
    dispatch(fetchDispositivosSuccess(response.data));
  } catch (error) {
    console.error('Fetching dispositivos failed:', error);
  }
};

export const fetchSensores = () => async (dispatch) => {
  try {
    const response = await api.getSensores();
    dispatch(fetchSensoresSuccess(response.data));
  } catch (error) {
    console.error('Fetching sensores failed:', error);
  }
};

export const fetchAtuadores = () => async (dispatch) => {
  try {
    const response = await api.getAtuadores();
    dispatch(fetchAtuadoresSuccess(response.data));
  } catch (error) {
    console.error('Fetching atuadores failed:', error);
  }
};

export const fetchLeituras = () => async (dispatch) => {
  try {
    const response = await api.getLeituras();
    dispatch(fetchLeiturasSuccess(response.data));
  } catch (error) {
    console.error('Fetching leituras failed:', error);
  }
};
