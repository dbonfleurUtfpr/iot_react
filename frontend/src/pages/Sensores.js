import React, { useEffect, useState } from 'react';
import { getDispositivos, getSensores, createSensor, updateSensorById, deleteSensorById, toggleSensorStatus } from '../services/api';

function Sensores() {
  const [sensores, setSensores] = useState([]);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [dispositivoId, setDispositivoId] = useState('');
  const [dispositivos, setDispositivos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultDispositivos = await getDispositivos();
        setDispositivos(resultDispositivos.data);

        const resultSensores = await getSensores();
        setSensores(resultSensores.data);
      } catch (error) {
        console.error('Erro ao buscar dispositivos e sensores:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (editMode) {
        await updateSensorById(editId, { nome, tipo, dispositivo: dispositivoId, ligado: true });
      } else {
        await createSensor({ nome, tipo, dispositivo: dispositivoId, ligado: true });
      }

      const resultSensores = await getSensores();
      setSensores(resultSensores.data);
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Erro ao salvar sensor:', error);
      setErrorMessage('Erro ao salvar sensor.');
    }
  };

  const handleEdit = (sensor) => {
    setNome(sensor.nome);
    setTipo(sensor.tipo);
    setDispositivoId(sensor.dispositivo);
    setEditMode(true);
    setEditId(sensor._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSensorById(id);
      const resultSensores = await getSensores();
      setSensores(resultSensores.data);
    } catch (error) {
      console.error('Erro ao deletar sensor:', error);
      setErrorMessage('Erro ao deletar sensor.');
    }
  };

  const handleToggleStatus = async (sensorId) => {
    try {
      await toggleSensorStatus(sensorId);
      const resultSensores = await getSensores();
      setSensores(resultSensores.data);
    } catch (error) {
      console.error('Erro ao alternar status do sensor:', error);
    }
  };

  const getDispositivoDescription = (dispositivoId) => {
    const dispositivo = dispositivos.find(d => d._id === dispositivoId);
    return dispositivo ? `${dispositivo.nome} - ${dispositivo.localizacao}` : 'Dispositivo não encontrado';
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Sensores</h2>
        <button className="btn btn-success" onClick={() => setShowForm(true)}>Cadastrar Novo Sensor</button>
      </div>
      {showForm && (
        <div className="card p-4 mb-3">
          <h3>{editMode ? 'Editar Sensor' : 'Cadastrar Novo Sensor'}</h3>
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
              <label htmlFor="tipo" className="form-label">Tipo:</label>
              <input
                type="text"
                className="form-control"
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dispositivoId" className="form-label">Dispositivo:</label>
              <select
                className="form-select"
                id="dispositivoId"
                value={dispositivoId}
                onChange={(e) => setDispositivoId(e.target.value)}
                required
              >
                <option value="">Selecione um Dispositivo</option>
                {dispositivos.map((dispositivo) => (
                  <option key={dispositivo._id} value={dispositivo._id}>
                    {dispositivo.nome} - {dispositivo.localizacao}
                  </option>
                ))}
              </select>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary">{editMode ? 'Salvar' : 'Cadastrar'}</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Cancelar</button>
          </form>
        </div>
      )}
      {sensores.length > 0 ? (
        <ul className="list-group mb-3">
          {sensores.map(sensor => (
            <li key={sensor._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{sensor.nome}</h5>
                <p>Tipo: {sensor.tipo}</p>
                <p>Dispositivo: {getDispositivoDescription(sensor.dispositivo)}</p>
              </div>
              <div>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(sensor)}>Editar</button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(sensor._id)}>Excluir</button>
                <button
                  className={`btn btn-${sensor.ligado ? 'success' : 'danger'}`}
                  onClick={() => handleToggleStatus(sensor._id)}
                >
                  {sensor.ligado ? 'Ligado' : 'Desligado'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Não há nenhum sensor cadastrado.</p>
      )}
    </div>
  );
}

export default Sensores;
