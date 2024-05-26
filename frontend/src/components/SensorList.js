import React, { useEffect, useState } from 'react';
import api from '../services/api';

function SensorList() {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('/sensor');
      setSensors(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Sensores</h2>
      <ul>
        {sensors.map(sensor => (
          <li key={sensor._id}>{sensor.nome} - {sensor.tipo}</li>
        ))}
      </ul>
    </div>
  );
}

export default SensorList;
