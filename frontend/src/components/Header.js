import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Internet of Things</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gateways">Gateways</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dispositivos">Dispositivos</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/sensores">Sensores</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leituras">Leituras</Link>
              </li>
            </ul>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
