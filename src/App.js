import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })  
  }, []); 

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositorio do Gustavo ${Date.now()}`,
      url: "https://github.com/gustavonascimento/BlackJack",
      techs: "Haskell"
    });

    const repositorie = response.data;

    setRepositories([... repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    const repositorie = response.data;

    setRepositories(repositories.filter(repositorie => repositorie.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>
            <ul>
              {repositorie.title}
            </ul>

            <button onClick={() => handleRemoveRepository(repositorie.id)} type="button">
              Remover
            </button>
         </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
