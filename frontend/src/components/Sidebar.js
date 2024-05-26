import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/gateways">Gateways</Link></li>
          <li><Link to="/dispositivos">Dispositivos</Link></li>
          <li><Link to="/leituras">Leituras</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
