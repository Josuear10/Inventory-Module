import React, { useState } from 'react';
import './login.css';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log('Login request:', { username, password }); // Log para verificar los datos enviados
      const response = await axios.post('http://localhost:6060/login', {
        username,
        password,
      });
      console.log('Login response:', response.data);

      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redirige a la página principal u otra ruta segura
    } catch (error) {
      console.error('Login error:', error);
      setError('Credenciales Inválidas');
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Ingresa tu usuario y contraseña!</p>
                  {error && <p className="text-danger">{error}</p>}
                  <form onSubmit={handleLogin}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="typeUsernameX"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="typeUsernameX">Usuario</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                    </div>
                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Ingresar</button>
                  </form>
                </div>
                <div>
                  <p className="mb-0">¿No tienes cuenta aún?</p>
                  <a href='#' className="text-white-50 fw-bold">Contáctanos</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
