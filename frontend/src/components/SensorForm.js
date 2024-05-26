import React, { useState } from 'react';
import api from '../services/api';

function SensorForm({ onSubmit }) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [ligado, setLigado] = useState(false);
  const [dispositivo, setDispositivo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sensorData = { nome, tipo, ligado, dispositivo };
    await api.post('/sensor', sensorData);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
        <label>Tipo:</label>
        <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
      </div>
      <div>
        <label>Ligado:</label>
        <input type="checkbox" checked={ligado} onChange={(e) => setLigado(e.target.checked)} />
      </div>
      <div>
        <label>ID do Dispositivo:</label>
        <input type="text" value={dispositivo} onChange={(e) => setDispositivo(e.target.value)} />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default SensorForm;
