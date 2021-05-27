import React, { useState } from 'react';
import './styles/global.css'
import './App.css'

import githubExplorerImage from './assets/logo.svg'

function App() {
  const [username, setUsername] = useState()
  const [repositories, setRepositories] = useState(0)

  const [error, setError] = useState(false)

  async function handleSubmit() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`)
      const data = await response.json()
      
      setRepositories(data)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  if(error) {
    return <p>Error.</p>
  }

  return (
    <div>
      <header>
        <div className="header-container">
          <img src={githubExplorerImage} alt="Github Explorer" />

          <div>
            <input type="text" onChange={event => setUsername(event.target.value)} />
            <button onClick={handleSubmit}>Pesquisar</button>
          </div>
          {error && <p>Usuário não encontrado</p>}
        </div>
      </header>

      <main>
        <div className="app-container">
          <h1>Repositorios de Samuel</h1>

          <ul>
            {Array.isArray(repositories) ? repositories.map(repository => (
              <li className="repository-item">
                <div>
                  <strong>{repository.name}</strong>
                  <span>{repository.language}</span>
                </div>

                <a href={repository.html_url}>
                  Acessar repositório
                </a>
              </li>
            )) : (
              <p>Usuário não foi encontrado.</p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
