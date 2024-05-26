import React, { useState } from 'react';
import api from '../services/api';

function GatewayForm({ onSubmit }) {
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pessoaId, setPessoaId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gatewayData = { descricao, endereco, pessoa: pessoaId };
    await api.post('/gateway', gatewayData);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Descrição:</label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>
      <div>
        <label>Endereço:</label>
        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      </div>
      <div>
        <label>ID da Pessoa:</label>
        <input type="text" value={pessoaId} onChange={(e) => setPessoaId(e.target.value)} />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default GatewayForm;
