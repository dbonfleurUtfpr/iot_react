import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../services/api';
import { loginSuccess } from '../store/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      // Limpar a mensagem após ser exibida
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpar mensagem de erro anterior
    try {
      const response = await login(email, password);
      console.log('response:', response);
      const { token, userId } = response.data;
      console.log('token:', token);
      console.log('userId:', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      dispatch(loginSuccess(token, userId));
      navigate('/');
    } catch (error) {
      if (error.response) {
        // Erro de autenticação ou outros erros de resposta da API
        if (error.response.status === 401) {
          setErrorMessage('Email ou senha incorretos.');
        } else {
          setErrorMessage('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
        }
      } else {
        // Erro de rede ou outros erros
        setErrorMessage('Erro de rede. Por favor, verifique sua conexão e tente novamente.');
      }
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '20rem' }}>
        <h2 className="card-title text-center">Login</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
        <div className="mt-3 text-center">
          <p>Não tem uma conta? <a href="/signup">Cadastre-se</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
