import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPessoa } from '../services/api';

function Signup() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPessoa({ nome, email, senha });
      navigate('/login', { state: { successMessage: 'Usuário criado com sucesso!' } });
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '20rem' }}>
        <h2 className="card-title text-center">Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="senha" className="form-label">Senha:</label>
            <input
              type="password"
              className="form-control"
              id="senha"
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>
        <div className="mt-3 text-center">
          <p>Já tem uma conta? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
