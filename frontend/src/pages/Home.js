import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { getGateways, getDispositivosByGatewayId, getSensoresByDispositivoId, getLeiturasBySensorId } from '../services/api';

function Home() {
  const [gateways, setGateways] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [sensores, setSensores] = useState([]);
  const [leituras, setLeituras] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState('');
  const [selectedDispositivo, setSelectedDispositivo] = useState('');

  useEffect(() => {
    const fetchGateways = async () => {
      try {
        const result = await getGateways();
        setGateways(result.data);
      } catch (error) {
        console.error('Erro ao buscar gateways:', error);
      }
    };

    fetchGateways();
  }, []);

  useEffect(() => {
    if (selectedGateway) {
      const fetchDispositivos = async () => {
        try {
          const result = await getDispositivosByGatewayId(selectedGateway);
          console.log(result, selectedGateway);
          setDispositivos(result);
        } catch (error) {
          console.error('Erro ao buscar dispositivos:', error);
        }
      };

      fetchDispositivos();
    } else {
      setDispositivos([]);
      setSensores([]);
      setLeituras([]);
    }
  }, [selectedGateway]);

  useEffect(() => {
    if (selectedDispositivo) {
      const fetchSensores = async () => {
        try {
          const result = await getSensoresByDispositivoId(selectedDispositivo);
          setSensores(result);
        } catch (error) {
          console.error('Erro ao buscar sensores:', error);
        }
      };

      fetchSensores();
    } else {
      setSensores([]);
      setLeituras([]);
    }
  }, [selectedDispositivo]);

  useEffect(() => {
    const fetchLeituras = async () => {
      try {
        const allLeituras = [];
        for (const sensor of sensores) {
          const result = await getLeiturasBySensorId(sensor._id);
          allLeituras.push({ sensor: sensor.nome, leituras: result });
        }
        setLeituras(allLeituras);
      } catch (error) {
        console.error('Erro ao buscar leituras:', error);
      }
    };

    if (sensores.length > 0) {
      fetchLeituras();
    } else {
      setLeituras([]);
    }
  }, [sensores]);

  const processLeiturasData = () => {
    const data = [['Time', ...sensores.map(sensor => `${sensor.nome} - ${sensor.tipo}`)]];
    const timeMap = new Map();

    leituras.forEach(({ sensor, leituras }) => {
      leituras.forEach(leitura => {
        const time = new Date(leitura.data).toLocaleTimeString();
        if (!timeMap.has(time)) {
          timeMap.set(time, { time, values: {} });
        }
        timeMap.get(time).values[sensor] = leitura.valor;
      });
    });

    timeMap.forEach(({ time, values }) => {
      const row = [time, ...sensores.map(sensor => values[sensor.nome] || 0)];
      data.push(row);
    });

    return data;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Leituras dos Sensores</h2>
      <div className="mb-3">
        <label htmlFor="gatewaySelect" className="form-label">Selecione um Gateway:</label>
        <select
          className="form-select"
          id="gatewaySelect"
          value={selectedGateway}
          onChange={(e) => setSelectedGateway(e.target.value)}
        >
          <option value="">Selecione um Gateway</option>
          {Array.isArray(gateways) && gateways.map(gateway => (
            <option key={gateway._id} value={gateway._id}>
              {gateway.descricao}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="dispositivoSelect" className="form-label">Selecione um Dispositivo:</label>
        <select
          className="form-select"
          id="dispositivoSelect"
          value={selectedDispositivo}
          onChange={(e) => setSelectedDispositivo(e.target.value)}
          disabled={!selectedGateway}
        >
          <option value="">Selecione um Dispositivo</option>
          {Array.isArray(dispositivos) && dispositivos.map(dispositivo => (
            <option key={dispositivo._id} value={dispositivo._id}>
              {dispositivo.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        {leituras.length > 0 ? (
          <Chart
            width={'100%'}
            height={'400px'}
            chartType="LineChart"
            loader={<div>Carregando gráfico</div>}
            data={processLeiturasData()}
            options={{
              hAxis: {
                title: 'Tempo',
              },
              vAxis: {
                title: 'Valor',
              },
            }}
          />
        ) : (
          <p className="text-center">Selecione um dispositivo para visualizar as leituras.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
