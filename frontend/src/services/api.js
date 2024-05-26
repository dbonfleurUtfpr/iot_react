import axios from 'axios';

// Configuração inicial do axios com a URL base do backend
const api = axios.create({
  baseURL: 'http://localhost:3003', // URL base do backend
});

// Interceptor para adicionar o token de autenticação a cada requisição, se disponível
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Instância do Axios para chamadas não autenticadas
const apiNoAuth = axios.create({
  baseURL: 'http://localhost:3003', 
});

// Funções para chamadas de API

// Autenticação
export const login = (email, password) => apiNoAuth.post('/auth/login', { email, password });
export const verifyToken = () => apiNoAuth.get('/auth/verify');

// Pessoas
export const getPessoas = () => api.get('/pessoa');
export const createPessoa = (pessoaData) => apiNoAuth.post('/pessoa', pessoaData);
export const getPessoaById = (id) => api.get(`/pessoa/${id}`);
export const updatePessoaById = (id, pessoaData) => api.put(`/pessoa/${id}`, pessoaData);
export const deletePessoaById = (id) => api.delete(`/pessoa/${id}`);

// Gateways
export const getGateways = () => api.get('/gateway');
export const createGateway = (gatewayData) => api.post('/gateway', gatewayData);
export const getGatewayById = (id) => api.get(`/gateway/${id}`);
export const updateGatewayById = (id, gatewayData) => api.put(`/gateway/${id}`, gatewayData);
export const deleteGatewayById = (id) => api.delete(`/gateway/${id}`);

// Dispositivos
export const getDispositivos = () => api.get('/dispositivo');
export const createDispositivo = (dispositivoData) => api.post('/dispositivo', dispositivoData);
export const getDispositivoById = (id) => api.get(`/dispositivo/${id}`);
export const updateDispositivoById = (id, dispositivoData) => api.put(`/dispositivo/${id}`, dispositivoData);
export const deleteDispositivoById = (id) => api.delete(`/dispositivo/${id}`);
export const getDispositivosByGatewayId = async (id) => {
  const response = await api.get(`/dispositivo/gateway/${id}`);
  return response.data;
};

// Sensores
export const getSensores = () => api.get('/sensor');
export const createSensor = (sensorData) => api.post('/sensor', sensorData);
export const getSensorById = (id) => api.get(`/sensor/${id}`);
export const updateSensorById = (id, sensorData) => api.put(`/sensor/${id}`, sensorData);
export const deleteSensorById = (id) => api.delete(`/sensor/${id}`);
export const toggleSensorStatus = async (id) => {
  const response = await api.put(`/sensor/toggle-status/${id}`);
  return response.data;
};
export const getSensoresByDispositivoId = async (id) => {
  const response = await api.get(`/sensor/dispositivo/${id}`);
  return response.data;
};

// Atuadores
export const getAtuadores = () => api.get('/atuador');
export const createAtuador = (atuadorData) => api.post('/atuador', atuadorData);
export const getAtuadorById = (id) => api.get(`/atuador/${id}`);
export const updateAtuadorById = (id, atuadorData) => api.put(`/atuador/${id}`, atuadorData);
export const deleteAtuadorById = (id) => api.delete(`/atuador/${id}`);

// Leituras
export const getLeituras = () => api.get('/leitura');
export const createLeitura = (leituraData) => api.post('/leitura', leituraData);
export const getLeituraById = (id) => api.get(`/leitura/${id}`);
export const updateLeituraById = (id, leituraData) => api.put(`/leitura/${id}`, leituraData);
export const deleteLeituraById = (id) => api.delete(`/leitura/${id}`);
export const getLeiturasBySensorId = async (id) => {
const response = await api.get(`/leitura/sensor/${id}`);
  return response.data;
};

// Exportação do axios configurado como padrão
export default api;
export { apiNoAuth };