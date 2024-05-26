import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { getGateways, createGateway, deleteGatewayById, updateGatewayById } from '../services/api';
import { useSelector } from 'react-redux';

function Gateways() {
  const [gateways, setGateways] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGateways();
        setGateways(result.data);
      } catch (error) {
        console.error('Erro ao buscar gateways:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!isValidIP(endereco)) {
      setErrorMessage('Por favor, insira um endereço IP válido.');
      return;
    }

    try {
      if (editMode && selectedGateway) {
        await updateGatewayById(selectedGateway._id, { descricao, endereco });
      } else {
        await createGateway({ descricao, endereco, pessoa: userId });
      }
      const result = await getGateways();
      setGateways(result.data);
      setShowForm(false);
      setEditMode(false);
      setSelectedGateway(null);
    } catch (error) {
      console.error('Erro ao criar/atualizar gateway:', error);
    }
  };

  const handleEdit = (gateway) => {
    setSelectedGateway(gateway);
    setDescricao(gateway.descricao);
    setEndereco(gateway.endereco);
    setShowForm(true);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGatewayById(id);
      const result = await getGateways();
      setGateways(result.data);
    } catch (error) {
      console.error('Erro ao deletar gateway:', error);
    }
  };

  const isValidIP = (ip) => {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gateways</h2>
        <button className="btn btn-success" onClick={() => {
          setShowForm(true);
          setEditMode(false);
          setSelectedGateway(null);
          setDescricao('');
          setEndereco('');
        }}>
          Cadastrar Novo Gateway
        </button>
      </div>
      {showForm && (
        <div className="card p-4 mb-3">
          <h3>{editMode ? 'Editar Gateway' : 'Cadastrar Novo Gateway'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="descricao" className="form-label">Descrição:</label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endereco" className="form-label">Endereço:</label>
              <InputMask
                className="form-control"
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary">{editMode ? 'Salvar Alterações' : 'Cadastrar'}</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Cancelar</button>
          </form>
        </div>
      )}
      {gateways.length > 0 ? (
        <ul className="list-group mb-3">
          {gateways.map(gateway => (
            <li key={gateway._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{gateway.descricao}</h5>
                <p>{gateway.endereco}</p>
              </div>
              <div>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(gateway)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(gateway._id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Não há nenhum gateway cadastrado.</p>
      )}
    </div>
  );
}

export default Gateways;
