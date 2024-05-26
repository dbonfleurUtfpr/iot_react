import React, { useEffect, useState } from 'react';
import { getGateways, createDispositivo, getDispositivos, updateDispositivoById, deleteDispositivoById } from '../services/api';
function Dispositivos() {
  const [dispositivos, setDispositivos] = useState([]);
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [gatewayId, setGatewayId] = useState('');
  const [gateways, setGateways] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultGateways = await getGateways();
        setGateways(resultGateways.data);

        const resultDispositivos = await getDispositivos();
        setDispositivos(resultDispositivos.data);
      } catch (error) {
        console.error('Erro ao buscar gateways e dispositivos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (editMode) {
        await updateDispositivoById(editId, { nome, localizacao, gateway: gatewayId });
      } else {
        await createDispositivo({ nome, localizacao, gateway: gatewayId });
      }

      const resultDispositivos = await getDispositivos();
      setDispositivos(resultDispositivos.data);
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error('Erro ao salvar dispositivo:', error);
      setErrorMessage('Erro ao salvar dispositivo.');
    }
  };

  const handleEdit = (dispositivo) => {
    setNome(dispositivo.nome);
    setLocalizacao(dispositivo.localizacao);
    setGatewayId(dispositivo.gateway._id);
    setEditMode(true);
    setEditId(dispositivo._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDispositivoById(id);
      const resultDispositivos = await getDispositivos();
      setDispositivos(resultDispositivos.data);
    } catch (error) {
      console.error('Erro ao deletar dispositivo:', error);
      setErrorMessage('Erro ao deletar dispositivo.');
    }
  };

  const getGatewayDescription = (gatewayId) => {
    const gateway = gateways.find(g => g._id === gatewayId);
    return gateway ? `${gateway.descricao} - ${gateway.endereco}` : 'Gateway não encontrado';
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Dispositivos</h2>
        <button className="btn btn-success" onClick={() => setShowForm(true)}>Cadastrar Novo Dispositivo</button>
      </div>
      {showForm && (
        <div className="card p-4 mb-3">
          <h3>{editMode ? 'Editar Dispositivo' : 'Cadastrar Novo Dispositivo'}</h3>
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
              <label htmlFor="localizacao" className="form-label">Localização:</label>
              <input
                type="text"
                className="form-control"
                id="localizacao"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gatewayId" className="form-label">Gateway:</label>
              <select
                className="form-select"
                id="gatewayId"
                value={gatewayId}
                onChange={(e) => setGatewayId(e.target.value)}
                required
              >
                <option value="">Selecione um Gateway</option>
                {gateways.map((gateway) => (
                  <option key={gateway._id} value={gateway._id}>
                    {gateway.descricao} - {gateway.endereco}
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
      {dispositivos.length > 0 ? (
        <ul className="list-group mb-3">
          {dispositivos.map(dispositivo => (
            <li key={dispositivo._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{dispositivo.nome}</h5>
                <p>Localização: {dispositivo.localizacao}</p>
                <p>Gateway: {getGatewayDescription(dispositivo.gateway._id)}</p>
              </div>
              <div>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(dispositivo)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(dispositivo._id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Não há nenhum dispositivo cadastrado.</p>
      )}
    </div>
  );
}

export default Dispositivos;
