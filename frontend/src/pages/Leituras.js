import React, { useEffect, useState } from 'react';
import { getSensores, getLeituras, createLeitura, updateLeituraById, deleteLeituraById } from '../services/api';
import { useSelector } from 'react-redux';

function Leituras() {
  const [leituras, setLeituras] = useState([]);
  const [valor, setValor] = useState('');
  const [sensorId, setSensorId] = useState('');
  const [data, setData] = useState('');
  const [sensores, setSensores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingLeitura, setEditingLeitura] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultSensores = await getSensores();
        setSensores(resultSensores.data);

        const resultLeituras = await getLeituras();
        setLeituras(resultLeituras.data);
      } catch (error) {
        console.error('Erro ao buscar sensores e leituras:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const currentData = new Date().toISOString();

    try {
      if (editingLeitura) {
        await updateLeituraById(editingLeitura._id, { valor: parseFloat(valor), data: currentData, sensor: sensorId });
        setEditingLeitura(null);
      } else {
        await createLeitura({ valor: parseFloat(valor), data: currentData, sensor: sensorId });
      }
      const resultLeituras = await getLeituras();
      setLeituras(resultLeituras.data);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao salvar leitura:', error);
      setErrorMessage('Erro ao salvar leitura.');
    }
  };

  const handleEdit = (leitura) => {
    setValor(leitura.valor);
    setSensorId(leitura.sensor._id);
    setEditingLeitura(leitura);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLeituraById(id);
      const resultLeituras = await getLeituras();
      setLeituras(resultLeituras.data);
    } catch (error) {
      console.error('Erro ao deletar leitura:', error);
    }
  };

  const getSensorDescription = (sensorId) => {
    const sensor = sensores.find(s => s._id === sensorId);
    return sensor ? `${sensor.nome} - ${sensor.tipo}` : 'Sensor não encontrado';
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Leituras</h2>
        <button className="btn btn-success" onClick={() => setShowForm(true)}>Cadastrar Nova Leitura</button>
      </div>
      {showForm && (
        <div className="card p-4 mb-3">
          <h3>{editingLeitura ? 'Editar Leitura' : 'Cadastrar Nova Leitura'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="valor" className="form-label">Valor:</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sensorId" className="form-label">Sensor:</label>
              <select
                className="form-select"
                id="sensorId"
                value={sensorId}
                onChange={(e) => setSensorId(e.target.value)}
                required
              >
                <option value="">Selecione um Sensor</option>
                {sensores.map((sensor) => (
                  <option key={sensor._id} value={sensor._id}>
                    {sensor.nome} - {sensor.tipo}
                  </option>
                ))}
              </select>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary">{editingLeitura ? 'Salvar' : 'Cadastrar'}</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Cancelar</button>
          </form>
        </div>
      )}
      {leituras.length > 0 ? (
        <ul className="list-group mb-3">
          {leituras.map(leitura => (
            <li key={leitura._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>Valor: {leitura.valor}</h5>
                <p>Data: {new Date(leitura.data).toLocaleString()}</p>
                <p>Sensor: {getSensorDescription(leitura.sensor._id)}</p>
              </div>
              <div>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(leitura)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(leitura._id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Não há nenhuma leitura cadastrada.</p>
      )}
    </div>
  );
}

export default Leituras;
